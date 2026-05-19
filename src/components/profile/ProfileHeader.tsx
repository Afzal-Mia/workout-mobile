import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { toast } from '../../lib/toast';
import { BottomSheet } from '../common/BottomSheet';

interface ProfileHeaderProps {
  displayName: string;
  displayEmail: string;
  displayAvatar: string | null;
  isUpdating: boolean;
  onImageSelected: (image: { uri: string; name: string; type: string }) => void;
}

export function ProfileHeader({
  displayName,
  displayEmail,
  displayAvatar,
  isUpdating,
  onImageSelected,
}: ProfileHeaderProps) {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  // Request permissions and open camera
  const handleTakePhoto = async () => {
    setImageModalVisible(false);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        toast.error('Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        onImageSelected({
          uri: asset.uri,
          name: asset.fileName || `profile_${Date.now()}.jpg`,
          type: asset.mimeType || 'image/jpeg',
        });
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to launch camera');
    }
  };

  // Request permissions and open gallery
  const handleChooseFromLibrary = async () => {
    setImageModalVisible(false);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        toast.error('Gallery permission is required to pick photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        onImageSelected({
          uri: asset.uri,
          name: asset.fileName || `profile_${Date.now()}.jpg`,
          type: asset.mimeType || 'image/jpeg',
        });
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to open image library');
    }
  };

  return (
    <View className="items-center mt-6 mb-8">
      <View className="relative">
        <TouchableOpacity
          onPress={() => !isUpdating && setImageModalVisible(true)}
          disabled={isUpdating}
          activeOpacity={0.9}
          className="w-28 h-28 rounded-full bg-slate-100 border-4 border-primary shadow-xl items-center justify-center overflow-hidden"
        >
          {displayAvatar ? (
            <Image source={{ uri: displayAvatar }} className="w-full h-full" />
          ) : (
            <Ionicons name="person" size={54} color="#a1a1aa" />
          )}
          {isUpdating && (
            <View className="absolute inset-0 bg-black/40 items-center justify-center">
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>

        {/* Edit overlay icon */}
        <TouchableOpacity
          onPress={() => !isUpdating && setImageModalVisible(true)}
          disabled={isUpdating}
          className="absolute bottom-0 right-0 bg-primary w-9 h-9 rounded-full items-center justify-center border-2 border-white shadow-lg active:opacity-90"
        >
          {isUpdating ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="camera" size={18} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-bold text-foreground mt-4 text-center">
        {displayName}
      </Text>
      <Text className="text-muted-foreground text-sm text-center">
        {displayEmail}
      </Text>

      {/* Modern Sleek Photo Picker Action Menu using Reusable BottomSheet */}
      <BottomSheet isVisible={imageModalVisible} onClose={() => setImageModalVisible(false)}>
        <Text className="text-foreground text-lg font-bold text-center mb-6">
          Update Profile Photo
        </Text>

        <View className="gap-y-3">
          <TouchableOpacity
            onPress={handleTakePhoto}
            className="bg-primary flex-row items-center justify-center py-4 rounded-xl shadow active:opacity-90"
          >
            <Ionicons name="camera" size={22} color="white" />
            <Text className="text-white font-bold text-base ml-2">Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleChooseFromLibrary}
            className="bg-white border border-border flex-row items-center justify-center py-4 rounded-xl active:bg-slate-50"
          >
            <Ionicons name="images" size={22} color="#237227" />
            <Text className="text-primary font-bold text-base ml-2">
              Choose from Gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setImageModalVisible(false)}
            className="bg-slate-100 flex-row items-center justify-center py-4 rounded-xl mt-2 active:bg-slate-200"
          >
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}
