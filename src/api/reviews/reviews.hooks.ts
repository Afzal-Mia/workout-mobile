import { useInfiniteFetcher } from "../../lib/react-query/useInfiniteFetcher";
import { apiClient } from "../api-client";
import { reviewEndpoints } from "./reviews.endpoints";
import { GetReviewsResponse } from "./reviews.types";

export const reviewKeys = {
  all: ["reviews"] as const,
  list: (planId: string, rating?: number) => [...reviewKeys.all, "list", planId, { rating }] as const,
};

export const useGetPlanReviews = (
  planId: string,
  rating?: number,
  sortBy: string = "-createdAt"
) => {
  return useInfiniteFetcher<GetReviewsResponse>({
    queryKey: [...reviewKeys.list(planId, rating), { sortBy }],
    queryFn: async ({ pageParam = 1 }) => {
      const params: Record<string, any> = {
        "options[page]": pageParam,
        "options[limit]": 10,
        "options[sortBy]": sortBy,
      };

      // Only apply the rating filter when a specific star is selected
      if (rating !== undefined) {
        params["filter[rating]"] = rating;
      }

      const res = await apiClient.get<GetReviewsResponse>(reviewEndpoints.list(planId), params);
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage || undefined;
      }
      return undefined;
    },
    options: {
      enabled: !!planId,
    },
  });
};
