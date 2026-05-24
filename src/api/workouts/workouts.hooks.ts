import { useInfiniteFetcher } from "../../lib/react-query/useInfiniteFetcher";
import { useFetcher } from "../../lib/react-query/useFetcher";
import { apiClient } from "../api-client";
import { workoutEndpoints } from "./workouts.endpoints";
import { GetWorkoutsResponse, WorkoutPlan } from "./workouts.types";

export const workoutKeys = {
  all: ["workouts"] as const,
  list: (searchQuery: string) => [...workoutKeys.all, "list", searchQuery] as const,
  details: (id: string) => [...workoutKeys.all, "details", id] as const,
};

export const useGetWorkouts = (searchQuery: string) => {
  return useInfiniteFetcher<GetWorkoutsResponse>({
    queryKey: workoutKeys.list(searchQuery),
    queryFn: async ({ pageParam = 1 }) => {
      // Use query string formatting that matches the Express backend expectation
      const params: Record<string, any> = {
        "options[page]": pageParam,
        "options[limit]": 10,
      };
      
      if (searchQuery) {
        params["filter[search]"] = searchQuery;
      }

      const res = await apiClient.get<GetWorkoutsResponse>(workoutEndpoints.list, params);
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage || undefined;
      }
      return undefined;
    },
  });
};

export const useGetWorkoutDetails = (id: string) => {
  return useFetcher<WorkoutPlan>({
    queryKey: workoutKeys.details(id),
    queryFn: async () => {
      const res = await apiClient.get<{ plan: WorkoutPlan }>(workoutEndpoints.details(id));
      return res.plan;
    },
    options: {
      enabled: !!id,
    },
  });
};

