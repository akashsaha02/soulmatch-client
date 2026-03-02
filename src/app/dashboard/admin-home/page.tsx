"use client";

import { AdminRoute } from "@/shared/components/AdminRoute";

function AdminHomeContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Home</h1>
      <p className="text-gray-600 mt-2">Welcome to the admin dashboard.</p>
    </div>
  );
}

export default function AdminHomePage() {
  return (
    <AdminRoute>
      <AdminHomeContent />
    </AdminRoute>
  );
}
