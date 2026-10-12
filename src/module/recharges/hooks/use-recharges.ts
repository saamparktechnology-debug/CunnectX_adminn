"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RechargeAdminService } from "../service/recharge.service";
import { ReconcilePayload } from "../types/type";

export const RECHARGES_QUERY_KEY = ["admin", "recharges"];

export function useRecharges(
  status = "all",
  search = "",
  page = 1,
  limit = 20,
) {
  const queryClient = useQueryClient();
  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: [...RECHARGES_QUERY_KEY, status, search, page, limit],
    queryFn: () =>
      RechargeAdminService.listOrders({
        status: status === "all" ? undefined : status,
        search: search.trim() || undefined,
        limit,
        offset,
      }),
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  const reconcileMutation = useMutation({
    mutationFn: ({
      orderId,
      payload,
    }: {
      orderId: number;
      payload: ReconcilePayload;
    }) => RechargeAdminService.manualReconcile(orderId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECHARGES_QUERY_KEY });
    },
  });

  return {
    orders: query.data?.orders ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    reconcileOrder: reconcileMutation.mutateAsync,
    isReconciling: reconcileMutation.isPending,
  };
}
