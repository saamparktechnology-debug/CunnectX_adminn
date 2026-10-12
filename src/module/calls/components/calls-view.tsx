"use client";

import React, { useState } from "react";
import { PhoneCall, RefreshCw, AlertCircle, Search } from "lucide-react";
import { useCalls } from "../hooks/use-calls";
import { CallsTable } from "./calls-table";
import { CallInspectModal } from "./call-inspect-modal";
import { AdminCallHistoryRecord } from "../types/type";

export function CallsView() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCall, setSelectedCall] =
    useState<AdminCallHistoryRecord | null>(null);

  const { calls, total, activeCount, isLoading, isError, refetch } = useCalls(
    search,
    page,
    20,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Call Sessions & Telephony Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Auditing ZEGOCLOUD room sessions, sub-minute ceiling billing
            (₹3.00/min), and 50% platform margins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Calls Live Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{activeCount} Active Ongoing</span>
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
      </div>

      {/* Search Input */}
      <div className="flex justify-end">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search room, UUID, or phone..."
            className="w-full rounded-lg border border-input bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Renderers */}
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching call records and ledger entries...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load telephony ledger
            </span>
            Ensure your backend is running with `calls_history` table populated.
          </div>
        </div>
      ) : (
        <CallsTable calls={calls} onSelect={(c) => setSelectedCall(c)} />
      )}

      {/* Inspect Modal */}
      <CallInspectModal
        call={selectedCall}
        onClose={() => setSelectedCall(null)}
      />
    </div>
  );
}
