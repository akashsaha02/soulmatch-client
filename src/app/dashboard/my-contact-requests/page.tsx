"use client";

import Loader from "@/shared/components/Loader";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import { useGetMyContactRequestsQuery } from "@/features/contact-requests/api/contactRequestsApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { axiosSecure } from "@/shared/lib/axios";
import Swal from "sweetalert2";

export default function MyContactRequestsPage() {
  const { user } = useAuth();
  const { data: requests = [], refetch, isLoading } = useGetMyContactRequestsQuery(user?.email ?? undefined, { skip: !user?.email });

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosSecure.delete(`/contact-requests/${id}`);
      if (res.data?.deletedCount > 0) {
        Swal.fire({ icon: "success", title: "Request deleted successfully", showConfirmButton: false, timer: 1500 });
        refetch();
      }
    } catch (error) {
      console.error("Error deleting contact request:", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <SectionTitleHome heading="My Contact Requests" subHeading="Manage your contact requests" />
      <table className="table-auto max-w-5xl mx-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Requested Biodata ID</th>
            <th className="px-4 py-2">Requested Mobile No</th>
            <th className="px-4 py-2">Requested Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (requests as { _id: string; biodataId: string; status?: string; mobileNumber?: string; email?: string }[]).map((req) => (
            <tr key={req._id} className="text-center">
              <td className="border px-4 py-2">{req.biodataId}</td>
              <td className="border px-4 py-2">{req.status === "approved" ? req.mobileNumber : "Pending"}</td>
              <td className="border px-4 py-2">{req.status === "approved" ? req.email : "Pending"}</td>
              <td className="border px-4 py-2 capitalize">{req.status ?? "pending"}</td>
              <td className="border px-4 py-2">
                <button className="px-4 py-1 bg-me-red rounded-lg text-white" onClick={() => handleDelete(req._id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No contact requests yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
