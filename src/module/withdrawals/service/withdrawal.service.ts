import { apiClient } from "@/lib/api";
import {
  WithdrawalApiResponse,
  WithdrawalRecord,
  SettleWithdrawalPayload,
} from "../types/type";

export class WithdrawalService {
  public static async getPendingWithdrawals(): Promise<WithdrawalRecord[]> {
    const response = await apiClient.get<
      WithdrawalApiResponse<WithdrawalRecord[]>
    >("/admin/withdrawals/pending");
    return response.data.data;
  }

  public static async settlePayout(
    withdrawalId: number,
    payload: SettleWithdrawalPayload,
  ): Promise<{ id: number; status: string }> {
    const response = await apiClient.post<
      WithdrawalApiResponse<{ id: number; status: string }>
    >(`/admin/withdrawals/${withdrawalId}/settle`, payload);
    return response.data.data;
  }
}
