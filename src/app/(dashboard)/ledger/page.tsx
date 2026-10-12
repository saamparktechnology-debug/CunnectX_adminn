import { Metadata } from "next";
import { LedgerView } from "@/module/ledger";

export const metadata: Metadata = {
  title: "Financial Ledger | Connect24x Admin",
  description:
    "Double-entry accounting journal and manual wallet balance adjustments.",
};

export default function LedgerPage() {
  return (
    <div className="w-full">
      <LedgerView />
    </div>
  );
}
