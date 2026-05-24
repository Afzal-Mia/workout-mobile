import React from 'react';
import { View } from 'react-native';
import { Skeleton } from '../ui/Skeleton';

export const WorkoutCardSkeleton = () => {
  return (
    <View className="bg-white rounded-2xl shadow-sm mb-4 border border-border overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton width="100%" height={192} borderRadius={0} />
      
      <View className="p-4">
        {/* Title and Badge Row Skeleton */}
        <View className="flex-row justify-between items-start mb-2">
          {/* Title */}
          <Skeleton width="70%" height={24} borderRadius={4} />
          {/* Badge */}
          <Skeleton width={48} height={20} borderRadius={6} />
        </View>
        
        {/* Description Skeleton (2 lines) */}
        <View className="mb-3">
          <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: 4 }} />
          <Skeleton width="80%" height={16} borderRadius={4} />
        </View>
        
        {/* Footer (Duration & Difficulty) Skeleton */}
        <View className="flex-row items-center gap-4">
          <Skeleton width={80} height={16} borderRadius={4} />
          <Skeleton width={80} height={16} borderRadius={4} />
        </View>
      </View>
    </View>
  );
};
