"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WithdrawalService } from "../service/withdrawal.service";
import { SettleWithdrawalPayload } from "../types/type";

export const WITHDRAWALS_QUEUE_KEY = ["admin", "withdrawals", "pending"];

export function useWithdrawals() {
  const queryClient = useQueryClient();

  const queueQuery = useQuery({
    queryKey: WITHDRAWALS_QUEUE_KEY,
    queryFn: () => WithdrawalService.getPendingWithdrawals(),
    staleTime: 20000,
    refetchOnWindowFocus: true,
  });

  const settleMutation = useMutation({
    mutationFn: ({
      withdrawalId,
      payload,
    }: {
      withdrawalId: number;
      payload: SettleWithdrawalPayload;
    }) => WithdrawalService.settlePayout(withdrawalId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WITHDRAWALS_QUEUE_KEY });
    },
  });

  return {
    withdrawals: queueQuery.data ?? [],
    isLoading: queueQuery.isLoading,
    isError: queueQuery.isError,
    error: queueQuery.error,
    refetch: queueQuery.refetch,
    settlePayout: settleMutation.mutateAsync,
    isSettling: settleMutation.isPending,
  };
}
