export interface FlaggedReviewRecord {
  id: number;
  call_id: number;
  rater_id: number;
  caller_name?: string;
  caller_phone?: string;
  ratee_id: number;
  companion_name?: string;
  companion_phone?: string;
  rating: number;
  review?: string | null;
  comment?: string | null;
  flagged_reason?: string | null;
  is_flagged: boolean;
  created_at: string;
}

export interface ReviewsApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}
