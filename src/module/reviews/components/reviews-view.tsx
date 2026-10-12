"use client";

import React, { useState } from "react";
import { Star, RefreshCw, AlertCircle } from "lucide-react";
import { useReviews } from "../hooks/use-reviews";
import { ReviewsTable } from "./reviews-table";
import { ReviewDetailModal } from "./review-detail-modal";
import { FlaggedReviewRecord } from "../types/type";

export function ReviewsView() {
  const { reviews, isLoading, isError, refetch } = useReviews();
  const [selectedReview, setSelectedReview] =
    useState<FlaggedReviewRecord | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Flagged Call Reviews
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Auditing 1 and 2-star call sessions to detect companion misconduct,
            language mismatch, or technical latency issues.
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
          Fetching flagged reviews queue from database...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load flagged reviews queue
            </span>
            Ensure your backend Node API is active and your admin token is
            valid.
          </div>
        </div>
      ) : (
        <ReviewsTable
          reviews={reviews}
          onSelect={(review) => setSelectedReview(review)}
        />
      )}

      {/* Detail Inspection Modal */}
      <ReviewDetailModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
}
