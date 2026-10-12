"use client";

import React from "react";
import { X, PhoneCall, Radio, Clock, ShieldCheck, User } from "lucide-react";
import { AdminCallHistoryRecord } from "../types/type";
import { END_REASON_LABELS } from "../constants";
import { formatSecondsToTime } from "@/lib/utils";

interface CallInspectModalProps {
  call: AdminCallHistoryRecord | null;
  onClose: () => void;
}

export function CallInspectModal({ call, onClose }: CallInspectModalProps) {
  if (!call) return null;

  const reasonInfo = call.end_reason
    ? END_REASON_LABELS[call.end_reason] || {
        label: call.end_reason,
        badge: "bg-muted text-muted-foreground",
      }
    : { label: "Completed", badge: "bg-emerald-500/10 text-emerald-500" };

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
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Call Session Financial Ledger
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              SESSION #{call.session_id} • HISTORY #{call.id}
            </p>
          </div>
        </div>

        {/* 3-Way Sub-Minute Billing Split */}
        <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Duration:</span>
            <span className="font-mono font-semibold text-foreground">
              {formatSecondsToTime(call.duration_seconds)} (
              {call.billed_minutes} Billed Min @ ₹{call.rate_caller}/min)
            </span>
          </div>

          <div className="flex justify-between items-center text-muted-foreground">
            <span>Caller Wallet Deducted:</span>
            <span className="font-mono font-semibold text-rose-500">
              -₹{parseFloat(call.amount_deducted).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-muted-foreground">
            <span>Companion Wallet Credited:</span>
            <span className="font-mono font-semibold text-emerald-500">
              +₹{parseFloat(call.amount_earned).toFixed(2)} (@ ₹
              {call.rate_receiver}/min)
            </span>
          </div>

          <div className="pt-2 border-t border-border flex justify-between items-center">
            <span className="font-semibold text-foreground">
              Platform Margin Retained:
            </span>
            <span className="font-mono font-bold text-primary text-sm">
              ₹{parseFloat(call.platform_margin).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Telephony Identifiers */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
            <span className="text-muted-foreground font-mono">
              ZEGOCLOUD Room:
            </span>
            <span className="font-mono font-medium select-all">
              {call.room_id}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background">
            <span className="text-muted-foreground font-mono">
              Termination Reason:
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${reasonInfo.badge}`}
            >
              {reasonInfo.label}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background font-mono text-[11px]">
            <span className="text-muted-foreground">Session Times:</span>
            <span>
              {new Date(call.start_time).toLocaleTimeString("en-IN")} →{" "}
              {new Date(call.end_time).toLocaleTimeString("en-IN")}
            </span>
          </div>
        </div>

        {/* Participant Profiles */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-border bg-background">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
              Caller (Male)
            </span>
            <span className="font-semibold block">
              {call.caller_name || `User #${call.caller_id}`}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {call.caller_phone}
            </span>
          </div>

          <div className="p-3 rounded-lg border border-border bg-background">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">
              Companion (Female)
            </span>
            <span className="font-semibold block">
              {call.companion_name || `User #${call.receiver_id}`}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {call.companion_phone}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-accent"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
