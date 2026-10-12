"use client";

import React, { useState } from "react";
import {
  X,
  User,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  Phone,
  Calendar,
  Globe,
} from "lucide-react";
import { UserRecord } from "../types/type";
import { ONBOARDING_BADGES } from "../constants";

interface UserInspectDrawerProps {
  user: UserRecord | null;
  onClose: () => void;
  onToggleSuspension: (
    userId: number,
    isSuspended: boolean,
    reason?: string,
  ) => Promise<void>;
  isUpdating: boolean;
}

export function UserInspectDrawer({
  user,
  onClose,
  onToggleSuspension,
  isUpdating,
}: UserInspectDrawerProps) {
  const [reason, setReason] = useState("");
  const [confirmBanStage, setConfirmBanStage] = useState(false);

  if (!user) return null;

  const handleAction = async () => {
    await onToggleSuspension(
      user.id,
      !user.is_suspended,
      reason.trim() || undefined,
    );
    setConfirmBanStage(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-card p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-card-foreground">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {user.nickname ? user.nickname.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {user.nickname || `User #${user.id}`}
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    UUID: {user.uuid.substring(0, 12)}...
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Role Type
                </span>
                <span className="font-medium text-foreground capitalize mt-1 block">
                  {user.gender === "female" ? "Companion" : "Caller"}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Presence Status
                </span>
                <span className="font-medium mt-1 flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.is_online ? "bg-emerald-500" : "bg-neutral-500"
                    }`}
                  />
                  {user.is_online ? "Active Now" : "Offline"}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="mt-5 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> Contact Phone
                </div>
                <span className="font-mono text-foreground">
                  {user.phone_masked}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" /> Primary Language
                </div>
                <span className="font-medium text-foreground capitalize">
                  {user.primary_language || "Not Specified"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Birth Year
                </div>
                <span className="font-mono text-foreground">
                  {user.birth_year || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5" /> Onboarding State
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                    ONBOARDING_BADGES[user.onboarding_status] ||
                    ONBOARDING_BADGES.unverified
                  }`}
                >
                  {user.onboarding_status}
                </span>
              </div>
            </div>

            {/* Account Status Alert */}
            {user.is_suspended && (
              <div className="mt-5 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-500">
                <span className="font-semibold block flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" /> Account Suspended
                </span>
                <p className="mt-1 text-[11px] leading-relaxed">
                  Reason:{" "}
                  {user.suspension_reason || "Violation of platform terms."}
                </p>
              </div>
            )}

            {/* Suspend Confirmation Input */}
            {confirmBanStage && (
              <div className="mt-5 space-y-2 animate-in fade-in">
                <label className="text-xs font-semibold text-foreground block">
                  {user.is_suspended
                    ? "Reason for Lifting Suspension"
                    : "Suspension Audit Note *"}
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Record justification in admin audit log..."
                  className="w-full rounded-lg border border-input bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-border mt-6">
            {!confirmBanStage ? (
              <button
                type="button"
                onClick={() => setConfirmBanStage(true)}
                className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  user.is_suspended
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                }`}
              >
                {user.is_suspended ? (
                  <>
                    <ShieldCheck className="h-4 w-4" /> Lift Account Suspension
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-4 w-4" /> Suspend User Account
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmBanStage(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAction}
                  disabled={isUpdating}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-50 ${
                    user.is_suspended
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  {isUpdating ? "Processing..." : "Confirm Status Change"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
