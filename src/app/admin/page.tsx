import type { Metadata } from "next";

import AdminDashboardClient from "./AdminDashboardClient";
import AdminSessionProvider from "./AdminSessionProvider";
import { requireRole } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "AASRA Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  await requireRole([
  "SUPER_ADMIN",
  "FINANCE_ADMIN",
  "CONTENT_ADMIN",
  "OUTREACH_ADMIN",
]);

  return (
    <AdminSessionProvider>
      <AdminDashboardClient />
    </AdminSessionProvider>
  );
}