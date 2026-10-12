import { apiClient } from "@/lib/api";
import {
  VerificationApiResponse,
  VerificationReviewPayload,
  VerificationSubmission,
} from "../types/type";

export class VerificationService {
  public static async getPendingQueue(): Promise<VerificationSubmission[]> {
    const response = await apiClient.get<
      VerificationApiResponse<VerificationSubmission[]>
    >("/admin/verifications/pending");
    return response.data.data;
  }

  public static async reviewSubmission(
    submissionId: number,
    payload: VerificationReviewPayload,
  ): Promise<{ id: number; result: string }> {
    const response = await apiClient.post<
      VerificationApiResponse<{ id: number; result: string }>
    >(`/admin/verifications/${submissionId}/review`, payload);
    return response.data.data;
  }
}
