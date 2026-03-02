"use client";

import { AdminRoute } from "@/shared/components/AdminRoute";

function UsersContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <p className="text-gray-600 mt-2">User management panel.</p>
    </div>
  );
}

export default function UsersPage() {
  return (
    <AdminRoute>
      <UsersContent />
    </AdminRoute>
  );
}
