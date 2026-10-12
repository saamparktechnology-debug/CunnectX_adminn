"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LedgerAdminService } from "../service/ledger.service";
import { AdjustBalancePayload } from "../types/type";

export const LEDGER_QUERY_KEY = ["admin", "ledger"];

export function useLedger(type = "all", search = "", page = 1, limit = 25) {
  const queryClient = useQueryClient();
  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: [...LEDGER_QUERY_KEY, type, search, page, limit],
    queryFn: () =>
      LedgerAdminService.listTransactions({
        type: type === "all" ? undefined : type,
        search: search.trim() || undefined,
        limit,
        offset,
      }),
    staleTime: 15000,
  });

  const adjustMutation = useMutation({
    mutationFn: (payload: AdjustBalancePayload) =>
      LedgerAdminService.adjustBalance(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEDGER_QUERY_KEY });
    },
  });

  return {
    transactions: query.data?.transactions ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    adjustBalance: adjustMutation.mutateAsync,
    isAdjusting: adjustMutation.isPending,
  };
}
