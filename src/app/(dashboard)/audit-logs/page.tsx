import { Metadata } from "next";
import { AuditLogsView } from "@/module/audit-logs";

export const metadata: Metadata = {
  title: "Admin Audit Logs | Connect24x Admin",
  description:
    "Tamper-evident logs of all administrative mutations and approvals.",
};

export default function AuditLogsPage() {
  return (
    <div className="w-full">
      <AuditLogsView />
    </div>
  );
}
