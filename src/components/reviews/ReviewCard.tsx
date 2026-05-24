import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Review } from '../../api';

interface ReviewCardProps {
  item: Review;
}

export const ReviewCard = React.memo(function ReviewCard({ item }: ReviewCardProps) {
  const avatarUri =
    item.user?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.name || 'User')}&background=237227&color=fff`;

  return (
    <View className="px-4 py-4 border-b border-gray-100 flex-row">
      <Image
        source={{ uri: avatarUri }}
        className="w-10 h-10 rounded-full mr-3 bg-gray-200"
      />
      <View className="flex-1">
        {/* Name + Rating badge */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-base text-foreground flex-1 pr-2" numberOfLines={1}>
            {item.user?.name || 'Anonymous'}
          </Text>

          <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded">
            {Array.from({ length: item.rating }).map((_, i) => (
              <Ionicons key={i} name="star" size={12} color="#d97706" />
            ))}
          </View>
        </View>

        {/* Comment */}
        {item.comment ? (
          <Text className="text-muted-foreground text-sm mt-1 leading-5">
            {item.comment}
          </Text>
        ) : null}

        {/* Date */}
        <Text className="text-xs text-gray-400 mt-2">
          {new Date(item.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>
    </View>
  );
});