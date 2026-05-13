import React, { useState } from 'react';
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

  const { control, handleSubmit, formState: { errors } } = useForm<{ email: string; otp: string; newPassword?: string }>({
    resolver: zodResolver(schema),
    defaultValues: { email: email, otp: '', newPassword: '' }
  });
  
  const { mutate: verifyOtp, isPending: isVerifying } = useVerifyOtp();
  const { mutate: resetPassword, isPending: isResetting } = useResetPasswordWithOtp();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const isPending = mode === 'verification' ? isVerifying : isResetting;

  const onSubmit = (data: any) => {
    if (mode === 'verification') {
      verifyOtp({ email: data.email, otp: data.otp }, {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          router.replace('/home'); // Go to home if verified successfully
        },
        onError: (err: any) => {
          toast.error(err.message || "Invalid OTP");
        }
      });
    } else {
      resetPassword({ email: data.email, otp: data.otp, newPassword: data.newPassword }, {
        onSuccess: () => {
          toast.success("Password reset successfully! You can now login.");
          onVerified(); // Go back to login screen
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to reset password");
        }
      });
    }
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email is required to resend OTP");
      return;
    }
    const type = mode === 'verification' ? 'verification' : 'reset-password';
    resendOtp({ email, type }, {
      onSuccess: () => {
        toast.success("OTP has been resent!");
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to resend OTP");
      }
    });
  };

  return (
    <View className="space-y-4 w-full">
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900"
              placeholder="Confirm your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              editable={!email} // Disable if email was passed in
            />
          )}
        />
        {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email?.message as string}</Text>}
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-1">OTP</Text>
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900 tracking-[0.5em] text-center font-bold"
              placeholder="------"
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.otp && <Text className="text-red-500 text-xs mt-1">{errors.otp?.message as string}</Text>}
      </View>

      {mode === 'reset-password' && (
        <View>
          <Text className="text-sm font-semibold text-gray-700 mb-1">New Password</Text>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900"
                placeholder="Enter new password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.newPassword && <Text className="text-red-500 text-xs mt-1">{errors.newPassword?.message as string}</Text>}
        </View>
      )}

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        className="bg-primary py-4 rounded-xl items-center shadow-sm mt-4"
      >
        <Text className="text-white font-bold text-lg">{isPending ? "Processing..." : (mode === 'verification' ? "Verify Email" : "Reset Password")}</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Didn't receive the code? </Text>
        <TouchableOpacity onPress={handleResend} disabled={isResending}>
          <Text className="text-accent font-bold">{isResending ? "Sending..." : "Resend OTP"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
