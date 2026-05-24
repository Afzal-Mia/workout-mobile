import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, onBackPress, showBack = true }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push('/(tabs)/home'); // Fallback if no history exists
      }
    }
  };

  return (
    <View className="flex-row items-center px-4 py-4 pt-10 bg-white border-b border-border shadow-sm">
      {showBack && (
        <TouchableOpacity
          onPress={handleBack}
          className="mr-3 p-1 rounded-full bg-gray-100"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text className="text-xl font-bold flex-1">{title}</Text>
    </View>
  );
};
