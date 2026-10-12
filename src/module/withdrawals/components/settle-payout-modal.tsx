"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Building2,
  ShieldAlert,
} from "lucide-react";
import { WithdrawalRecord } from "../types/type";

interface SettlePayoutModalProps {
  withdrawal: WithdrawalRecord | null;
  onClose: () => void;
  onSettle: (
    withdrawalId: number,
    action: "paid" | "rejected",
    note: string,
  ) => Promise<void>;
  isSettling: boolean;
}

export function SettlePayoutModal({
  withdrawal,
  onClose,
  onSettle,
  isSettling,
}: SettlePayoutModalProps) {
  const [action, setAction] = useState<"paid" | "rejected">("paid");
  const [note, setNote] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  if (!withdrawal) return null;

  const handleCopyUPI = async () => {
    await navigator.clipboard.writeText(withdrawal.payout_upi_id);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    await onSettle(withdrawal.id, action, note.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative text-card-foreground">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSettling}
          className="absolute top-5 right-5 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Settle Companion Withdrawal
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              REQ-ID #{withdrawal.id} • USER #{withdrawal.user_id}
            </p>
          </div>
        </div>

        {/* Financial Breakdown Card */}
        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Gross Requested Amount:</span>
            <span className="font-mono font-medium text-foreground">
              ₹{parseFloat(withdrawal.requested_amount).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Platform Tax Deducted (2.5%):</span>
            <span className="font-mono font-medium text-rose-500">
              -₹{parseFloat(withdrawal.tax_amount).toFixed(2)}
            </span>
          </div>
          <div className="pt-2 border-t border-border flex justify-between items-center font-semibold text-sm">
            <span className="text-foreground">Net Payout to Transfer:</span>
            <span className="font-mono text-emerald-500 text-base">
              ₹{parseFloat(withdrawal.net_amount).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Target UPI ID with Instant Copy Button */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Destination UPI ID (Virtual Payment Address)
          </label>
          <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono font-semibold">
            <span className="text-foreground select-all">
              {withdrawal.payout_upi_id}
            </span>
            <button
              type="button"
              onClick={handleCopyUPI}
              className="inline-flex items-center gap-1 rounded px-2 py-1 bg-accent text-[11px] font-sans text-foreground hover:bg-muted transition-colors"
            >
              {copiedUpi ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy VPA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Action Selection */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-2">
              Resolution Decision
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAction("paid")}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  action === "paid"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                    : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Mark Transfer Paid
              </button>
              <button
                type="button"
                onClick={() => setAction("rejected")}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  action === "rejected"
                    ? "border-rose-500 bg-rose-500/10 text-rose-500"
                    : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <AlertTriangle className="h-3.5 w-3.5" /> Reject & Auto-Refund
              </button>
            </div>
          </div>

          {action === "rejected" && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-500 flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">
                  Automatic Refund Trigger
                </span>
                Rejecting this will immediately credit the gross amount (₹
                {parseFloat(withdrawal.requested_amount).toFixed(2)}) back to
                the companion's wallet via an immutable transaction.
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              {action === "paid"
                ? "Banking UTR / Transaction Reference ID *"
                : "Rejection Reason (Auditor Note) *"}
            </label>
            <textarea
              required
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                action === "paid"
                  ? "e.g., UTR-SBI-982187391823"
                  : "e.g., Invalid UPI VPA handle; rejected by bank"
              }
              className="w-full rounded-lg border border-input bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSettling}
              className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSettling || !note.trim()}
              className={`rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-sm disabled:opacity-50 transition-all ${
                action === "paid"
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-rose-600 hover:bg-rose-500"
              }`}
            >
              {isSettling ? "Committing Settlement..." : "Confirm & Commit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
