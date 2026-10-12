import { apiClient } from "@/lib/api";
import { LedgerResponse, AdjustBalancePayload } from "../types/type";

export class LedgerAdminService {
  public static async listTransactions(params: {
    type?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<LedgerResponse> {
    const response = await apiClient.get<{
      success: boolean;
      data: LedgerResponse;
      error: null;
    }>("/admin/ledger", { params });
    return response.data.data;
  }

  public static async adjustBalance(
    payload: AdjustBalancePayload,
  ): Promise<{ status: string }> {
    const response = await apiClient.post<{
      success: boolean;
      data: { status: string };
      error: null;
    }>("/admin/ledger/adjust", payload);
    return response.data.data;
  }
}
