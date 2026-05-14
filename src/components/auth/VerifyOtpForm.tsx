import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, resetPasswordWithOtpSchema, useVerifyOtp, useResetPasswordWithOtp, useResendOtp } from '../../api/auth';
import { toast } from '../../lib/toast';
import { router } from 'expo-router';

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
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-border rounded-xl p-4 text-base text-foreground opacity-70"
              placeholder="Confirm your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              editable={false}
            />
          )}
        />
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-4">Verification Code</Text>
        <View className="flex-row justify-between">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <View key={index} className="w-[14%] aspect-square bg-white border border-border rounded-xl items-center justify-center">
              <TextInput
                ref={(ref) => { otpInputs.current[index] = ref; }}
                className="text-2xl font-bold text-foreground text-center w-full h-full"
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
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-2">New Password</Text>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-white border border-border rounded-xl p-4 text-base text-foreground"
                placeholder="Enter new password"
                placeholderTextColor="#71717a"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.newPassword && <Text className="text-destructive text-xs mt-1">{errors.newPassword?.message as string}</Text>}
        </View>
      )}

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        activeOpacity={0.8}
        className="bg-primary py-4 rounded-xl items-center shadow-lg mt-2"
      >
        <Text className="text-white font-bold text-lg">
          {isPending ? "Processing..." : (mode === 'verification' ? "Verify Email" : "Reset Password")}
        </Text>
      </TouchableOpacity>

      <View className="items-center mt-4">
        <TouchableOpacity 
          onPress={handleResend} 
          disabled={!canResend || isResending}
          className="flex-row items-center"
        >
          <Text className={`font-semibold ${canResend ? 'text-accent' : 'text-muted-foreground'}`}>
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
