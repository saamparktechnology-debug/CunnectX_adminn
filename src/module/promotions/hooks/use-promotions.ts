"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PromotionsAdminService } from "../service/promotions.service";

export const PROMOTIONS_KEY = ["admin", "promotions"];

export function usePromotions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: PROMOTIONS_KEY,
    queryFn: () => PromotionsAdminService.listPromotions(),
    staleTime: 30000,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) =>
      PromotionsAdminService.toggleStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROMOTIONS_KEY });
    },
  });

  return {
    promotions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    toggleStatus: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isPending,
  };
}
