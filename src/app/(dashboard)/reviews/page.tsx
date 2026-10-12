import { Metadata } from "next";
import { ReviewsView } from "@/module/reviews";

export const metadata: Metadata = {
  title: "Flagged Reviews | Connect24x Admin",
  description: "Moderation queue for calls rated 1 or 2 stars.",
};

export default function ReviewsPage() {
  return (
    <div className="w-full">
      <ReviewsView />
    </div>
  );
}
