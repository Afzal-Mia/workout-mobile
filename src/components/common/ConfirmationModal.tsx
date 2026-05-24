import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* Dark overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </TouchableWithoutFeedback>
      {/* Centered dialog */}
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{ translateX: -150 }, { translateY: -100 }],
          width: 300,
          backgroundColor: colors.background,
          borderRadius: 12,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: colors.foreground }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 20, color: colors.foreground }}>
          {message}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginRight: 8,
              backgroundColor: colors.muted,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: colors.foreground }}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: colors.destructive,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: colors.white }}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
