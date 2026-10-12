import { apiClient } from "@/lib/api";
import { CallsApiResponse } from "../types/type";

export class CallAdminService {
  public static async listCalls(params: {
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<CallsApiResponse> {
    const response = await apiClient.get<{
      success: boolean;
      data: CallsApiResponse;
      error: null;
    }>("/admin/calls", { params });

    return response.data.data;
  }
}
