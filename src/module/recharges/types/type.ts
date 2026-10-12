export type RechargeStatus =
  | "pending"
  | "success"
  | "failed"
  | "user_cancelled";

export interface RechargeRecord {
  id: number;
  uuid: string;
  user_id: number;
  user_phone?: string;
  user_nickname?: string;
  base_amount: string;
  tax_amount: string;
  total_amount: string;
  currency: string;
  status: RechargeStatus;
  pg_provider: string;
  pg_txn_id: string | null;
  pg_status: string | null;
  pg_hash: string | null;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export interface RechargesListResponse {
  orders: RechargeRecord[];
  total: number;
}

export interface ReconcilePayload {
  note: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
  } | null;
}
