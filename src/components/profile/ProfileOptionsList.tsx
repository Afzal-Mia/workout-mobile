import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ProfileOptionsListProps {
  onLogout: () => void;
}

export function ProfileOptionsList({ onLogout }: ProfileOptionsListProps) {
  const [showConfirm, setShowConfirm] = React.useState(false);
  return (
    <View className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm mb-6">

      <TouchableOpacity
        className="px-4 py-4 flex-row items-center active:bg-muted"
        onPress={() => setShowConfirm(true)}
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text className="text-destructive font-semibold ml-3">Logout</Text>
      </TouchableOpacity>
      <ConfirmationModal
        isVisible={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => { setShowConfirm(false); onLogout(); }}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
      />
    </View>
  );
}
