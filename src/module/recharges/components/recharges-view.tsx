"use client";

import React, { useState } from "react";
import { CreditCard, RefreshCw, AlertCircle, Search } from "lucide-react";
import { useRecharges } from "../hooks/use-recharges";
import { RechargesTable } from "./recharges-table";
import { RechargeInspectModal } from "./recharge-inspect-modal";
import { RechargeRecord } from "../types/type";
import { RECHARGE_FILTER_TABS } from "../constants";

export function RechargesView() {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<RechargeRecord | null>(
    null,
  );

  const {
    orders,
    total,
    isLoading,
    isError,
    refetch,
    reconcileOrder,
    isReconciling,
  } = useRecharges(status, search, page, 20);

  const handleReconcile = async (orderId: number, note: string) => {
    await reconcileOrder({ orderId, payload: { note } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              PayU Recharges & Gateway Ledger
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Audit gateway payment attempts, verify SHA-512 signatures, and
            reconcile dropped webhook orders.
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

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
          {RECHARGE_FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setStatus(tab.value);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                status === tab.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search txn ID or user..."
            className="w-full rounded-lg border border-input bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Data Renderers */}
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching live PayU orders...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">
              Failed to load recharge ledger
            </span>
            Ensure your backend is running and you have superadmin privileges.
          </div>
        </div>
      ) : (
        <RechargesTable orders={orders} onSelect={(o) => setSelectedOrder(o)} />
      )}

      {/* Inspector Modal */}
      <RechargeInspectModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onReconcile={handleReconcile}
        isReconciling={isReconciling}
      />
    </div>
  );
}
