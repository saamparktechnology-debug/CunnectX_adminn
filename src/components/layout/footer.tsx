"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 px-6 py-4 text-xs text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p className="font-mono text-[11px]">
          Connect24x Enterprise Console © {new Date().getFullYear()} • Remote
          MySQL 8 (Hostinger)
        </p>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Ledger Immutability Active
          </span>
          <span>PayU SHA-512 Signed</span>
        </div>
      </div>
    </footer>
  );
}
