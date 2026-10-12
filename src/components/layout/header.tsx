"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  Maximize,
  Minimize,
  LogOut,
  Shield,
} from "lucide-react";
import { useLayoutStore } from "@/stores/layout.store";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { setMobileSidebarOpen, isFullscreen, toggleFullscreen } =
    useLayoutStore();

  const handleLogout = () => {
    localStorage.removeItem("c24x_admin_token");
    window.location.href = "/login";
  };

  const getBreadcrumbTitle = (path: string) => {
    if (path.includes("/verification")) return "Voice KYC Queue";
    if (path.includes("/withdrawals")) return "UPI Payout Settlement";
    if (path.includes("/reviews")) return "Flagged Call Reviews";
    if (path.includes("/users")) return "User Management";
    return "Operations Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 backdrop-blur px-4 lg:px-8">
      {/* Left: Mobile Trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg border border-border text-muted-foreground hover:bg-accent"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {getBreadcrumbTitle(pathname)}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            Connect24x / {pathname.replace("/", "") || "dashboard"}
          </span>
        </div>
      </div>

      {/* Right: Controls (Fullscreen, Theme, User) */}
      <div className="flex items-center gap-2">
        {/* Fullscreen Mode Button */}
        <button
          onClick={toggleFullscreen}
          className="h-8 w-8 rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="h-3.5 w-3.5" />
          ) : (
            <Maximize className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Dark/Light Mode Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-center transition-colors"
          title="Toggle Theme"
        >
          <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        <div className="h-4 w-px bg-border mx-1" />

        {/* Admin Session Badge & Logout */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent text-[11px] font-mono text-foreground border border-border">
            <Shield className="h-3 w-3 text-primary" />
            <span>ROLE_ADMIN</span>
          </div>

          <button
            onClick={handleLogout}
            className="h-8 w-8 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 flex items-center justify-center transition-colors"
            title="Terminate Admin Session"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
