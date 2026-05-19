import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { useResetPassword, resetPasswordSchema, ResetPasswordDto } from '../../api/auth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { oldPassword: '', newPassword: '' }
  });

  const onResetPasswordSubmit = (data: ResetPasswordDto) => {
    resetPassword(data, {
      onSuccess: () => {
        Toast.show({ type: 'success', text1: 'Password reset successful' });
        onSuccess();
        reset();
      },
      onError: (err: any) => {
        Toast.show({ type: 'error', text1: err.message || 'Failed to reset password' });
      }
    });
  };

  return (
    <View className="w-full">
      <Text className="text-xl font-bold text-foreground mb-4">Reset Password</Text>
      
      <Controller
        control={control}
        name="oldPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Current Password"
            placeholder="Enter current password"
            isPassword
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.oldPassword?.message}
            className="mb-4"
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="New Password"
            placeholder="Enter new password"
            isPassword
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.newPassword?.message}
            className="mb-6"
          />
        )}
      />

      <Button
        label="Reset Password"
        onPress={handleSubmit(onResetPasswordSubmit)}
        isLoading={isPending}
      />
    </View>
  );
};
