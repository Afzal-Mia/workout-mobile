import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

interface ProfileInfoCardProps {
  gender?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  fitnessGoals?: string[];
  onEditPress: () => void;
}

export function ProfileInfoCard({
  gender,
  difficulty,
  fitnessGoals,
  onEditPress,
}: ProfileInfoCardProps) {
  // Colors from colors.ts (mirrors tailwind.config.js & global.css) — prevents CssInterop remount
  const getDifficultyStyle = (level: string): { bg: string; text: string; border: string } => {
    switch (level) {
      case 'Beginner':     return { bg: colors.primary10, text: colors.primary,   border: colors.primary20 };
      case 'Intermediate': return { bg: '#fffbeb',         text: '#b45309',         border: '#fde68a' };
      case 'Advanced':     return { bg: '#fff1f2',         text: '#be123c',         border: '#fecdd3' };
      default:             return { bg: '#f9fafb',         text: colors.foreground, border: colors.border };
    }
  };

  return (
    <View className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
      <View className="p-4 border-b border-border flex-row justify-between items-center bg-slate-50/50">
        <Text className="text-foreground font-bold text-base">Personal Info</Text>
        <TouchableOpacity
          onPress={onEditPress}
          className="bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20"
        >
          <Text className="text-primary text-xs font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4 gap-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-500 font-medium">Gender</Text>
          <Text className="text-foreground font-bold">{gender || "—"}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 font-medium">Difficulty Level</Text>
          {/* Stable className — dynamic CSS-var colors moved to style prop */}
          <View
            className="px-3 py-1 rounded-full border"
            style={(() => { const s = getDifficultyStyle(difficulty || 'Beginner'); return { backgroundColor: s.bg, borderColor: s.border }; })()}
          >
            <Text
              className="text-xs font-bold"
              style={{ color: getDifficultyStyle(difficulty || 'Beginner').text }}
            >
              {difficulty || "Beginner"}
            </Text>
          </View>
        </View>

        <View className="pt-2 border-t border-slate-100">
          <Text className="text-gray-500 font-medium mb-3">Fitness Goals</Text>
          <View className="flex-row flex-wrap gap-2">
            {fitnessGoals && fitnessGoals.length > 0 ? (
              fitnessGoals.map((goal) => (
                <View
                  key={goal}
                  className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
                >
                  <Text className="text-slate-800 text-xs font-semibold">{goal}</Text>
                </View>
              ))
            ) : (
              <Text className="text-muted-foreground text-sm italic">
                No fitness goals selected yet.
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
