import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, useForgotPassword } from '../../api/auth';
import { toast } from '../../lib/toast';

export function ForgotPasswordForm({ onOtpSent }: { onOtpSent: (email: string) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  });
  
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: any) => {
    forgotPassword(data, {
      onSuccess: () => {
        toast.success("OTP sent to your email!");
        onOtpSent(data.email);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to process request");
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
              placeholder="Enter your registered email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email?.message as string}</Text>}
      </View>

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        className="bg-primary py-4 rounded-xl items-center shadow-sm mt-6"
      >
        <Text className="text-white font-bold text-lg">{isPending ? "Sending OTP..." : "Reset Password"}</Text>
      </TouchableOpacity>
    </View>
  );
}
