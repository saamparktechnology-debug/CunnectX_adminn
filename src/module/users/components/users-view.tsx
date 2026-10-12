"use client";

import React, { useState } from "react";
import { Users, RefreshCw, AlertCircle } from "lucide-react";
import { useUsers } from "../hooks/use-users";
import { UsersTable } from "./users-table";
import { UserInspectDrawer } from "./user-inspect-drawer";
import { UserRecord } from "../types/type";

export function UsersView() {
  const { users, isLoading, isError, refetch, toggleSuspension, isUpdating } =
    useUsers();
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  const handleToggleSuspension = async (
    userId: number,
    isSuspended: boolean,
    reason?: string,
  ) => {
    await toggleSuspension({
      userId,
      payload: { isSuspended, reason },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              User Management
            </h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Search, inspect, and moderate caller accounts and female companions.
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

      {/* State Views */}
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-xs text-muted-foreground">
          Fetching live platform users from database...
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-6 text-xs text-rose-500 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <span className="font-semibold block">Failed to load users</span>
            Ensure your backend Node instance is active and your admin token is
            valid.
          </div>
        </div>
      ) : (
        <UsersTable users={users} onSelect={(u) => setSelectedUser(u)} />
      )}

      {/* Detail Drawer */}
      <UserInspectDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onToggleSuspension={handleToggleSuspension}
        isUpdating={isUpdating}
      />
    </div>
  );
}
