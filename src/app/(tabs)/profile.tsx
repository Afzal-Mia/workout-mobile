import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useGetMe, useUpdateProfile } from "../../api/user";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "../../lib/toast";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileStats } from "../../components/profile/ProfileStats";
import { ProfileInfoCard } from "../../components/profile/ProfileInfoCard";
import { ProfileOptionsList } from "../../components/profile/ProfileOptionsList";
import { ProfileEditForm } from "../../components/profile/ProfileEditForm";
import { ProfileSkeleton } from "../../components/profile/ProfileSkeleton";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const { data, isLoading, refetch } = useGetMe();
  const userProfile = data?.user;
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const authUser = useAuthStore((state) => state.user);

  const handleImageUpload = (imageObj: { uri: string; name: string; type: string }) => {
    setSelectedImage(imageObj);

    // We send an empty/undefined dto if only changing image (so backend doesn't overwrite existing profile values)
    const currentValues = {
      age: userProfile?.age,
      gender: userProfile?.gender,
      height: userProfile?.height,
      weight: userProfile?.weight,
      difficultyLevel: userProfile?.difficultyLevel,
      fitnessGoal: userProfile?.fitnessGoal,
    };

    updateProfile(
      { dto: currentValues, file: imageObj },
      {
        onSuccess: () => {
          toast.success("Profile photo updated successfully!");
          setSelectedImage(null);
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to update profile photo");
          setSelectedImage(null);
        },
      }
    );
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    toast.success("Successfully signed out!");
    router.replace("/auth");
  };

  if (isLoading && !userProfile) {
    return <ProfileSkeleton />;
  }

  const displayName = userProfile?.name || authUser?.name || "Fitness Enthusiast";
  const displayEmail = userProfile?.email || authUser?.email || "";
  const displayAvatar = (selectedImage?.uri || userProfile?.profileImage || authUser?.profileImage) ?? null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header/Avatar Section */}
        <ProfileHeader
          displayName={displayName}
          displayEmail={displayEmail}
          displayAvatar={displayAvatar}
          isUpdating={isUpdating}
          onImageSelected={handleImageUpload}
        />

        {isEditing ? (
          /* EDIT MODE Form Component */
          <ProfileEditForm
            userProfile={userProfile}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => {
              setIsEditing(false);
              refetch();
            }}
          />
        ) : (
          /* VIEW MODE Components */
          <View className="gap-y-6 pb-12">
            {/* Horizontal Stats Section */}
            <ProfileStats
              age={userProfile?.age}
              height={userProfile?.height}
              weight={userProfile?.weight}
            />

            {/* Info Cards (Gender, Difficulty, Fitness Goals) */}
            <ProfileInfoCard
              gender={userProfile?.gender}
              difficulty={userProfile?.difficultyLevel}
              fitnessGoals={userProfile?.fitnessGoal}
              onEditPress={() => setIsEditing(true)}
            />


            <ProfileOptionsList onLogout={handleLogout} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
