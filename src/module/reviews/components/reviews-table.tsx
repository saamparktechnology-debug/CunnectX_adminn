"use client";

import React from "react";
import { Star, Eye, CheckCircle2 } from "lucide-react";
import { FlaggedReviewRecord } from "../types/type";
import { RATING_BADGE_STYLES } from "../constants";

interface ReviewsTableProps {
  reviews: FlaggedReviewRecord[];
  onSelect: (review: FlaggedReviewRecord) => void;
}

export function ReviewsTable({ reviews, onSelect }: ReviewsTableProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-emerald-500">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-foreground">
          Flagged Reviews Queue Clear
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          No calls with ratings ≤ 2 stars require moderation right now. New low
          ratings will route here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="py-3 px-4">Review ID</th>
            <th className="py-3 px-4">Call ID</th>
            <th className="py-3 px-4">Rating</th>
            <th className="py-3 px-4">Caller (Rater)</th>
            <th className="py-3 px-4">Companion (Ratee)</th>
            <th className="py-3 px-4">Comment Snippet</th>
            <th className="py-3 px-4">Submitted At</th>
            <th className="py-3 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-foreground">
          {reviews.map((item) => {
            const commentText = item.review || item.comment || "";
            return (
              <tr
                key={item.id}
                className="hover:bg-accent/40 transition-colors group cursor-pointer"
                onClick={() => onSelect(item)}
              >
                <td className="py-3 px-4 font-bold text-primary">#{item.id}</td>
                <td className="py-3 px-4 font-medium text-foreground">
                  #{item.call_id}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      RATING_BADGE_STYLES[item.rating] ||
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Star className="h-3 w-3 fill-current" />
                    {item.rating} Star{item.rating > 1 ? "s" : ""}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-foreground">
                  <span className="font-semibold block">
                    {item.caller_name || `User #${item.rater_id}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.caller_phone || `ID: ${item.rater_id}`}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-foreground">
                  <span className="font-semibold block">
                    {item.companion_name || `User #${item.ratee_id}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.companion_phone || `ID: ${item.ratee_id}`}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-muted-foreground max-w-[200px] truncate">
                  {commentText || (
                    <span className="font-mono text-xs opacity-50">—</span>
                  )}
                </td>
                <td className="py-3 px-4 font-sans text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3 px-4 text-right font-sans">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted hover:bg-primary hover:text-white text-muted-foreground text-xs transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" /> Inspect
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
