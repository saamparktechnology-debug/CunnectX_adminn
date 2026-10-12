"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VerificationService } from "../service/verification.service";
import { VerificationReviewPayload } from "../types/type";

export const VERIFICATION_QUEUE_KEY = ["admin", "verifications", "pending"];

export function useVerificationQueue() {
  const queryClient = useQueryClient();

  const queueQuery = useQuery({
    queryKey: VERIFICATION_QUEUE_KEY,
    queryFn: () => VerificationService.getPendingQueue(),
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  const reviewMutation = useMutation({
    mutationFn: ({
      submissionId,
      payload,
    }: {
      submissionId: number;
      payload: VerificationReviewPayload;
    }) => VerificationService.reviewSubmission(submissionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VERIFICATION_QUEUE_KEY });
    },
  });

  return {
    submissions: queueQuery.data ?? [],
    isLoading: queueQuery.isLoading,
    isError: queueQuery.isError,
    error: queueQuery.error,
    refetch: queueQuery.refetch,
    submitReview: reviewMutation.mutateAsync,
    isSubmitting: reviewMutation.isPending,
  };
}
