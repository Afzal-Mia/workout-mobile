import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  className = '',
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.destructive
    : isFocused
    ? colors.primary
    : colors.border;

  return (
    <View className={`w-full gap-y-2 ${className}`}>
      {label && <Text className="text-sm font-semibold text-gray-700">{label}</Text>}

      <View className="relative w-full">
        <TextInput
          // Stable className — CSS variables (text-foreground) are always present from initial render
          className="bg-white border rounded-xl p-4 text-base text-foreground w-full"
          // Dynamic border color via style prop (no CSS variable swapping = no remount)
          style={{ borderColor, borderWidth: 1, ...(isFocused && !error ? { elevation: 1 } : {}) }}
          placeholderTextColor={colors.mutedForeground}

          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.mutedForeground}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-destructive text-xs mt-1">{error}</Text>}
    </View>
  );
};
