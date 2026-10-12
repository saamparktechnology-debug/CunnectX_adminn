import { Metadata } from "next";
import { PromotionsView } from "@/module/promotions";

export const metadata: Metadata = {
  title: "Promotions & Bonuses | Connect24x Admin",
  description:
    "Configure campaign incentives and audit promotional float allocations.",
};

export default function PromotionsPage() {
  return (
    <div className="w-full">
      <PromotionsView />
    </div>
  );
}
