import { apiClient } from "@/lib/api";
import { AuditLogsResponse } from "../types/type";

export class AuditLogsAdminService {
  public static async listLogs(
    limit = 50,
    offset = 0,
  ): Promise<AuditLogsResponse> {
    const response = await apiClient.get<{
      success: boolean;
      data: AuditLogsResponse;
      error: null;
    }>("/admin/audit-logs", { params: { limit, offset } });
    return response.data.data;
  }
}
