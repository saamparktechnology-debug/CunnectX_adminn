export interface AdminCallHistoryRecord {
  id: number;
  session_id: number;
  session_uuid: string;
  room_id: string;
  caller_id: number;
  caller_name: string | null;
  caller_phone: string;
  receiver_id: number;
  companion_name: string | null;
  companion_phone: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  billed_minutes: number;
  rate_caller: string;
  rate_receiver: string;
  amount_deducted: string;
  amount_earned: string;
  platform_margin: string;
  end_reason: string | null;
  status: string;
}

export interface CallsApiResponse {
  calls: AdminCallHistoryRecord[];
  total: number;
  activeCount: number;
}
