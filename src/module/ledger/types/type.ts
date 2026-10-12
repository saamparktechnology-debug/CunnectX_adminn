export type LedgerDirection = "credit" | "debit";

export interface LedgerTransactionRecord {
  id: number;
  uuid: string;
  user_id: number;
  wallet_id: number;
  type: string;
  direction: LedgerDirection;
  amount: string;
  balance_before: string;
  balance_after: string;
  reference_type: string;
  reference_id: number | null;
  metadata: any;
  created_at: string;
  user_nickname?: string;
  user_phone?: string;
}

export interface LedgerResponse {
  transactions: LedgerTransactionRecord[];
  total: number;
}

export interface AdjustBalancePayload {
  userId: number;
  amount: string;
  direction: LedgerDirection;
  reason: string;
}
