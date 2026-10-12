"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CreditCard,
  PhoneCall,
  ShieldCheck,
  Banknote,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BookOpen,
  Gift,
  ShieldAlert,
} from "lucide-react";
import { useLayoutStore } from "@/stores/layout.store";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: Activity },
  { label: "Financial Ledger", href: "/ledger", icon: BookOpen },
  { label: "PayU Recharges", href: "/recharges", icon: CreditCard },
  { label: "Call Sessions", href: "/calls", icon: PhoneCall },
  { label: "Voice KYC", href: "/verification", icon: ShieldCheck },
  { label: "UPI Withdrawals", href: "/withdrawals", icon: Banknote },
  { label: "Promotions", href: "/promotions", icon: Gift },
  { label: "Flagged Reviews", href: "/reviews", icon: Star },
  { label: "User Management", href: "/users", icon: Users },
  { label: "Audit Logs", href: "/audit-logs", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useLayoutStore();

  const handleLogout = () => {
    localStorage.removeItem("c24x_admin_token");
    document.cookie = "c24x_admin_token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden text-foreground hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <PhoneCall className="h-4 w-4" />
          </div>
          {!isSidebarCollapsed && (
            <span className="text-sm font-bold tracking-tight whitespace-nowrap">
              Connect<span className="text-primary">24x</span>
            </span>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isSidebarCollapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all group",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                  isActive
                    ? "text-white"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {!isSidebarCollapsed && (
                <span className="truncate whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Session Footer */}
      <div className="shrink-0 p-3 border-t border-border">
        <button
          type="button"
          onClick={handleLogout}
          title={isSidebarCollapsed ? "Sign Out" : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors group",
            isSidebarCollapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          {!isSidebarCollapsed && (
            <span className="whitespace-nowrap">Sign Out</span>
          )}
        </button>
      </div>
    </aside>
  );
}
