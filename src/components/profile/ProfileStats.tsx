import React from 'react';
import { View, Text } from 'react-native';

interface ProfileStatsProps {
  age?: number;
  height?: number;
  weight?: number;
}

export function ProfileStats({ age, height, weight }: ProfileStatsProps) {
  return (
    <View className="flex-row justify-between bg-slate-50 border border-slate-100 rounded-3xl p-4 shadow-sm">
      <View className="items-center flex-1">
        <Text className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Age</Text>
        <Text className="text-lg font-bold text-foreground mt-1">
          {age ? `${age} yrs` : "—"}
        </Text>
      </View>
      <View className="w-[1px] bg-slate-200" />
      <View className="items-center flex-1">
        <Text className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Height</Text>
        <Text className="text-lg font-bold text-foreground mt-1">
          {height ? `${height} cm` : "—"}
        </Text>
      </View>
      <View className="w-[1px] bg-slate-200" />
      <View className="items-center flex-1">
        <Text className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Weight</Text>
        <Text className="text-lg font-bold text-foreground mt-1">
          {weight ? `${weight} kg` : "—"}
        </Text>
      </View>
    </View>
  );
}
