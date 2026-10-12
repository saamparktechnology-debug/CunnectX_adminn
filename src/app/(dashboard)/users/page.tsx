import { Metadata } from "next";
import { UsersView } from "@/module/users";

export const metadata: Metadata = {
  title: "User Management | Connect24x Admin",
  description: "Manage caller accounts and female companion statuses.",
};

export default function UsersPage() {
  return (
    <div className="w-full">
      <UsersView />
    </div>
  );
}
