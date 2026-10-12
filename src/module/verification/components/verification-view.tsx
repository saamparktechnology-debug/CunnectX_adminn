"use client";

import React, { useState } from "react";
import { ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import { useVerificationQueue } from "../hooks/use-verification-queue";
import { VerificationTable } from "./verification-table";
import { ReviewDecisionDrawer } from "./review-decision-drawer";
import { VerificationSubmission, RejectionReasonCode } from "../types/type";

export function VerificationView() {
  const {
    submissions,
    isLoading,
    isError,
    refetch,
    submitReview,
    isSubmitting,
  } = useVerificationQueue();
  const [activeSubmission, setActiveSubmission] =
    useState<VerificationSubmission | null>(null);

  const handleReviewSubmission = async (
    submissionId: number,
    action: "approved" | "rejected",
    reasonCode?: RejectionReasonCode,
    reasonNote?: string,
  ) => {
    await submitReview({
      submissionId,
      payload: { action, reasonCode, reasonNote },
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-neutral-100">
              Voice KYC Verification
            </h1>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Audit companion voice samples to approve callable availability or
            enforce terminal suspension policies.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-medium text-neutral-300 hover:bg-neutral-800 active:scale-95 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
          />{" "}
          Refresh
        </button>
      </div>

      {/* State Renderers */}
      {isLoading ? (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-12 text-center text-xs text-neutral-400">
          Loading verification audit queue...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-6 text-xs text-rose-300 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load verification queue
            </span>
            Ensure the backend API engine is online and your admin JWT session
            is active.
          </div>
        </div>
      ) : (
        <VerificationTable
          submissions={submissions}
          onSelect={(sub) => setActiveSubmission(sub)}
        />
      )}

      {/* Decision Drawer Component */}
      <ReviewDecisionDrawer
        submission={activeSubmission}
        onClose={() => setActiveSubmission(null)}
        onSubmit={handleReviewSubmission}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
