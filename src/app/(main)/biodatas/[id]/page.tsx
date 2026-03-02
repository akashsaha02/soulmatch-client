"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/shared/components/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetBiodataDetailsQuery } from "@/features/biodata/api/biodataApi";
import { useGetFavouritesQuery, useAddFavouriteMutation } from "@/features/favourites/api/favouritesApi";
import { useGetUserByEmailQuery } from "@/features/admin/api/usersApi";
import BiodataRecomendation from "@/components/allBiodatas/BiodataRecomendation";
import { IoMdHeart } from "react-icons/io";
import Swal from "sweetalert2";

export default function BiodataDetailsPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { user } = useAuth();
  const router = useRouter();
  const { data: biodata, isLoading } = useGetBiodataDetailsQuery(id ?? "", { skip: !id });
  const [addFavourite, { isSuccess }] = useAddFavouriteMutation();
  const { refetch } = useGetFavouritesQuery(user?.email ?? undefined);
  const { data: userData } = useGetUserByEmailQuery(user?.email ?? undefined, { skip: !user?.email });
  const isPremium = userData?.role === "premium";

  const handleAddToFavourite = () => {
    if (!biodata || !user?.email) {
      Swal.fire({
        icon: "warning",
        title: "You're not logged in!",
        text: "Please login to add to favourites!",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/login?from=${encodeURIComponent(window.location.pathname)}`);
        }
      });
      return;
    }

    const b = biodata as Record<string, unknown>;
    const favouriteBiodata = {
      favouriteId: id,
      favouriteBiodataId: String(b.biodataId ?? b._id ?? id),
      email: user.email,
      favouriteName: biodata.name,
      favouriteProfileImage: biodata.profileImage,
      favouriteEmail: String(b.userEmail ?? biodata.email ?? ""),
    };

    addFavourite(favouriteBiodata)
      .unwrap()
      .then(() => {
        Swal.fire({ icon: "success", title: "Success", text: "Profile added to favourites!", timer: 1000 });
        refetch();
      })
      .catch((err: { response?: { data?: { message?: string } } }) => {
        const msg = err.response?.data?.message;
        if (msg === "Already added to favourites!") {
          Swal.fire({ icon: "warning", title: "Already Added", text: "This profile is already in your favourites!" });
        } else if (msg === "You cannot add your own profile to favourites.") {
          Swal.fire({ icon: "warning", title: "Cannot Add Own Profile", text: msg });
        } else {
          Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong. Please try again!" });
        }
      });
  };

  if (isLoading) return <Loader />;
  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No biodata found.</p>
      </div>
    );
  }

  const b = biodata as Record<string, unknown>;
  const occupation = biodata.occupation as { value?: string } | undefined;
  const weight = biodata.weight as { value?: number } | undefined;
  const partnerAge = biodata.partnerAge as { value?: string } | undefined;
  const partnerWeight = biodata.partnerWeight as { value?: number } | undefined;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gradient-to-r from-me-darkOrange to-me-orange text-white p-8 flex flex-col items-center justify-center">
            <img
              src={biodata.profileImage}
              alt={biodata.name}
              className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <h1 className="text-3xl font-bold mt-4">{biodata.name}</h1>
            <p className="text-sm mt-2">{biodata.biodataType}</p>
            <div className="mt-6 space-y-3 text-center">
              <p><span className="font-medium">Present Location:</span> {biodata.presentDivision ?? "N/A"}</p>
              <p><span className="font-medium">Permanent Location:</span> {biodata.permanentDivision}</p>
              <button
                onClick={handleAddToFavourite}
                className="bg-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-100 flex items-center gap-3"
              >
                <span className="font-semibold text-me-pink">Add to Favourites</span>
                <span className="text-me-pink text-lg"><IoMdHeart /></span>
              </button>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-4">Details</h2>
            <div className="space-y-4">
              <p><span className="font-medium text-gray-700">Date of Birth:</span> {new Date(biodata.dob).toLocaleDateString()}</p>
              <p><span className="font-medium text-gray-700">Father&apos;s Name:</span> {String((biodata as Record<string, unknown>).fatherName ?? "N/A")}</p>
              <p><span className="font-medium text-gray-700">Mother&apos;s Name:</span> {String((biodata as Record<string, unknown>).motherName ?? "N/A")}</p>
              <p><span className="font-medium text-gray-700">Height:</span> {String((biodata as Record<string, unknown>).height ?? "N/A")}</p>
              <p><span className="font-medium text-gray-700">Weight:</span> {String(weight?.value ?? "N/A")} kg</p>
              <p><span className="font-medium text-gray-700">Race:</span> {String((biodata as Record<string, unknown>).race ?? "N/A")}</p>
            </div>
            <h2 className="text-2xl font-semibold border-b pb-4">Partner Preferences</h2>
            <div className="space-y-4">
              <p><span className="font-medium text-gray-700">Preferred Age:</span> {String(partnerAge?.value ?? "N/A")} years</p>
              <p><span className="font-medium text-gray-700">Preferred Height:</span> {String((biodata as Record<string, unknown>).partnerHeight ?? "N/A")}</p>
              <p><span className="font-medium text-gray-700">Preferred Weight:</span> {String(partnerWeight?.value ?? "N/A")} kg</p>
            </div>
            <h2 className="text-2xl font-semibold border-b pb-4">Contact Information</h2>
            {isPremium ? (
              <p><span className="font-medium text-gray-700">Mobile:</span> {String((biodata as Record<string, unknown>).mobileNumber ?? "N/A")}</p>
            ) : (
              <Link href={`/checkout/${String(b.biodataId ?? b._id ?? id)}`}>
                <button type="button" className="mt-4 bg-me-orange px-4 py-2 text-white font-bold rounded">
                  View Contact Information
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <BiodataRecomendation type={biodata.biodataType} />
      </div>
    </div>
  );
}
