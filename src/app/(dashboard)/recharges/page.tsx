import { Metadata } from "next";
import { RechargesView } from "@/module/recharges";

export const metadata: Metadata = {
  title: "PayU Recharges Ledger | Connect24x Admin",
  description:
    "Audit gateway payment attempts, verify SHA-512 signatures, and reconcile dropped webhook orders.",
};

export default function RechargesPage() {
  return (
    <div className="w-full">
      <RechargesView />
    </div>
  );
}
