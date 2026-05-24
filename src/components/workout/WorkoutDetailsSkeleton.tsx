import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../ui/Skeleton';

/**
 * Skeleton placeholder for the Workout Details screen while data is loading.
 * It mimics the layout of the actual screen: image poster, title, premium badge,
 * meta info (duration, difficulty), and description.
 */
export function WorkoutDetailsSkeleton() {
  return (
    <View className="flex-1 bg-background mt-20 p-4">
      {/* Image placeholder */}
      <Skeleton height={256} width="100%" borderRadius={8} style={{ marginBottom: 16 }} />
      {/* Title placeholder */}
      <Skeleton height={24} width="60%" borderRadius={4} style={{ marginBottom: 12 }} />
      {/* Meta info placeholders */}
      <View className="flex-row flex-wrap gap-4 mb-6">
        <Skeleton height={20} width={80} borderRadius={4} />
        <Skeleton height={20} width={80} borderRadius={4} />
      </View>
      {/* Description placeholder (3 lines) */}
      <View className="space-y-2">
        <Skeleton height={14} width="100%" borderRadius={4} />
        <Skeleton height={14} width="90%" borderRadius={4} />
        <Skeleton height={14} width="95%" borderRadius={4} />
      </View>
    </View>
  );
}
