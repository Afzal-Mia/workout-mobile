import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <ActivityIndicator size="large" color="#237227" />
    </View>
  );
}

