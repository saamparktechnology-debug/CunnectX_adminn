"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Banknote,
  Star,
  Users,
  TrendingUp,
  Activity,
  BookOpen,
  Gift,
  ShieldAlert,
} from "lucide-react";
import { apiClient } from "@/lib/api";

interface DashboardMetrics {
  totalUsers: number;
  activeLiveCalls: number;
  pendingKycCount: number;
  pendingWithdrawalCount: number;
  pendingWithdrawalAmount: string;
  totalPlatformMargin: string;
  totalGrossRecharged: string;
}

export default function DashboardOverviewPage() {
  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ["admin", "dashboard", "metrics"],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data: DashboardMetrics;
        error: null;
      }>("/admin/dashboard/overview");
      return res.data.data;
    },
    refetchInterval: 15000,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Platform Operations Hub
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Live telecommunication metrics, queue triage states, and financial
            margins.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{metrics?.activeLiveCalls ?? 0} Live Ongoing Calls</span>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Platform Retained Margin
          </span>
          <span className="text-2xl font-bold font-mono text-primary mt-2 block">
            ₹
            {isLoading
              ? "..."
              : parseFloat(metrics?.totalPlatformMargin || "0").toFixed(2)}
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-500" /> 50% split on
            ₹3.00/min calls
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Gross Wallet Recharges
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-500 mt-2 block">
            ₹
            {isLoading
              ? "..."
              : parseFloat(metrics?.totalGrossRecharged || "0").toFixed(2)}
          </span>
          <span className="text-[11px] text-muted-foreground mt-1">
            Completed PayU payments
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Pending KYC Triage
          </span>
          <span className="text-2xl font-bold font-mono text-amber-500 mt-2 block">
            {isLoading ? "..." : metrics?.pendingKycCount}
          </span>
          <Link
            href="/verification"
            className="text-[11px] text-primary hover:underline mt-1 block"
          >
            Review voice clips →
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Pending Withdrawals
          </span>
          <span className="text-2xl font-bold font-mono text-foreground mt-2 block">
            ₹
            {isLoading
              ? "..."
              : parseFloat(metrics?.pendingWithdrawalAmount || "0").toFixed(2)}
          </span>
          <Link
            href="/withdrawals"
            className="text-[11px] text-primary hover:underline mt-1 block"
          >
            {metrics?.pendingWithdrawalCount ?? 0} payouts awaiting settlement →
          </Link>
        </div>
      </div>

      {/* Navigation Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "Financial Ledger",
            desc: "Inspect double-entry journal and issue balance corrections.",
            href: "/ledger",
            icon: BookOpen,
          },
          {
            title: "PayU Recharges",
            desc: "Audit gateway payment orders and SHA-512 hashes.",
            href: "/recharges",
            icon: CreditCard,
          },
          {
            title: "Call Sessions",
            desc: "Monitor live calls, inspect ZEGOCLOUD room sessions.",
            href: "/calls",
            icon: PhoneCall,
          },
          {
            title: "Voice KYC Queue",
            desc: "Review audio waveform submissions and companion verification.",
            href: "/verification",
            icon: ShieldCheck,
          },
          {
            title: "UPI Settlements",
            desc: "Disburse companion payouts and calculate 2.5% platform tax.",
            href: "/withdrawals",
            icon: Banknote,
          },
          {
            title: "Flagged Reviews",
            desc: "Moderate post-call ratings and dispute flags (≤ 2 stars).",
            href: "/reviews",
            icon: Star,
          },
          {
            title: "Promotions & Bonuses",
            desc: "Manage welcome bonuses and campaign allocation limits.",
            href: "/promotions",
            icon: Gift,
          },
          {
            title: "User Directory",
            desc: "Audit accounts, active presence, and suspensions.",
            href: "/users",
            icon: Users,
          },
          {
            title: "Admin Audit Logs",
            desc: "Review tamper-evident logs of administrative actions.",
            href: "/audit-logs",
            icon: ShieldAlert,
          },
        ].map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tile.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {tile.desc}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-semibold text-primary inline-flex items-center gap-1">
                Open Console →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
