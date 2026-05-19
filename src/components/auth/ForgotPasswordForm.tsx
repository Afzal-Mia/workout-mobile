import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, useForgotPassword } from '../../api/auth';
import { toast } from '../../lib/toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

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
    <View className="gap-y-6 w-full">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="Enter your registered email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message as string}
          />
        )}
      />

      <Button
        label="Reset Password"
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
        className="mt-2"
      />
    </View>
  );
}
