"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function MyProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <img src={user?.photoURL ?? ""} alt={user?.displayName ?? ""} className="w-24 h-24 rounded-full mb-4" />
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
}
