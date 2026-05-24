import React, { useEffect } from "react";
import { View, TouchableOpacity, Text as RNText } from "react-native";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileDto, useUpdateProfile } from "../../api";
import { toast } from "../../lib/toast";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import colors from "../../constants/colors";

const FITNESS_GOAL_OPTIONS = [
  "Weight Loss",
  "Muscle Gain",
  "Cardio",
  "Strength Training",
  "Flexibility",
  "Endurance",
];

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"] as const;
const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

interface ProfileEditFormProps {
  userProfile: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProfileEditForm({
  userProfile,
  onCancel,
  onSuccess,
}: ProfileEditFormProps) {
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProfileDto>({
    resolver: zodResolver(updateProfileSchema) as Resolver<UpdateProfileDto>,
    defaultValues: {
      age: undefined,
      gender: undefined,
      height: undefined,
      weight: undefined,
      difficultyLevel: undefined,
      fitnessGoal: [],
    },
  });

  const watchedFitnessGoals = watch("fitnessGoal") || [];

  // Reset form when profile data loads or changes
  useEffect(() => {
    if (userProfile) {
      reset({
        age: userProfile.age,
        gender: userProfile.gender,
        height: userProfile.height,
        weight: userProfile.weight,
        difficultyLevel: userProfile.difficultyLevel,
        fitnessGoal: userProfile.fitnessGoal || [],
      });
    }
  }, [userProfile, reset]);

  const onSubmit = (formData: UpdateProfileDto) => {
    updateProfile(
      { dto: formData },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          onSuccess();
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to update profile");
        },
      }
    );
  };

  const toggleFitnessGoal = (goal: string) => {
    const currentGoals = [...watchedFitnessGoals];
    const index = currentGoals.indexOf(goal);
    if (index > -1) {
      currentGoals.splice(index, 1);
    } else {
      if (currentGoals.length >= 10) {
        toast.error("You can select up to 10 fitness goals");
        return;
      }
      currentGoals.push(goal);
    }
    setValue("fitnessGoal", currentGoals, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <View className="gap-y-6 pb-12">
      {/* Age, Height, Weight row */}
      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <Controller
            control={control}
            name="age"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Age"
                placeholder="e.g. 25"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value !== undefined ? String(value) : ""}
                error={errors.age?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Height (cm)"
                placeholder="e.g. 175"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value !== undefined ? String(value) : ""}
                error={errors.height?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Weight (kg)"
                placeholder="e.g. 70"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value !== undefined ? String(value) : ""}
                error={errors.weight?.message}
              />
            )}
          />
        </View>
      </View>

      {/* Gender Selection */}
      <View>
        <RNText className="text-sm font-semibold text-gray-700 mb-2">Gender</RNText>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2">
              {GENDER_OPTIONS.map((option) => {
                const isSelected = value === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => onChange(option)}
                    // Stable className — CSS-var colors moved to style prop
                    className="px-3 py-2 rounded-xl border"
                    style={{
                      backgroundColor: isSelected ? colors.primary : colors.white,
                      borderColor: isSelected ? colors.primary : colors.border,
                    }}
                  >
                    <RNText
                      className="text-xs font-semibold"
                      style={{ color: isSelected ? colors.white : '#4b5563' }}
                    >
                      {option}
                    </RNText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
      </View>

      {/* Difficulty Level */}
      <View>
        <RNText className="text-sm font-semibold text-gray-700 mb-2">Difficulty Level</RNText>
        <Controller
          control={control}
          name="difficultyLevel"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-x-2">
              {DIFFICULTY_OPTIONS.map((option) => {
                const isSelected = value === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => onChange(option)}
                    // Stable className — CSS-var colors moved to style prop
                    className="flex-1 py-3 rounded-xl border items-center"
                    style={{
                      backgroundColor: isSelected ? colors.primary : colors.white,
                      borderColor: isSelected ? colors.primary : colors.border,
                    }}
                  >
                    <RNText
                      className="text-sm font-semibold"
                      style={{ color: isSelected ? colors.white : '#4b5563' }}
                    >
                      {option}
                    </RNText>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
      </View>

      {/* Fitness Goals */}
      <View>
        <RNText className="text-sm font-semibold text-gray-700 mb-2">
          Fitness Goals (Select Multiple)
        </RNText>
        <View className="flex-row flex-wrap gap-2">
          {FITNESS_GOAL_OPTIONS.map((goal) => {
            const isSelected = watchedFitnessGoals.includes(goal);
            return (
              <TouchableOpacity
                key={goal}
                onPress={() => toggleFitnessGoal(goal)}
                // Stable className — CSS-var colors moved to style prop
                className="px-3 py-2 rounded-xl border"
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.white,
                  borderColor: isSelected ? colors.primary : colors.border,
                }}
              >
                <RNText
                  className="text-xs font-semibold"
                  style={{ color: isSelected ? colors.white : '#4b5563' }}
                >
                  {goal}
                </RNText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row gap-x-4 mt-4">
        <Button
          label="Cancel"
          variant="outline"
          onPress={onCancel}
          className="flex-1"
        />

        <Button
          label="Save Changes"
          variant="primary"
          onPress={handleSubmit(onSubmit)}
          isLoading={isUpdating}
          className="flex-1"
        />
      </View>
    </View>
  );
}
