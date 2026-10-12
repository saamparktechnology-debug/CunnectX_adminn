"use client";

import React from "react";
import { Banknote, CheckCircle, ArrowRight } from "lucide-react";
import { WithdrawalRecord } from "../types/type";
import { WITHDRAWAL_STATUS_BADGES } from "../constants";

interface WithdrawalsTableProps {
  withdrawals: WithdrawalRecord[];
  onSelect: (withdrawal: WithdrawalRecord) => void;
}

export function WithdrawalsTable({
  withdrawals,
  onSelect,
}: WithdrawalsTableProps) {
  if (withdrawals.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-emerald-500">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-foreground">
          Withdrawal Queue Clear
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          No pending companion payouts awaiting settlement. New requests from
          female users will populate here in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="py-3 px-4">Request ID</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Gross Req.</th>
            <th className="py-3 px-4">Tax (2.5%)</th>
            <th className="py-3 px-4">Net Payout</th>
            <th className="py-3 px-4">Destination UPI</th>
            <th className="py-3 px-4">Submitted At</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-foreground">
          {withdrawals.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-accent/40 transition-colors group cursor-pointer"
              onClick={() => onSelect(item)}
            >
              <td className="py-3 px-4 font-bold text-primary">#{item.id}</td>
              <td className="py-3 px-4 font-sans font-medium text-foreground">
                Companion #{item.user_id}
              </td>
              <td className="py-3 px-4 font-medium">
                ₹{parseFloat(item.requested_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-rose-500">
                ₹{parseFloat(item.tax_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-emerald-500 font-bold">
                ₹{parseFloat(item.net_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4 select-all text-muted-foreground font-sans text-[11px]">
                {item.payout_upi_id}
              </td>
              <td className="py-3 px-4 font-sans text-muted-foreground">
                {new Date(item.created_at).toLocaleDateString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-sans font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  Settle <ArrowRight className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
