import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import colors from '../../constants/colors';

// Colors from colors.ts (mirrors tailwind.config.js & global.css) — prevents NativeWind CssInterop remount
const VARIANT_STYLES: Record<string, TextStyle> = {
  h1:        { fontSize: 30, color: colors.foreground, fontWeight: 'bold' },
  h2:        { fontSize: 24, color: colors.foreground, fontWeight: 'bold' },
  h3:        { fontSize: 18, color: colors.foreground, fontWeight: 'bold' },
  body:      { fontSize: 16, color: colors.foreground },
  caption:   { fontSize: 12, color: colors.mutedForeground },
  muted:     { color: '#6b7280' },
  accent:    { color: colors.accent },
  secondary: { color: colors.secondary },
};

const WEIGHT_STYLES: Record<string, TextStyle> = {
  normal:   { fontWeight: 'normal' },
  medium:   { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold:     { fontWeight: 'bold' },
};

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'muted' | 'accent' | 'secondary';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight,
  className = '',
  style,
  ...props
}) => {
  const variantStyle = VARIANT_STYLES[variant] ?? VARIANT_STYLES.body;
  const weightStyle = weight ? WEIGHT_STYLES[weight] : {};

  return (
    // Stable className — no CSS variable classes that swap between renders
    <RNText
      className={className}
      style={[variantStyle, weightStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};
