import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, useSignup } from '../../api/auth';
import { toast } from '../../lib/toast';

export function SignupForm({ onSignupSuccess }: { onSignupSuccess: (email: string) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' }
  });
  
  const { mutate: signup, isPending } = useSignup();

  const onSubmit = (data: any) => {
    signup(data, {
      onSuccess: () => {
        toast.success("Account created! Please verify your email.");
        onSignupSuccess(data.email);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to sign up");
      }
    });
  };

  return (
    <View className="space-y-4 w-full">
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-1">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-gray-300 rounded-xl p-4 text-base text-gray-900"
              placeholder="Enter your name"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name?.message as string}</Text>}
      </View>

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

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        className="bg-primary py-4 rounded-xl items-center shadow-sm mt-6"
      >
        <Text className="text-white font-bold text-lg">{isPending ? "Signing up..." : "Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  );
}
