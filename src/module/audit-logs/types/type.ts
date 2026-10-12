export interface AuditLogRecord {
  id: number;
  admin_id: number;
  admin_email?: string;
  action: string;
  target_type: string;
  target_id: string;
  details: string | null;
  created_at: string;
}

export interface AuditLogsResponse {
  logs: AuditLogRecord[];
  total: number;
}
