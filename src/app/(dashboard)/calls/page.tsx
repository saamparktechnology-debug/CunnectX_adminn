import { Metadata } from "next";
import { CallsView } from "@/module/calls";

export const metadata: Metadata = {
  title: "Call Sessions | Connect24x Admin",
  description:
    "Monitor live calls, inspect ZEGOCLOUD room sessions, and audit billing margin deductions.",
};

export default function CallsPage() {
  return (
    <div className="w-full">
      <CallsView />
    </div>
  );
}
