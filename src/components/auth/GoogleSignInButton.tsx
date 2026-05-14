import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function GoogleSignInButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center justify-center bg-white border border-border py-4 rounded-xl shadow-sm mt-4 w-full"
    >
      <View className="mr-3">
        <Ionicons name="logo-google" size={20} color="#EA4335" />
      </View>
      <Text className="text-foreground font-semibold text-base">Continue with Google</Text>
    </TouchableOpacity>
  );
}
