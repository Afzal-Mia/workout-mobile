import React, { useMemo, useCallback } from 'react';
import { View, ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useGetWorkouts, WorkoutPlan } from '../../api';
import { WorkoutCard } from '../../components/workout/WorkoutCard';
import { WorkoutCardSkeleton } from '../../components/workout/WorkoutCardSkeleton';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { useRouter } from 'expo-router';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const searchQuery = useWorkoutStore((state) => state.searchQuery);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching
  } = useGetWorkouts(searchQuery);

  const workouts = useMemo(() => {
    return data?.pages.flatMap((page) => page.docs) || [];
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return <View className="h-4" />;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#237227" />
      </View>
    );
  }, [isFetchingNextPage]);
  const renderItem = useCallback(({ item }: { item: WorkoutPlan }) => (
    <WorkoutCard
      key={item._id}
      workout={item}
      onPress={() => router.push({ pathname: '/workout/[id]', params: { id: item._id } })}
    />
  ), [router]);
  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View className="flex-1">
          {[1, 2, 3, 4, 5].map((key) => (
            <WorkoutCardSkeleton key={key} />
          ))}
        </View>
      );
    }

    if (isError) {
      return (
        <ErrorState
          message="Failed to load workouts."
          onButtonPress={refetch}
          buttonText="Retry"
        />
      );
    }

    return (
      <EmptyState
        message="No workouts found."
        icon="search-outline"
      />
    );
  };

  return (
    <View className="flex-1 bg-background px-4 pt-4">
      <FlashList
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}

        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={['#237227']}
            tintColor="#237227"
          />
        }
      />
    </View>
  );
}
