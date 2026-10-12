"use client";

import React from "react";
import { Users, Eye, ShieldAlert, ShieldCheck } from "lucide-react";
import { UserRecord } from "../types/type";
import { ONBOARDING_BADGES } from "../constants";

interface UsersTableProps {
  users: UserRecord[];
  onSelect: (user: UserRecord) => void;
}

export function UsersTable({ users, onSelect }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-foreground">
          No Users Found
        </h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          No registered caller or companion records currently match this filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
          <tr>
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Contact</th>
            <th className="py-3 px-4">Language</th>
            <th className="py-3 px-4">Onboarding</th>
            <th className="py-3 px-4">Presence</th>
            <th className="py-3 px-4">Account Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border font-mono text-foreground">
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => onSelect(user)}
              className="hover:bg-accent/40 transition-colors group cursor-pointer"
            >
              <td className="py-3 px-4 font-sans font-medium text-foreground">
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {user.nickname
                      ? user.nickname.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <span className="block font-semibold">
                      {user.nickname || `User #${user.id}`}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      #{user.id}
                    </span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 font-sans capitalize text-muted-foreground">
                {user.gender === "female" ? "Companion" : "Caller"}
              </td>
              <td className="py-3 px-4 text-muted-foreground">
                {user.phone_masked}
              </td>
              <td className="py-3 px-4 font-sans capitalize">
                {user.primary_language || "—"}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${
                    ONBOARDING_BADGES[user.onboarding_status] ||
                    ONBOARDING_BADGES.unverified
                  }`}
                >
                  {user.onboarding_status}
                </span>
              </td>
              <td className="py-3 px-4 font-sans">
                <span className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.is_online ? "bg-emerald-500" : "bg-neutral-500"
                    }`}
                  />
                  {user.is_online ? "Online" : "Offline"}
                </span>
              </td>
              <td className="py-3 px-4 font-sans">
                {user.is_suspended ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                    <ShieldAlert className="h-3 w-3" /> Suspended
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <ShieldCheck className="h-3 w-3" /> Active
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-right font-sans">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(user);
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
