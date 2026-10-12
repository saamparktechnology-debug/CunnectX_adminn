import { Metadata } from "next";
import { VerificationView } from "@/module/verification";

export const metadata: Metadata = {
  title: "Voice KYC Queue | Connect24x Admin",
  description:
    "Review and approve female companion voice samples and KYC compliance.",
};

export default function VerificationPage() {
  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto">
      <VerificationView />
    </main>
  );
}
