import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, useSignup } from '../../api/auth';
import { toast } from '../../lib/toast';
import { Ionicons } from '@expo/vector-icons';

export function SignupForm({ onSignupSuccess }: { onSignupSuccess: (email: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
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
    <View className="gap-y-6 w-full">
      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-border rounded-xl p-4 text-base text-foreground"
              placeholder="Enter your name"
              placeholderTextColor="#71717a"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text className="text-destructive text-xs mt-1">{errors.name?.message as string}</Text>}
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white border border-border rounded-xl p-4 text-base text-foreground"
              placeholder="Enter your email"
              placeholderTextColor="#71717a"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-destructive text-xs mt-1">{errors.email?.message as string}</Text>}
      </View>

      <View>
        <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
        <View className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-white border border-border rounded-xl p-4 pr-12 text-base text-foreground"
                placeholder="Enter your password"
                placeholderTextColor="#71717a"
                secureTextEntry={!showPassword}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#71717a" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-destructive text-xs mt-1">{errors.password?.message as string}</Text>}
      </View>

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        disabled={isPending}
        activeOpacity={0.8}
        className="bg-primary py-4 rounded-xl items-center shadow-lg mt-2"
      >
        <Text className="text-white font-bold text-lg">{isPending ? "Signing up..." : "Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  );
}
