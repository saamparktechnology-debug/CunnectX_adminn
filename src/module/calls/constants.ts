export const END_REASON_LABELS: Record<
  string,
  { label: string; badge: string }
> = {
  user_ended: {
    label: "Normal Hangup",
    badge: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  },
  balance_exhausted: {
    label: "Balance Depleted",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  network_drop: {
    label: "Network Dropped",
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  provider_failure: {
    label: "RTC Failure",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  admin_terminated: {
    label: "Admin Cut",
    badge: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
};
