import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal PowerBIHub dashboard — bookmarks, notes, and DAX code editor.",
};

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
