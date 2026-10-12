"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneCall, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post("/admin/auth/login", {
        email: email.trim(),
        password,
      });

      // Handle both { data: { data: { accessToken } } } and { data: { accessToken } }
      const token =
        response.data?.data?.accessToken || response.data?.accessToken;

      if (!token) {
        throw new Error("Access token missing from server response.");
      }

      // 1. Store in localStorage for client-side API requests
      localStorage.setItem("c24x_admin_token", token);

      // 2. Also set cookie so Next.js server components / middleware can read it if needed
      document.cookie = `c24x_admin_token=${token}; path=/; max-age=14400; SameSite=Lax`;

      // 3. Navigate into dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("[Login Error]", err);
      const serverMsg =
        err.response?.data?.error?.message ||
        err.message ||
        "Invalid credentials or unauthorized";
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl text-card-foreground">
        <div className="flex items-center gap-2.5 font-bold tracking-tight text-foreground justify-center mb-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <PhoneCall className="h-4 w-4" />
          </div>
          <span className="text-base tracking-wide">
            Connect<span className="text-primary">24x</span> Console
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@connect24x.com"
                className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {isLoading ? "Authenticating..." : "Sign In to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
