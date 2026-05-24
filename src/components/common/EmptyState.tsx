import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface EmptyStateProps {
  message?: string;
  icon?: IoniconName;
  iconSize?: number;
  iconColor?: string;
  onButtonPress?: () => void;
  buttonText?: string;
}

export function EmptyState({
  message = 'Nothing here yet.',
  icon = 'search-outline',
  iconSize = 48,
  iconColor = '#a1a1aa',
  onButtonPress,
  buttonText,
}: EmptyStateProps) {
  return (
    <View className="flex-1 bg-background justify-center items-center px-6 py-10">
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      <Text className="text-muted-foreground mt-2 font-medium text-center text-lg">{message}</Text>
      {onButtonPress && buttonText ? (
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

