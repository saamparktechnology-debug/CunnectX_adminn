"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../service/user.service";
import { UserStatusPayload } from "../types/type";

export const USERS_QUERY_KEY = ["admin", "users"];

export function useUsers(search = "") {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: [...USERS_QUERY_KEY, search],
    queryFn: () => UserService.getUsers({ limit: 50 }),
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  const toggleSuspensionMutation = useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: number;
      payload: UserStatusPayload;
    }) => UserService.toggleSuspension(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    refetch: usersQuery.refetch,
    toggleSuspension: toggleSuspensionMutation.mutateAsync,
    isUpdating: toggleSuspensionMutation.isPending,
  };
}
