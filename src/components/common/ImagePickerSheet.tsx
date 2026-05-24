import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheet } from './BottomSheet';

interface ImagePickerSheetProps {
  isVisible: boolean;
  title?: string;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  onClose: () => void;
}

export function ImagePickerSheet({
  isVisible,
  title = 'Update Photo',
  onTakePhoto,
  onChooseFromGallery,
  onClose,
}: ImagePickerSheetProps) {
  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      <Text className="text-foreground text-lg font-bold text-center mb-6">
        {title}
      </Text>

      <View className="gap-y-3">
        <TouchableOpacity
          onPress={onTakePhoto}
          className="bg-primary flex-row items-center justify-center py-4 rounded-xl shadow active:opacity-90"
        >
          <Ionicons name="camera" size={22} color="white" />
          <Text className="text-white font-bold text-base ml-2">Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onChooseFromGallery}
          className="bg-white border border-border flex-row items-center justify-center py-4 rounded-xl active:bg-slate-50"
        >
          <Ionicons name="images" size={22} color="#237227" />
          <Text className="text-primary font-bold text-base ml-2">
            Choose from Gallery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          className="bg-slate-100 flex-row items-center justify-center py-4 rounded-xl mt-2 active:bg-slate-200"
        >
          <Text className="text-slate-700 font-bold text-base">Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}
