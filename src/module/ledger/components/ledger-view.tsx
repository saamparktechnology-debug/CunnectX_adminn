"use client";

import React, { useState } from "react";
import {
  BookOpen,
  RefreshCw,
  AlertCircle,
  Search,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useLedger } from "../hooks/use-ledger";
import { AdjustBalanceModal } from "./adjust-balance-modal";
import { LEDGER_TYPE_BADGES, LEDGER_FILTER_TABS } from "../constants";

export function LedgerView() {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    transactions,
    total,
    isLoading,
    isError,
    refetch,
    adjustBalance,
    isAdjusting,
  } = useLedger(type, search, page, 25);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Global Financial Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Immutable double-entry record of all balance changes, recharges,
            call splits, and settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-xs font-semibold text-white hover:opacity-90 transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5" /> Adjust Balance
          </button>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-accent transition-all disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border overflow-x-auto">
          {LEDGER_FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setType(tab.value);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                type === tab.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search txn UUID, phone, name..."
            className="w-full rounded-lg border border-input bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching double-entry journal logs...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load ledger transactions
            </span>
            Ensure your backend is running with database access.
          </div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          No ledger movements recorded for this query.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Balance Before</th>
                <th className="py-3 px-4">Balance After</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-foreground">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-accent/40 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-primary">#{tx.id}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className="font-semibold block text-foreground">
                      {tx.user_nickname || `User #${tx.user_id}`}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {tx.user_phone}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                        LEDGER_TYPE_BADGES[tx.type] ||
                        "bg-neutral-500/10 text-neutral-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        tx.direction === "credit"
                          ? "text-emerald-500"
                          : "text-rose-500"
                      }`}
                    >
                      {tx.direction === "credit" ? (
                        <ArrowDownLeft className="h-3 w-3" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3" />
                      )}
                      {tx.direction === "credit" ? "+" : "-"}₹
                      {parseFloat(tx.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    ₹{parseFloat(tx.balance_before).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">
                    ₹{parseFloat(tx.balance_after).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground">
                    {tx.reference_type} #{tx.reference_id || "—"}
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground">
                    {new Date(tx.created_at).toLocaleDateString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdjustBalanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdjust={adjustBalance}
        isAdjusting={isAdjusting}
      />
    </div>
  );
}
