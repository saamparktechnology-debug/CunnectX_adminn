"use client";

import React, { useState } from "react";
import { Banknote, RefreshCw, AlertCircle } from "lucide-react";
import { useWithdrawals } from "../hooks/use-withdrawals";
import { WithdrawalsTable } from "./withdrawals-table";
import { SettlePayoutModal } from "./settle-payout-modal";
import { WithdrawalRecord } from "../types/type";

export function WithdrawalsView() {
  const { withdrawals, isLoading, isError, refetch, settlePayout, isSettling } =
    useWithdrawals();
  const [activeRecord, setActiveRecord] = useState<WithdrawalRecord | null>(
    null,
  );

  const handleSettle = async (
    withdrawalId: number,
    action: "paid" | "rejected",
    note: string,
  ) => {
    await settlePayout({
      withdrawalId,
      payload: { action, note },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              UPI Payout Triage
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Audit and manually execute offline UPI transfers for female
            companion earnings. 2.5% tax retained by platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-accent active:scale-95 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
          />{" "}
          Refresh
        </button>
      </div>

      {/* State Handlers */}
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching live withdrawal requests from database...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load withdrawals queue
            </span>
            Verify that your backend Node engine is active and your admin
            session token is valid.
          </div>
        </div>
      ) : (
        <WithdrawalsTable
          withdrawals={withdrawals}
          onSelect={(item) => setActiveRecord(item)}
        />
      )}

      {/* Settlement Action Modal */}
      <SettlePayoutModal
        withdrawal={activeRecord}
        onClose={() => setActiveRecord(null)}
        onSettle={handleSettle}
        isSettling={isSettling}
      />
    </div>
  );
}
