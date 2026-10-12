'"use client";';
import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "../service/review.service";

export const FLAGGED_REVIEWS_KEY = ["admin", "ratings", "flagged"];

export function useReviews() {
  const query = useQuery({
    queryKey: FLAGGED_REVIEWS_KEY,
    queryFn: () => ReviewService.getFlaggedReviews(),
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  return {
    reviews: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
