import React from 'react';
import { View, Text } from 'react-native';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-foreground">Performance Overview</Text>
        <Text className="text-muted-foreground">Your progress over the last 30 days.</Text>
      </View>

      <View className="bg-card p-6 rounded-2xl border border-border shadow-sm mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-foreground">Weekly Activity</Text>
          <View className="bg-primary/10 px-2 py-1 rounded-md">
            <Text className="text-primary text-xs font-bold">+12%</Text>
          </View>
        </View>

        {/* Placeholder for a chart */}
        <View className="h-40 bg-muted/30 rounded-xl items-center justify-center border border-dashed border-border">
          <Text className="text-muted-foreground italic">Activity Chart Placeholder</Text>
        </View>
      </View>

      <View className="bg-secondary p-6 rounded-2xl">
        <Text className="text-white text-lg font-bold mb-1">Premium Insight</Text>
        <Text className="text-white/80">You've hit your cardio goals for 3 weeks straight! Keep it up.</Text>
      </View>
    </View>
  );
}
