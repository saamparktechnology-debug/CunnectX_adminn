import { apiClient } from "@/lib/api";
import { UserRecord, UserStatusPayload, UsersApiResponse } from "../types/type";

export class UserService {
  public static async getUsers(params?: {
    search?: string;
    gender?: string;
    limit?: number;
    offset?: number;
  }): Promise<UserRecord[]> {
    const response = await apiClient.get<UsersApiResponse<UserRecord[]>>(
      "/admin/users",
      { params },
    );
    return response.data.data;
  }

  public static async toggleSuspension(
    userId: number,
    payload: UserStatusPayload,
  ): Promise<{ id: number; isSuspended: boolean }> {
    const response = await apiClient.patch<
      UsersApiResponse<{ id: number; isSuspended: boolean }>
    >(`/admin/users/${userId}/suspension`, payload);
    return response.data.data;
  }
}
