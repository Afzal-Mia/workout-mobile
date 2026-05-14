import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="py-8">
        <Text className="text-3xl font-bold text-foreground mb-2">Welcome Back!</Text>
        <Text className="text-muted-foreground text-lg">Check out your latest workout stats.</Text>
      </View>

      <View className="bg-card p-6 rounded-2xl border border-border shadow-sm mb-4">
        <Text className="text-xl font-semibold text-foreground mb-2">Daily Goal</Text>
        <View className="h-4 bg-muted rounded-full overflow-hidden">
          <View className="h-full bg-primary w-[75%]" />
        </View>
        <Text className="text-muted-foreground mt-2">75% completed</Text>
      </View>

      <View className="flex-row gap-4 mb-4">
        <View className="flex-1 bg-card p-4 rounded-2xl border border-border">
          <Text className="text-muted-foreground mb-1">Steps</Text>
          <Text className="text-2xl font-bold text-foreground">8,432</Text>
        </View>
        <View className="flex-1 bg-card p-4 rounded-2xl border border-border">
          <Text className="text-muted-foreground mb-1">Calories</Text>
          <Text className="text-2xl font-bold text-foreground">420 kcal</Text>
        </View>
      </View>
    </ScrollView>
  );
}
