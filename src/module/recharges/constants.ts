export const RECHARGE_STATUS_BADGES: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  failed: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  user_cancelled: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
};

export const RECHARGE_FILTER_TABS = [
  { label: "All Orders", value: "all" },
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];
