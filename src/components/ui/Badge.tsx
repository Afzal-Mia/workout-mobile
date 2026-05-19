import React from 'react';
import { View, Text, ViewProps, ViewStyle, TextStyle } from 'react-native';
import colors from '../../constants/colors';

interface BadgeProps extends ViewProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'amber' | 'rose' | 'muted';
}

type BadgeStyle = { container: ViewStyle; text: TextStyle };

// All colors from colors.ts (mirrors tailwind.config.js & global.css) — prevents NativeWind CssInterop remount
const BADGE_STYLES: Record<string, BadgeStyle> = {
  primary: {
    container: { backgroundColor: colors.primary, borderColor: colors.primary, borderWidth: 1 },
    text: { color: colors.white },
  },
  secondary: {
    container: { backgroundColor: colors.primary10, borderColor: colors.primary20, borderWidth: 1 },
    text: { color: colors.primary },
  },
  amber: {
    container: { backgroundColor: '#fffbeb', borderColor: '#fde68a', borderWidth: 1 },
    text: { color: '#b45309' },
  },
  rose: {
    container: { backgroundColor: '#fff1f2', borderColor: '#fecdd3', borderWidth: 1 },
    text: { color: '#be123c' },
  },
  muted: {
    container: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0', borderWidth: 1 },
    text: { color: '#1e293b' },
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'muted',
  className = '',
  style,
  ...props
}) => {
  const badgeStyle = BADGE_STYLES[variant] ?? BADGE_STYLES.muted;

  return (
    <View
      // Stable className — no CSS variable classes
      className={`px-3 py-1.5 rounded-xl items-center justify-center ${className}`}
      style={[badgeStyle.container, style]}
      {...props}
    >
      <Text className="text-xs font-bold" style={badgeStyle.text}>{label}</Text>
    </View>
  );
};
