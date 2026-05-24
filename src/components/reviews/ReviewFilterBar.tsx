import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RATINGS = [5, 4, 3, 2, 1] as const;
const ACTIVE_COLOR = '#237227';

interface ReviewFilterBarProps {
  /** Currently selected rating; undefined = "All" */
  rating: number | undefined;
  onRatingChange: (rating: number | undefined) => void;
}

export function ReviewFilterBar({ rating, onRatingChange }: ReviewFilterBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-2"
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {/* All chip */}
      <TouchableOpacity
        onPress={() => onRatingChange(undefined)}
        className={`mr-2 px-4 py-2 rounded-full border ${
          rating === undefined
            ? 'bg-[#237227] border-[#237227]'
            : 'border-gray-200 bg-white'
        }`}
        accessibilityLabel="Show all reviews"
        accessibilityRole="button"
        accessibilityState={{ selected: rating === undefined }}
      >
        <Text className={rating === undefined ? 'text-white font-semibold' : 'text-foreground'}>
          All
        </Text>
      </TouchableOpacity>

      {/* Star chips */}
      {RATINGS.map((r) => {
        const isActive = rating === r;
        return (
          <TouchableOpacity
            key={r}
            onPress={() => onRatingChange(r)}
            className={`mr-2 px-4 py-2 rounded-full border flex-row items-center ${
              isActive ? 'bg-[#237227] border-[#237227]' : 'border-gray-200 bg-white'
            }`}
            accessibilityLabel={`Filter by ${r} stars`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text className={`${isActive ? 'text-white' : 'text-foreground'} mr-1.5 font-semibold`}>
              {r}
            </Text>
            <Ionicons name="star" size={14} color={isActive ? 'white' : ACTIVE_COLOR} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
