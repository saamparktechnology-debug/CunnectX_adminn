"use client";

import { useQuery } from "@tanstack/react-query";
import { AuditLogsAdminService } from "../service/audit-logs.service";

export const AUDIT_LOGS_KEY = ["admin", "audit-logs"];

export function useAuditLogs(page = 1, limit = 50) {
  const offset = (page - 1) * limit;

  const query = useQuery({
    queryKey: [...AUDIT_LOGS_KEY, page, limit],
    queryFn: () => AuditLogsAdminService.listLogs(limit, offset),
    staleTime: 10000,
  });

  return {
    logs: query.data?.logs ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
