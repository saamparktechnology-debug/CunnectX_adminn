"use client";

import React from "react";
import { X, Star, ShieldAlert, PhoneCall, User } from "lucide-react";
import { FlaggedReviewRecord } from "../types/type";
import { RATING_BADGE_STYLES, SEVERITY_DESCRIPTIONS } from "../constants";

interface ReviewDetailModalProps {
  review: FlaggedReviewRecord | null;
  onClose: () => void;
}

export function ReviewDetailModal({ review, onClose }: ReviewDetailModalProps) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative text-card-foreground">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Review Inspection & Moderation
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              REVIEW #{review.id} • CALL #{review.call_id}
            </p>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">
              Rating Score:
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  RATING_BADGE_STYLES[review.rating] ||
                  "bg-muted text-muted-foreground"
                }`}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                {review.rating} / 5 Stars
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {SEVERITY_DESCRIPTIONS[review.rating] ||
              "Automated review flag triggered."}
          </p>
        </div>

        {/* Participants Context */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-border bg-background p-3 flex items-center gap-2">
            <User className="h-4 w-4 text-primary shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground block uppercase font-semibold">
                Male Caller (Rater)
              </span>
              <span className="font-mono font-medium text-foreground">
                USER #{review.rater_id}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-3 flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground block uppercase font-semibold">
                Companion (Ratee)
              </span>
              <span className="font-mono font-medium text-foreground">
                USER #{review.ratee_id}
              </span>
            </div>
          </div>
        </div>

        {/* Caller Review Comment */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Caller's Feedback & Comments
          </label>
          <div className="rounded-lg border border-border bg-background p-3 text-xs text-foreground leading-relaxed">
            {review.review ? (
              <span className="italic font-sans">"{review.review}"</span>
            ) : (
              <span className="text-muted-foreground italic font-mono">
                No written text comment provided with this rating.
              </span>
            )}
          </div>
        </div>

        {/* System Flag Trigger Reason */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
            Trigger Reason
          </label>
          <div className="rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-mono text-muted-foreground">
            {review.flagged_reason || "Rating threshold <= 2 stars"}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-border flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-accent"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
