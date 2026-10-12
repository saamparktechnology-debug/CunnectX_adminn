"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { VerificationSubmission, RejectionReasonCode } from "../types/type";
import { REJECTION_REASONS_CATALOG } from "../constants";
import { AudioWaveformCard } from "./audio-waveform-card";
import { formatBytes } from "@/lib/utils";

interface ReviewDecisionDrawerProps {
  submission: VerificationSubmission | null;
  onClose: () => void;
  onSubmit: (
    submissionId: number,
    action: "approved" | "rejected",
    reasonCode?: RejectionReasonCode,
    reasonNote?: string,
  ) => Promise<void>;
  isSubmitting: boolean;
}

export function ReviewDecisionDrawer({
  submission,
  onClose,
  onSubmit,
  isSubmitting,
}: ReviewDecisionDrawerProps) {
  const [selectedReason, setSelectedReason] = useState<
    RejectionReasonCode | ""
  >("");
  const [reasonNote, setReasonNote] = useState<string>("");
  const [actionStage, setActionStage] = useState<"inspect" | "rejecting">(
    "inspect",
  );

  if (!submission) return null;

  const activeReasonObj = REJECTION_REASONS_CATALOG.find(
    (r) => r.code === selectedReason,
  );

  const handleApprove = async () => {
    await onSubmit(submission.id, "approved");
    onClose();
  };

  const handleReject = async () => {
    if (!selectedReason) return;
    await onSubmit(
      submission.id,
      "rejected",
      selectedReason,
      reasonNote.trim() ? reasonNote.trim() : undefined,
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-neutral-800 bg-neutral-950 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h2 className="text-lg font-semibold text-neutral-100">
                  Verification Inspection
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  SUBMISSION #{submission.id} •{" "}
                  {submission.uuid.substring(0, 8)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Context Cards */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-3">
                <span className="text-neutral-500 uppercase tracking-wider block font-semibold text-[10px]">
                  Candidate ID
                </span>
                <span className="text-neutral-200 font-mono mt-1 block">
                  USER-{submission.user_id}
                </span>
              </div>
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/40 p-3">
                <span className="text-neutral-500 uppercase tracking-wider block font-semibold text-[10px]">
                  Payload Specs
                </span>
                <span className="text-neutral-200 font-mono mt-1 block">
                  {submission.voice_duration_sec}s •{" "}
                  {formatBytes(submission.voice_size_bytes)}
                </span>
              </div>
            </div>

            {/* Audio Inspection Tool */}
            <div className="mt-5">
              <label className="text-xs font-medium text-neutral-300 block mb-2">
                Voice Sample Evaluation
              </label>
              <AudioWaveformCard
                voiceUrl={submission.voice_url}
                durationSec={submission.voice_duration_sec}
              />
            </div>

            {/* Rejection Decision Path */}
            {actionStage === "rejecting" && (
              <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div>
                  <label className="text-xs font-semibold text-neutral-200 block mb-2">
                    Select Rejection Reason{" "}
                    <span className="text-rose-400">*</span>
                  </label>
                  <div className="space-y-2">
                    {REJECTION_REASONS_CATALOG.map((item) => (
                      <label
                        key={item.code}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          selectedReason === item.code
                            ? item.isTerminal
                              ? "border-rose-500/60 bg-rose-950/20 text-rose-200"
                              : "border-amber-500/60 bg-amber-950/20 text-amber-200"
                            : "border-neutral-800 bg-neutral-900/30 text-neutral-300 hover:border-neutral-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="rejectionReason"
                          value={item.code}
                          checked={selectedReason === item.code}
                          onChange={() => setSelectedReason(item.code)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 font-medium">
                            {item.label}
                            {item.isTerminal && (
                              <span className="text-[10px] uppercase font-bold text-rose-400 px-1 py-0.2 bg-rose-500/10 rounded border border-rose-500/20">
                                Terminal Lock
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {activeReasonObj?.isTerminal && (
                  <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block">
                        Terminal Action Warning
                      </span>
                      Selecting this reason will immediately suspend the user
                      account and ban all future call attempts.
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-neutral-200 block mb-1.5">
                    Auditor Notes{" "}
                    {selectedReason === "other" && (
                      <span className="text-rose-400">*</span>
                    )}
                  </label>
                  <textarea
                    rows={3}
                    value={reasonNote}
                    onChange={(e) => setReasonNote(e.target.value)}
                    placeholder="Enter compliance feedback visible to candidate..."
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-neutral-800 mt-6">
            {actionStage === "inspect" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActionStage("rejecting")}
                  className="rounded-lg border border-rose-500/30 bg-rose-950/20 py-2.5 text-xs font-semibold text-rose-300 hover:bg-rose-900/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertOctagon className="w-3.5 h-3.5" /> Decline Sample
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 active:scale-98 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve Voice
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActionStage("inspect")}
                  className="rounded-lg border border-neutral-800 py-2.5 px-4 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={
                    !selectedReason ||
                    (selectedReason === "other" && !reasonNote.trim()) ||
                    isSubmitting
                  }
                  className="flex-1 rounded-lg bg-rose-600 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 active:scale-98 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  Confirm Rejection Decision
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
