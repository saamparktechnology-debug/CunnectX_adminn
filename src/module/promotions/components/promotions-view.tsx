"use client";

import React from "react";
import {
  Gift,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { usePromotions } from "../hooks/use-promotions";

export function PromotionsView() {
  const { promotions, isLoading, isError, refetch, toggleStatus, isToggling } =
    usePromotions();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Promotional Campaigns & Bonuses
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Audit onboarding welcome bonus pools, voucher redemption volume, and
            campaign statuses.
          </p>
        </div>

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

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching promotional campaigns...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Failed to load campaign data.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="font-mono font-bold text-primary tracking-wide text-sm">
                    {promo.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                      promo.is_active
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                    }`}
                  >
                    {promo.is_active ? "Active" : "Disabled"}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-foreground text-sm">
                    {promo.name}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">
                    Type: {promo.type}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-sans">
                      Bonus Credit:
                    </span>
                    <span className="font-bold text-emerald-500">
                      ₹{parseFloat(promo.bonus_amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-sans">
                      Total Claimants:
                    </span>
                    <span className="text-foreground">
                      {promo.claim_count} Users
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-sans">
                      Total Disbursed:
                    </span>
                    <span className="text-foreground">
                      ₹{parseFloat(promo.total_disbursed).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border">
                <button
                  type="button"
                  disabled={isToggling}
                  onClick={() =>
                    toggleStatus({ id: promo.id, isActive: !promo.is_active })
                  }
                  className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    promo.is_active
                      ? "border border-rose-500/20 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  {promo.is_active ? (
                    <>
                      <XCircle className="h-3.5 w-3.5" /> Deactivate Campaign
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Enable Campaign
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
