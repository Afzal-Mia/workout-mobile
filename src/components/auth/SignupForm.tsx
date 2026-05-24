import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, useSignup } from '../../api';
import { toast } from '../../lib/toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

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
    <View className="gap-y-6 w-full">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Name"
            placeholder="Enter your name"
            onChangeText={onChange}
            value={value}
            error={errors.name?.message as string}
          />
        )}
      />

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

      <Button
        label="Sign Up"
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
        className="mt-2"
      />
    </View>
  );
}
