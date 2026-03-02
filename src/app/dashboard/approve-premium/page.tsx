"use client";

import { AdminRoute } from "@/shared/components/AdminRoute";

function ApprovePremiumContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Approve Premium</h1>
      <p className="text-gray-600 mt-2">Approve premium requests.</p>
    </div>
  );
}

export default function ApprovePremiumPage() {
  return (
    <AdminRoute>
      <ApprovePremiumContent />
    </AdminRoute>
  );
}
