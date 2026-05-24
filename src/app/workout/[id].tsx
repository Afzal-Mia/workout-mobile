import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGetWorkoutDetails, useGetPlanReviews, Review } from '../../api';
import { Header } from '../../components/common/Header';
import { ReviewCard } from '../../components/reviews/ReviewCard';
import { ReviewFilterBar } from '../../components/reviews/ReviewFilterBar';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { WorkoutDetailsSkeleton } from '../../components/workout/WorkoutDetailsSkeleton';
import { ActivityIndicator } from 'react-native';

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Default: All reviews (undefined), sorted newest first (-createdAt)
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined);

  const { data: workout, isLoading, isError } = useGetWorkoutDetails(id);

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPlanReviews(id, ratingFilter, '-createdAt');

  const reviews = reviewsData?.pages.flatMap((page) => page.docs) ?? [];

  const renderItem = useCallback(({ item }: { item: Review }) => (
    <ReviewCard item={item} />
  ), []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* ─── Loading / Error states ─────────────────────────────────── */
  if (isLoading) {
    return <WorkoutDetailsSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load workout details."
        onButtonPress={() => router.back()}
        buttonText="Go Back"
      />
    );
  }

  if (!workout) {
    return (
      <EmptyState
        message="Workout not found."
        icon="barbell-outline"
        onButtonPress={() => router.back()}
        buttonText="Go Back"
      />
    );
  }

  // At this point workout is defined
  /* ─── FlatList header ────────────────────────────────────────── */
  const renderHeader = () => (
    <>
      {/* Poster */}
      <Image
        source={{ uri: workout.poster }}
        className="w-full h-64 bg-muted"
        resizeMode="cover"
      />

      {/* Content Details */}
      <View className="px-4 py-5">
        <View className="flex-row justify-between items-start mb-4">
          <Text className="text-2xl font-bold text-foreground flex-1 pr-4">
            {workout?.goal}
          </Text>
          {workout.isPremium && (
            <View className="bg-amber-100 px-3 py-1.5 rounded-md flex-row items-center self-start">
              <Ionicons name="star" size={14} color="#d97706" />
              <Text className="text-amber-700 text-sm font-bold ml-1">PRO</Text>
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap gap-4 mb-6">
          {workout.duration && (
            <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg">
              <Ionicons name="time-outline" size={18} color="#71717a" />
              <Text className="text-sm font-medium ml-2">{workout.duration} Days</Text>
            </View>
          )}
          {workout.difficultyLevel && (
            <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg">
              <Ionicons name="bar-chart-outline" size={18} color="#71717a" />
              <Text className="text-sm font-medium ml-2">{workout.difficultyLevel}</Text>
            </View>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold mb-2">Description</Text>
          <Text className="text-base text-muted-foreground leading-6">
            {workout.description
              ?.replace(/<[^>]*>?/gm, '')
              .replace(/&nbsp;/g, ' ') || 'No description provided.'}
          </Text>
        </View>
      </View>

      {/* Reviews Section Header & Filter */}
      <View className="px-4 pb-2">
        <Text className="text-xl font-bold mb-4">Reviews</Text>
        <ReviewFilterBar rating={ratingFilter} onRatingChange={setRatingFilter} />
      </View>
    </>
  );

  /* ─── FlatList footer ────────────────────────────────────────── */
  

  const renderFooter = () => (
    <View className="py-6 items-center">
      {isFetchingNextPage || isReviewsLoading ? (
        <ActivityIndicator size="small" color="#666" />
      ) : reviews.length === 0 ? (
        <Text className="text-muted-foreground text-center py-4">No reviews found.</Text>
      ) : !hasNextPage ? (
        <Text className="text-gray-400 text-xs">No more reviews</Text>
      ) : null}
    </View>
  );

  /* ─── Root ───────────────────────────────────────────────────── */
  return (
    <View className="flex-1 bg-background">
      <Header title="Workout Details" onBackPress={() => router.push('/(tabs)/home')} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={reviews}
        keyExtractor={(item, index) => item._id ? `${item._id}-${index}` : String(index)}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        removeClippedSubviews={true}
        windowSize={5}
        getItemLayout={(_, index) => ({ length: 120, offset: 120 * index, index })}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
