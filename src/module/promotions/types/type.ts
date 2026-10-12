export interface PromotionRecord {
  id: number;
  code: string;
  name: string;
  type: string;
  bonus_amount: string;
  min_recharge_amount: string;
  max_claims: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
  claim_count: number;
  total_disbursed: string;
}
