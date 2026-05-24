import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorStateProps {
  message?: string;
  iconSize?: number;
  onButtonPress?: () => void;
  buttonText?: string;
}

export function ErrorState({
  message = 'Something went wrong.',
  iconSize = 48,
  onButtonPress,
  buttonText = 'Go Back',
}: ErrorStateProps) {
  return (
    <View className="flex-1 bg-background justify-center items-center px-6 py-10">
      <Ionicons name="alert-circle-outline" size={iconSize} color="#ef4444" />
      <Text className="text-muted-foreground mt-2 text-center text-lg">
        {message}
      </Text>
      {onButtonPress ? (
        <TouchableOpacity
          className="mt-4 bg-[#237227] px-6 py-2 rounded-lg"
          onPress={onButtonPress}
        >
          <Text className="text-white font-bold">{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

