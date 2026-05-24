import React from 'react';
import { View, TouchableOpacity, Text as RNText } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, useLogin } from '../../api';
import { toast } from '../../lib/toast';
import { router } from 'expo-router';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function LoginForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });
  
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: any) => {
    login(data, {
      onSuccess: () => {
        toast.success("Successfully logged in!");
        router.replace('/home');
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to login");
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
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            error={errors.email?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            isPassword
            onChangeText={onChange}
            value={value}
            error={errors.password?.message as string}
          />
        )}
      />

      <TouchableOpacity onPress={onForgotPassword} className="self-end -mt-2">
        <RNText className="text-secondary font-semibold">Forgot Password?</RNText>
      </TouchableOpacity>

      <Button
        label="Login"
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
        className="mt-2"
      />
    </View>
  );
}
