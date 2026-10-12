"use client";

import React from "react";
import { Eye, Clock, UserCheck, ShieldAlert, Sparkles } from "lucide-react";
import { VerificationSubmission } from "../types/type";
import { STATUS_BADGE_STYLES } from "../constants";
import { formatBytes } from "@/lib/utils";

interface VerificationTableProps {
  submissions: VerificationSubmission[];
  onSelect: (submission: VerificationSubmission) => void;
}

export function VerificationTable({
  submissions,
  onSelect,
}: VerificationTableProps) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/80 text-emerald-400">
          <UserCheck className="w-6 h-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-neutral-100">
          Verification Queue Clear
        </h3>
        <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
          All submitted companion voice samples have been inspected. New
          incoming samples will populate here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40">
      <table className="w-full text-left text-xs">
        <thead className="bg-neutral-900/90 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
          <tr>
            <th className="py-3 px-4">Subject</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Duration</th>
            <th className="py-3 px-4">File Size</th>
            <th className="py-3 px-4">Submitted At</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
          {submissions.map((sub) => (
            <tr
              key={sub.id}
              className="hover:bg-neutral-800/30 transition-colors group cursor-pointer"
              onClick={() => onSelect(sub)}
            >
              <td className="py-3 px-4 font-sans font-medium text-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                    {sub.user_id}
                  </div>
                  <span>User #{sub.user_id}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${
                    STATUS_BADGE_STYLES[sub.status] ||
                    STATUS_BADGE_STYLES.pending
                  }`}
                >
                  {sub.status}
                </span>
              </td>
              <td className="py-3 px-4">{sub.voice_duration_sec}s</td>
              <td className="py-3 px-4">{formatBytes(sub.voice_size_bytes)}</td>
              <td className="py-3 px-4 text-neutral-400 font-sans">
                {new Date(sub.created_at).toLocaleDateString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(sub);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-indigo-600 hover:text-white text-neutral-300 text-xs font-sans transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Inspect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
