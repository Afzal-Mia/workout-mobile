import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../../components/auth/LoginForm';
import { SignupForm } from '../../components/auth/SignupForm';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { VerifyOtpForm } from '../../components/auth/VerifyOtpForm';
import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from '../../lib/toast';
import { router } from 'expo-router';

type AuthState = 'login' | 'signup' | 'forgot-password' | 'verify-otp';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [verifyMode, setVerifyMode] = useState<'verification' | 'reset-password'>('verification');

  const handleGoogleAuth = async () => {
    try {
      const redirectUri = Linking.createURL('/auth/google-callback');
      const backendAuthUrl = `${process.env.EXPO_PUBLIC_API_URL}/auth/google`;
      
      const result = await WebBrowser.openAuthSessionAsync(backendAuthUrl, redirectUri);
      
      if (result.type === 'success' && result.url) {
        const parsed = Linking.parse(result.url);
        const token = parsed.queryParams?.token as string;
        const userStr = parsed.queryParams?.user as string;
        
        if (token && userStr) {
          try {
            const user = JSON.parse(decodeURIComponent(userStr));
            useAuthStore.getState().setAuth(user, token);
            toast.success("Successfully logged in with Google!");
            router.replace('/home');
          } catch (err) {
            toast.error("Failed to parse user data.");
          }
        } else {
          toast.error("Authentication failed. Missing token or user data.");
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Google login encountered an error");
    }
  };

  const renderContent = () => {
    switch (authState) {
      case 'login':
        return (
          <>
            <Text className="text-3xl font-bold text-primary mb-2">Welcome Back</Text>
            <Text className="text-base text-gray-500 mb-8">Sign in to continue</Text>

            <LoginForm onForgotPassword={() => setAuthState('forgot-password')} />

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 font-medium">OR</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <GoogleSignInButton onPress={handleGoogleAuth} />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500 text-base">Don't have an account? </Text>
              <TouchableOpacity onPress={() => setAuthState('signup')}>
                <Text className="text-accent font-bold text-base">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'signup':
        return (
          <>
            <Text className="text-3xl font-bold text-primary mb-2">Create Account</Text>
            <Text className="text-base text-gray-500 mb-8">Sign up to get started</Text>

            <SignupForm onSignupSuccess={(email) => {
              setAuthEmail(email);
              setVerifyMode('verification');
              setAuthState('verify-otp');
            }} />

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 font-medium">OR</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <GoogleSignInButton onPress={handleGoogleAuth} />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500 text-base">Already have an account? </Text>
              <TouchableOpacity onPress={() => setAuthState('login')}>
                <Text className="text-accent font-bold text-base">Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 'forgot-password':
        return (
          <>
            <TouchableOpacity onPress={() => setAuthState('login')} className="mb-8">
              <Text className="text-secondary font-bold">← Back to Login</Text>
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-primary mb-2">Reset Password</Text>
            <Text className="text-base text-gray-500 mb-8">Enter your email to receive an OTP</Text>

            <ForgotPasswordForm onOtpSent={(email) => {
              setAuthEmail(email);
              setVerifyMode('reset-password');
              setAuthState('verify-otp');
            }} />
          </>
        );

      case 'verify-otp':
        return (
          <>
            <TouchableOpacity onPress={() => setAuthState('login')} className="mb-8">
              <Text className="text-secondary font-bold">← Back to Login</Text>
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-primary mb-2">
              {verifyMode === 'verification' ? 'Verify Email' : 'Verify OTP'}
            </Text>
            <Text className="text-base text-gray-500 mb-8">Enter the 6-digit code sent to your email</Text>

            <VerifyOtpForm 
              mode={verifyMode}
              email={authEmail}
              onVerified={() => setAuthState('login')} 
            />
          </>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <View className="flex-1 bg-white p-8 justify-center">
          {renderContent()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
