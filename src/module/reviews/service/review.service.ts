import { apiClient } from "@/lib/api";
import { FlaggedReviewRecord, ReviewsApiResponse } from "../types/type";

export class ReviewService {
  public static async getFlaggedReviews(): Promise<FlaggedReviewRecord[]> {
    const response = await apiClient.get<
      ReviewsApiResponse<FlaggedReviewRecord[]>
    >("/admin/ratings/flagged");
    return response.data.data;
  }
}
