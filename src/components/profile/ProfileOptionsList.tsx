import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileOptionsListProps {
  onLogout: () => void;
}

export function ProfileOptionsList({ onLogout }: ProfileOptionsListProps) {
  return (
    <View className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm mb-6">

      <TouchableOpacity
        className="px-4 py-4 flex-row items-center active:bg-muted"
        onPress={onLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text className="text-destructive font-semibold ml-3">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
