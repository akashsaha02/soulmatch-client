"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetBiodataByEmailQuery } from "@/features/biodata/api/biodataApi";
import { axiosSecure } from "@/shared/lib/axios";
import Swal from "sweetalert2";
import Loader from "@/shared/components/Loader";
import type { Biodata } from "@/shared/types";

export default function UserHomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: myBiodata, isLoading } = useGetBiodataByEmailQuery(user?.email ?? "", { skip: !user?.email });

  const handleRequestPremium = async (id: string) => {
    try {
      const res = await axiosSecure.post(`/request-premium/${id}`);
      if (res.status === 200) {
        Swal.fire({ icon: "success", title: "Success", text: "Request for premium biodata sent successfully!" });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Already Requested!" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Already Requested!" });
    }
  };

  if (isLoading) return <Loader />;

  if (!myBiodata) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
          <img src={user?.photoURL ?? ""} alt={user?.displayName ?? ""} className="w-24 h-24 rounded-full shadow-md border-4 border-blue-500 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">No Biodata Found</h1>
          <p className="text-gray-600 mb-2">{user?.email}</p>
          <p className="text-gray-600">{user?.displayName}</p>
          <button onClick={() => router.push("/dashboard/manage-biodata")} className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600">
            Create Biodata
          </button>
        </div>
      </div>
    );
  }

  const b = myBiodata as Biodata & Record<string, unknown>;
  const weight = b.weight as { value?: number };
  const partnerAge = b.partnerAge as { value?: string };
  const partnerWeight = b.partnerWeight as { value?: number };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 flex justify-center items-center p-6">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col items-center bg-gradient-to-r from-me-orange to-me-darkOrange p-8 text-white">
          <img src={b.profileImage} alt={b.name} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md" />
          <h1 className="text-3xl font-extrabold mt-4 playfair">{b.name}</h1>
          <p className="text-sm font-medium text-lg mt-2 opacity-90">{b.biodataType}</p>
        </div>
        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">Personal Information</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Date of Birth:</span><span>{new Date(b.dob).toLocaleDateString()}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Father&apos;s Name:</span><span>{String(b.fatherName ?? "N/A")}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Mother&apos;s Name:</span><span>{String(b.motherName ?? "N/A")}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Height:</span><span>{String(b.height ?? "N/A")}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Weight:</span><span>{weight?.value ?? "N/A"} kg</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Mobile:</span><span>{String(b.mobileNumber ?? "N/A")}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Email:</span><span>{String(b.userEmail ?? b.email ?? "N/A")}</span></li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">Partner Preferences</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Age:</span><span>{partnerAge?.value ?? "N/A"} years</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Height:</span><span>{String(b.partnerHeight ?? "N/A")}</span></li>
              <li className="flex items-center"><span className="font-medium text-gray-600 mr-2">Weight:</span><span>{partnerWeight?.value ?? "N/A"} kg</span></li>
            </ul>
          </section>
          <div className="text-center">
            {b.isPremium ? (
              <button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md">Premium User</button>
            ) : (
              <button onClick={() => handleRequestPremium(b._id ?? "")} className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600">Make Biodata Premium</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
