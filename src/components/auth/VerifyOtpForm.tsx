import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, resetPasswordWithOtpSchema, useVerifyOtp, useResetPasswordWithOtp, useResendOtp } from '../../api/auth';
import { toast } from '../../lib/toast';
import { router } from 'expo-router';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import colors from '../../constants/colors';

type VerifyOtpFormProps = {
  mode: 'verification' | 'reset-password';
  email: string;
  onVerified: () => void;
};

export function VerifyOtpForm({ mode, email, onVerified }: VerifyOtpFormProps) {
  const schema = mode === 'verification' ? verifyOtpSchema : resetPasswordWithOtpSchema;
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputs = useRef<Array<TextInput | null>>([]);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<{ email: string; otp: string; newPassword?: string }>({
    resolver: zodResolver(schema),
    defaultValues: { email: email, otp: '', newPassword: '' }
  });

  const otpValue = watch('otp');
  
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resetPassword, isPending: isResetting } = useResetPasswordWithOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const isPending = mode === 'verification' ? isVerifying : isResetting;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = (data: any) => {
    if (mode === 'verification') {
      verifyOtp({ email: data.email, otp: data.otp }, {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          router.replace('/home');
        },
        onError: (err: any) => {
          toast.error(err.message || "Invalid OTP");
        }
      });
    } else {
      resetPassword({ email: data.email, otp: data.otp, newPassword: data.newPassword }, {
        onSuccess: () => {
          toast.success("Password reset successfully!");
          onVerified();
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to reset password");
        }
      });
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    
    const type = mode === 'verification' ? 'verification' : 'reset-password';
    resendOtp({ email, type }, {
      onSuccess: () => {
        toast.success("OTP has been resent!");
        setTimer(30);
        setCanResend(false);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to resend OTP");
      }
    });
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = otpValue.split('');
    newOtp[index] = value;
    const combinedOtp = newOtp.join('');
    setValue('otp', combinedOtp);

    // Auto focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpValue[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="gap-y-6 w-full">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="Confirm your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            editable={false}
            className="opacity-70"
          />
        )}
      />

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-4">Verification Code</Text>
        <View className="flex-row justify-between">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <View key={index} className="w-[14%] aspect-square bg-white border border-border rounded-xl items-center justify-center">
              <TextInput
                ref={(ref) => { otpInputs.current[index] = ref; }}
                className="text-2xl font-bold text-center w-full h-full"
                style={{ color: colors.foreground }}
                keyboardType="number-pad"
                maxLength={1}
                value={otpValue[index] || ''}
                onChangeText={(v) => handleOtpChange(v, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            </View>
          ))}
        </View>
        {errors.otp && <Text className="text-destructive text-xs mt-2">{errors.otp?.message as string}</Text>}
      </View>

      {mode === 'reset-password' && (
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="New Password"
              placeholder="Enter new password"
              isPassword
              onChangeText={onChange}
              value={value}
              error={errors.newPassword?.message as string}
            />
          )}
        />
      )}

      <Button
        label={mode === 'verification' ? "Verify Email" : "Reset Password"}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
        className="mt-2"
      />

      <View className="items-center mt-4">
        <TouchableOpacity 
          onPress={handleResend} 
          disabled={!canResend || isResending}
          className="flex-row items-center"
        >
          <Text
            className="font-semibold"
            style={{ color: canResend ? colors.accent : colors.mutedForeground }}
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </Text>
          {!canResend && (
            <Text className="text-muted-foreground ml-2">({timer}s)</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
