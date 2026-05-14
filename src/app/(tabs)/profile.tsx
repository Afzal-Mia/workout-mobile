import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-10 mt-4">
        <View className="w-24 h-24 rounded-full bg-muted border-4 border-white shadow-lg items-center justify-center mb-4">
          <Text className="text-3xl">👤</Text>
        </View>
        <Text className="text-2xl font-bold text-foreground">John Doe</Text>
        <Text className="text-muted-foreground">john.doe@example.com</Text>
      </View>

      <View className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
        <View className="p-4 border-b border-border flex-row items-center justify-between">
          <Text className="text-foreground font-medium">Personal Information</Text>
          <Text className="text-primary text-sm font-bold">Edit</Text>
        </View>
        <View className="p-4 border-b border-border flex-row items-center justify-between">
          <Text className="text-foreground font-medium">Notification Settings</Text>
          <Text className="text-muted-foreground">Enabled</Text>
        </View>
        <View className="p-4 flex-row items-center justify-between">
          <Text className="text-foreground font-medium">Privacy Policy</Text>
          <Text className="text-muted-foreground">→</Text>
        </View>
      </View>

      <View className="bg-destructive/10 p-4 rounded-2xl items-center">
        <Text className="text-destructive font-bold">Delete Account</Text>
      </View>
    </View>
  );
}
