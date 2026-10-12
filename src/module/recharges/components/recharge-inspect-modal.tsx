"use client";

import React, { useState } from "react";
import {
  X,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Hash,
} from "lucide-react";
import { RechargeRecord } from "../types/type";
import { RECHARGE_STATUS_BADGES } from "../constants";

interface RechargeInspectModalProps {
  order: RechargeRecord | null;
  onClose: () => void;
  onReconcile: (orderId: number, note: string) => Promise<void>;
  isReconciling: boolean;
}

export function RechargeInspectModal({
  order,
  onClose,
  onReconcile,
  isReconciling,
}: RechargeInspectModalProps) {
  const [note, setNote] = useState("");
  const [confirmStage, setConfirmStage] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!order) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleConfirmReconcile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    await onReconcile(order.id, note.trim());
    setConfirmStage(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative text-card-foreground">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              PayU Transaction Inspector
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              ORDER #{order.id} • {order.uuid}
            </p>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              User Credited Balance:
            </span>
            <span className="font-mono font-semibold text-emerald-500 text-sm">
              ₹{parseFloat(order.base_amount).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              Platform 4% GST / Tax:
            </span>
            <span className="font-mono font-medium text-foreground">
              ₹{parseFloat(order.tax_amount).toFixed(2)}
            </span>
          </div>
          <div className="pt-2 border-t border-border flex justify-between items-center">
            <span className="font-semibold text-foreground">
              Total Charged on Gateway:
            </span>
            <span className="font-mono font-bold text-foreground text-sm">
              ₹{parseFloat(order.total_amount).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Gateway Audit Identifiers */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
            <span className="text-muted-foreground font-mono">
              PayU mihpayid:
            </span>
            <span className="font-mono font-medium select-all">
              {order.pg_txn_id || "None (Not returned by webhook)"}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
            <span className="text-muted-foreground font-mono">
              Order Status:
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                RECHARGE_STATUS_BADGES[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.pg_hash && (
            <div className="p-2.5 rounded-lg border border-border bg-background">
              <div className="flex items-center justify-between mb-1">
                <span className="text-muted-foreground font-mono text-[10px] uppercase">
                  PayU SHA-512 Hash
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(order.pg_hash!, "hash")}
                  className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
                >
                  {copiedKey === "hash" ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  Copy
                </button>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground truncate select-all">
                {order.pg_hash}
              </p>
            </div>
          )}
        </div>

        {/* Manual Reconciliation Section for Pending / Failed Orders */}
        {order.status !== "success" && (
          <div className="mt-5 pt-4 border-t border-border">
            {!confirmStage ? (
              <button
                type="button"
                onClick={() => setConfirmStage(true)}
                className="w-full rounded-lg border border-primary/30 bg-primary/10 py-2.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" /> Manually Reconcile as
                Success
              </button>
            ) : (
              <form onSubmit={handleConfirmReconcile} className="space-y-3">
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-500 flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">
                      Atomic Wallet Credit Trigger
                    </span>
                    This will mark the order `success` and credit ₹
                    {parseFloat(order.base_amount).toFixed(2)} to User #
                    {order.user_id}'s wallet ledger.
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Bank Reference / Payment Proof Note *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Bank statement UTR confirmed by user on support ticket #120"
                    className="w-full rounded-lg border border-input bg-background p-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmStage(false)}
                    className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-accent"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isReconciling || !note.trim()}
                    className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
                  >
                    {isReconciling
                      ? "Reconciling Ledger..."
                      : "Confirm & Credit Wallet"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
