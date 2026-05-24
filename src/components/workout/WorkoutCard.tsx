import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutPlan } from '../../api';

interface WorkoutCardProps {
  workout: WorkoutPlan;
  onPress: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-white rounded-2xl shadow-sm mb-4 border border-border overflow-hidden"
    >
      <Image 
        source={{ uri: workout.poster }} 
        className="w-full h-48 bg-muted"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-lg font-bold text-foreground flex-1 mr-2" numberOfLines={2}>
            {workout.goal}
          </Text>
          {workout.isPremium && (
            <View className="bg-amber-100 px-2 py-1 rounded-md flex-row items-center">
              <Ionicons name="star" size={12} color="#d97706" />
              <Text className="text-amber-700 text-xs font-bold ml-1">PRO</Text>
            </View>
          )}
        </View>
        
        <Text className="text-sm text-muted-foreground mb-3" numberOfLines={2}>
          {workout.description?.replace(/<[^>]*>?/gm, '') || ''}
        </Text>
        
        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center gap-4">
            {workout.duration && (
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={16} color="#71717a" />
                <Text className="text-xs text-muted-foreground ml-1">{workout.duration} Days</Text>
              </View>
            )}
            {workout.difficultyLevel && (
              <View className="flex-row items-center">
                <Ionicons name="bar-chart-outline" size={16} color="#71717a" />
                <Text className="text-xs text-muted-foreground ml-1">{workout.difficultyLevel}</Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center">
            <Text className="text-[#237227] font-semibold text-sm mr-1">View Workout</Text>
            <Ionicons name="arrow-forward" size={14} color="#237227" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
