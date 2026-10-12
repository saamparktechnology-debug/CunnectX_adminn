"use client";

import React, { useState } from "react";
import { X, Scale, AlertCircle, CheckCircle } from "lucide-react";
import { AdjustBalancePayload } from "../types/type";

interface AdjustBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdjust: (payload: AdjustBalancePayload) => Promise<void>;
  isAdjusting: boolean;
}

export function AdjustBalanceModal({
  isOpen,
  onClose,
  onAdjust,
  isAdjusting,
}: AdjustBalanceModalProps) {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"credit" | "debit">("credit");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsedId = parseInt(userId, 10);
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedId) || parsedId <= 0) {
      setError("Please specify a valid numeric User ID.");
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid positive INR adjustment amount.");
      return;
    }

    if (!reason.trim()) {
      setError("An audit justification note is strictly mandatory.");
      return;
    }

    try {
      await onAdjust({
        userId: parsedId,
        amount: parsedAmount.toFixed(2),
        direction,
        reason: reason.trim(),
      });
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.error?.message ||
          "Failed to post ledger adjustment.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl relative text-card-foreground">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Manual Balance Adjustment
            </h3>
            <p className="text-xs text-muted-foreground">
              Direct modification of a user's wallet float with full ledger
              audit.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              User ID *
            </label>
            <input
              type="number"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 104"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Direction *
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as any)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="credit">Credit (+ INR)</option>
                <option value="debit">Debit (- INR)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100.00"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Audit Justification Reason *
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Customer support compensatory refund for call drop session #449"
              className="w-full rounded-lg border border-input bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdjusting}
              className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isAdjusting ? "Applying Adjustment..." : "Execute Adjustment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
