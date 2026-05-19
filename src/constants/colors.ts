/**
 * App theme colors — single source of truth.
 *
 * These mirror the values in:
 *   - tailwind.config.js  (theme.extend.colors)
 *   - global.css          (@layer base :root CSS variables)
 *
 * Use these in `style` props whenever you need dynamic/conditional colors
 * to avoid NativeWind CssInterop remount warnings.
 */

const colors = {
  primary:           '#237227',
  secondary:         '#085b99',
  accent:            '#F97316',
  destructive:       '#ef4444',
  background:        '#ffffff',
  foreground:        '#171717',
  border:            '#e4e4e7',
  muted:             '#f4f4f5',
  mutedForeground:   '#71717a',
  white:             '#ffffff',

  // Semantic aliases
  primaryForeground: '#ffffff',
  destructiveFg:     '#fafafa',

  // Utility alphas (primary at opacity)
  primary10:         '#2372271A', // primary @ 10%
  primary20:         '#23722733', // primary @ 20%
} as const;

export default colors;
