export const LEDGER_TYPE_BADGES: Record<string, string> = {
  recharge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  call_debit: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  call_credit: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  withdrawal: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  withdrawal_refund: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  manual_credit: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  manual_debit: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  promo_credit: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

export const LEDGER_FILTER_TABS = [
  { label: "All Movements", value: "all" },
  { label: "Recharges", value: "recharge" },
  { label: "Call Charges", value: "call_debit" },
  { label: "Companion Cuts", value: "call_credit" },
  { label: "Withdrawals", value: "withdrawal" },
  { label: "Adjustments", value: "manual_credit" },
];
