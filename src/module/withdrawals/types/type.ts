export type WithdrawalStatus = "pending" | "paid" | "rejected" | "failed";

export interface WithdrawalRecord {
  id: number;
  uuid: string;
  user_id: number;
  userName?: string;
  userPhone?: string;
  requested_amount: string;
  tax_amount: string;
  net_amount: string;
  payout_method: "upi";
  payout_upi_id: string;
  status: WithdrawalStatus;
  processed_by: number | null;
  processed_at: string | null;
  admin_note: string | null;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface SettleWithdrawalPayload {
  action: "paid" | "rejected";
  note: string;
}

export interface WithdrawalApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}
