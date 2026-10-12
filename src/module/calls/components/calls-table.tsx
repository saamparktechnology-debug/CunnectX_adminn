"use client";

import React from "react";
import { PhoneCall, Eye } from "lucide-react";
import { AdminCallHistoryRecord } from "../types/type";
import { END_REASON_LABELS } from "../constants";
import { formatSecondsToTime } from "@/lib/utils";

interface CallsTableProps {
  calls: AdminCallHistoryRecord[];
  onSelect: (call: AdminCallHistoryRecord) => void;
}

export function CallsTable({ calls, onSelect }: CallsTableProps) {
  if (calls.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <PhoneCall className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-foreground">
          No Finalized Calls Found
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          Completed voice call records and ledger settlements will populate
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="py-3 px-4">Session</th>
            <th className="py-3 px-4">Caller (Male)</th>
            <th className="py-3 px-4">Companion (Female)</th>
            <th className="py-3 px-4">Duration</th>
            <th className="py-3 px-4">Deducted</th>
            <th className="py-3 px-4">Earned</th>
            <th className="py-3 px-4">Platform Margin</th>
            <th className="py-3 px-4">Termination</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-foreground">
          {calls.map((call) => {
            const reason = call.end_reason
              ? END_REASON_LABELS[call.end_reason] || {
                  label: call.end_reason,
                  badge: "bg-muted",
                }
              : {
                  label: "Completed",
                  badge:
                    "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                };

            return (
              <tr
                key={call.id}
                onClick={() => onSelect(call)}
                className="hover:bg-accent/40 transition-colors group cursor-pointer"
              >
                <td className="py-3 px-4 font-bold text-primary">
                  #{call.session_id}
                </td>
                <td className="py-3 px-4 font-sans text-foreground">
                  <span className="font-semibold block">
                    {call.caller_name || `User #${call.caller_id}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {call.caller_phone}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-foreground">
                  <span className="font-semibold block">
                    {call.companion_name || `User #${call.receiver_id}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {call.companion_phone}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-foreground">
                  {formatSecondsToTime(call.duration_seconds)} (
                  {call.billed_minutes}m)
                </td>
                <td className="py-3 px-4 text-rose-500 font-medium">
                  -₹{parseFloat(call.amount_deducted).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-emerald-500 font-medium">
                  +₹{parseFloat(call.amount_earned).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-primary font-bold">
                  ₹{parseFloat(call.platform_margin).toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${reason.badge}`}
                  >
                    {reason.label}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-sans">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(call);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted hover:bg-primary hover:text-white text-muted-foreground text-xs transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" /> Inspect
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
