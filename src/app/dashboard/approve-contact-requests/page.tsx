"use client";

import { AdminRoute } from "@/shared/components/AdminRoute";

function ApproveContactContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Approve Contact Requests</h1>
      <p className="text-gray-600 mt-2">Approve or reject contact requests.</p>
    </div>
  );
}

export default function ApproveContactPage() {
  return (
    <AdminRoute>
      <ApproveContactContent />
    </AdminRoute>
  );
}
