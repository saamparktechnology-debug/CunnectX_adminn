export type VerificationStatus = "pending" | "approved" | "rejected";

export type RejectionReasonCode =
  | "voice_unclear"
  | "language_mismatch"
  | "other"
  | "ai_voice"
  | "abusive_content"
  | "suspended";

export interface RejectionReasonCatalogItem {
  code: RejectionReasonCode;
  label: string;
  isTerminal: boolean;
  description: string;
}

export interface VerificationSubmission {
  id: number;
  uuid: string;
  user_id: number;
  userName?: string;
  userPhone?: string;
  userGender?: "female";
  primaryLanguage?: string;
  voice_url: string;
  voice_duration_sec: number;
  voice_mime: string;
  voice_size_bytes: number;
  status: VerificationStatus;
  reviewed_by: number | null;
  reviewed_at: string | null;
  rejection_reason_code: RejectionReasonCode | null;
  rejection_reason_note: string | null;
  created_at: string;
}

export interface VerificationReviewPayload {
  action: "approved" | "rejected";
  reasonCode?: RejectionReasonCode;
  reasonNote?: string;
}

export interface VerificationApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}
