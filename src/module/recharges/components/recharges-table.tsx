"use client";

import React from "react";
import { CreditCard, Eye } from "lucide-react";
import { RechargeRecord } from "../types/type";
import { RECHARGE_STATUS_BADGES } from "../constants";

interface RechargesTableProps {
  orders: RechargeRecord[];
  onSelect: (order: RechargeRecord) => void;
}

export function RechargesTable({ orders, onSelect }: RechargesTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <CreditCard className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-foreground">
          No Recharge Orders Found
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          No PayU payments match the selected criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="py-3 px-4">Order ID</th>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Credited (Base)</th>
            <th className="py-3 px-4">Tax (4%)</th>
            <th className="py-3 px-4">Total Paid</th>
            <th className="py-3 px-4">Gateway Status</th>
            <th className="py-3 px-4">PayU Txn ID</th>
            <th className="py-3 px-4">Created At</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-foreground">
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onSelect(order)}
              className="hover:bg-accent/40 transition-colors group cursor-pointer"
            >
              <td className="py-3 px-4 font-bold text-primary">#{order.id}</td>
              <td className="py-3 px-4 font-sans text-foreground">
                <span className="font-semibold block">
                  {order.user_nickname || `User #${order.user_id}`}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {order.user_phone}
                </span>
              </td>
              <td className="py-3 px-4 text-emerald-500 font-bold">
                ₹{parseFloat(order.base_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                ₹{parseFloat(order.tax_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4 font-semibold text-foreground">
                ₹{parseFloat(order.total_amount).toFixed(2)}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                    RECHARGE_STATUS_BADGES[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {order.pg_txn_id || <span className="opacity-40">—</span>}
              </td>
              <td className="py-3 px-4 font-sans text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="py-3 px-4 text-right font-sans">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(order);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted hover:bg-primary hover:text-white text-muted-foreground text-xs transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" /> Inspect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
