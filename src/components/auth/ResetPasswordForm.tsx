import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { useResetPassword, resetPasswordSchema, ResetPasswordDto } from '../../api/auth';

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
    <View>
      <Text className="text-xl font-bold text-foreground mb-4">Reset Password</Text>
      
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Current Password</Text>
        <View className="relative">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-white border ${errors.oldPassword ? 'border-destructive' : 'border-border'} rounded-xl p-4 pr-12 text-base text-foreground`}
                placeholder="Enter current password"
                placeholderTextColor="#71717a"
                secureTextEntry={!showOldPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity 
            onPress={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-4 top-4"
          >
            <Ionicons 
              name={showOldPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#71717a" 
            />
          </TouchableOpacity>
        </View>
        {errors.oldPassword && <Text className="text-destructive text-xs mt-1">{errors.oldPassword.message}</Text>}
      </View>

      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">New Password</Text>
        <View className="relative">
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-white border ${errors.newPassword ? 'border-destructive' : 'border-border'} rounded-xl p-4 pr-12 text-base text-foreground`}
                placeholder="Enter new password"
                placeholderTextColor="#71717a"
                secureTextEntry={!showNewPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity 
            onPress={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-4"
          >
            <Ionicons 
              name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#71717a" 
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text className="text-destructive text-xs mt-1">{errors.newPassword.message}</Text>}
      </View>

      <TouchableOpacity
        className={`bg-[#237227] rounded-xl py-4 items-center ${isPending ? 'opacity-70' : ''}`}
        onPress={handleSubmit(onResetPasswordSubmit)}
        disabled={isPending}
      >
        <Text className="text-white font-bold text-base">
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
