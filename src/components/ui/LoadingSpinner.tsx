import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

/**
 * A simple wrapper around React Native's ActivityIndicator that provides a
 * consistent UI component throughout the app. It forwards all standard props
 * to the underlying ActivityIndicator.
 */
export function LoadingSpinner(props: ActivityIndicatorProps) {
  return <ActivityIndicator {...props} />;
}
