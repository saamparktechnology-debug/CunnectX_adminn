import { Metadata } from "next";
import { WithdrawalsView } from "@/module/withdrawals";

export const metadata: Metadata = {
  title: "UPI Withdrawals | Connect24x Admin",
  description:
    "Triage and settle female companion UPI withdrawal payout requests.",
};

export default function WithdrawalsPage() {
  return (
    <div className="w-full">
      <WithdrawalsView />
    </div>
  );
}
