"use client";

import { AdminRoute } from "@/shared/components/AdminRoute";

function SuccessStoriesContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Success Stories</h1>
      <p className="text-gray-600 mt-2">Manage success stories.</p>
    </div>
  );
}

export default function SuccessStoriesPage() {
  return (
    <AdminRoute>
      <SuccessStoriesContent />
    </AdminRoute>
  );
}
