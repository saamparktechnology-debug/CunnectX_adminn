import { apiClient } from "@/lib/api";
import { PromotionRecord } from "../types/type";

export class PromotionsAdminService {
  public static async listPromotions(): Promise<PromotionRecord[]> {
    const response = await apiClient.get<{
      success: boolean;
      data: PromotionRecord[];
      error: null;
    }>("/admin/promotions");
    return response.data.data;
  }

  public static async toggleStatus(
    id: number,
    isActive: boolean,
  ): Promise<void> {
    await apiClient.patch(`/admin/promotions/${id}/status`, { isActive });
  }
}
