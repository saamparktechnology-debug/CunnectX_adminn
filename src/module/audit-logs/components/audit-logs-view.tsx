"use client";

import React, { useState } from "react";
import { ShieldAlert, RefreshCw, AlertCircle, FileText } from "lucide-react";
import { useAuditLogs } from "../hooks/use-audit-logs";

export function AuditLogsView() {
  const [page, setPage] = useState(1);
  const { logs, total, isLoading, isError, refetch } = useAuditLogs(page, 50);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Administrative Audit Logs
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Tamper-evident trail tracking every admin decision, reconciliation,
            and balance mutation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-accent transition-all disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
          />{" "}
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Reading administrative audit journal...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Failed to load audit records.</span>
        </div>
      ) : logs.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          No audit entries recorded yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Log ID</th>
                <th className="py-3 px-4">Admin Email</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Payload Details</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-foreground">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-accent/40 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-primary">
                    #{log.id}
                  </td>
                  <td className="py-3 px-4 font-sans text-foreground">
                    {log.admin_email || `Admin #${log.admin_id}`}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-primary/10 text-primary border border-primary/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {log.target_type} #{log.target_id}
                  </td>
                  <td className="py-3 px-4 text-[11px] max-w-xs truncate text-muted-foreground select-all font-mono">
                    {log.details || "—"}
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground">
                    {new Date(log.created_at).toLocaleDateString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
