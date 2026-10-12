"use client";

import { useQuery } from "@tanstack/react-query";
import { CallAdminService } from "../service/call.service";

export const CALLS_ADMIN_KEY = ["admin", "calls"];

export function useCalls(search = "", page = 1, limit = 20) {
  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: [...CALLS_ADMIN_KEY, search, page, limit],
    queryFn: () =>
      CallAdminService.listCalls({
        search: search.trim() || undefined,
        limit,
        offset,
      }),
    staleTime: 15000,
    refetchInterval: 15000,
  });

  return {
    calls: query.data?.calls ?? [],
    total: query.data?.total ?? 0,
    activeCount: query.data?.activeCount ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
