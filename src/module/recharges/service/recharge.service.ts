import { apiClient } from "@/lib/api";
import {
  ApiResponse,
  RechargesListResponse,
  ReconcilePayload,
} from "../types/type";

export class RechargeAdminService {
  public static async listOrders(params: {
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<RechargesListResponse> {
    const response = await apiClient.get<ApiResponse<RechargesListResponse>>(
      "/admin/recharges",
      { params },
    );
    return response.data.data;
  }

  public static async manualReconcile(
    orderId: number,
    payload: ReconcilePayload,
  ): Promise<{ id: number; status: string }> {
    const response = await apiClient.post<
      ApiResponse<{ id: number; status: string }>
    >(`/admin/recharges/${orderId}/reconcile`, payload);
    return response.data.data;
  }
}
