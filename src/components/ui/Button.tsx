import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';
import colors from '../../constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
  isLoading?: boolean;
}

type VariantStyle = { container: ViewStyle; text: TextStyle; spinnerColor: string };

const VARIANT_STYLES: Record<string, VariantStyle> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.white, fontWeight: 'bold' },
    spinnerColor: colors.white,
  },
  secondary: {
    container: { backgroundColor: colors.primary10, borderWidth: 1, borderColor: colors.primary20 },
    text: { color: colors.primary, fontWeight: 'bold' },
    spinnerColor: colors.primary,
  },
  outline: {
    container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
    text: { color: colors.foreground, fontWeight: '600' },
    spinnerColor: colors.primary,
  },
  text: {
    container: { backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 4 },
    text: { color: colors.secondary, fontWeight: '600' },
    spinnerColor: colors.secondary,
  },
  destructive: {
    container: { backgroundColor: colors.destructive },
    text: { color: colors.white, fontWeight: 'bold' },
    spinnerColor: colors.white,
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const variantStyle = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      // Stable className — no CSS variable classes that change between renders
      className={`py-4 rounded-xl items-center justify-center flex-row ${
        disabled || isLoading ? 'opacity-60' : ''
      } ${className}`}
      // Variant-specific colors via style prop (no remount)
      style={[variantStyle.container, style]}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={variantStyle.spinnerColor} />
      ) : (
        <Text className="text-base" style={variantStyle.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
