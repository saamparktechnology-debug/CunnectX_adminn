export type UserGender = "male" | "female";
export type OnboardingStatus =
  | "unverified"
  | "pending"
  | "approved"
  | "rejected";

export interface UserRecord {
  id: number;
  uuid: string;
  phone_masked: string;
  gender: UserGender;
  nickname: string;
  avatar_url: string | null;
  real_name: string | null;
  id_name: string | null;
  birth_year: number | null;
  primary_language: string | null;
  onboarding_status: OnboardingStatus;
  is_online: boolean;
  is_suspended: boolean;
  suspension_reason: string | null;
  wallet_balance_inr?: string;
  created_at: string;
  updated_at: string;
}

export interface UserStatusPayload {
  isSuspended: boolean;
  reason?: string;
}

export interface UsersApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}
