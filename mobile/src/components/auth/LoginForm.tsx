import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, useLogin } from '../../api/auth';
import { toast } from '../../lib/toast';
import { router } from 'expo-router';

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
    <View className="space-y-4 w-full">
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email?.message as string}</Text>}
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900"
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password?.message as string}</Text>}
      </View>

      <TouchableOpacity onPress={onForgotPassword} className="self-end mt-2">
        <Text className="text-secondary font-semibold">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        className="bg-primary py-4 rounded-xl items-center shadow-sm mt-4"
      >
        <Text className="text-white font-bold text-lg">{isPending ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}
