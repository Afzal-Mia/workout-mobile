import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export function GoogleSignInButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center justify-center bg-white border border-gray-300 py-3 rounded-xl shadow-sm mt-4 w-full"
    >
      <View className="mr-3">
        {/* Placeholder for Google Icon */}
        <Text className="text-lg font-bold text-[#EA4335]">G</Text>
      </View>
      <Text className="text-gray-700 font-semibold text-base">Continue with Google</Text>
    </TouchableOpacity>
  );
}
