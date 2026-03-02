"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetFavouritesQuery } from "@/features/favourites/api/favouritesApi";
import BiodataCard from "@/components/allBiodatas/BiodataCard";
import Loader from "@/shared/components/Loader";

export default function MyFavouritesPage() {
  const { user } = useAuth();
  const { data: favourites = [], isLoading } = useGetFavouritesQuery(user?.email ?? undefined, { skip: !user?.email });

  if (isLoading) return <Loader />;

  const biodatas = (favourites as { favouriteBiodataId?: string; favouriteName?: string; favouriteProfileImage?: string; [key: string]: unknown }[]).map((f) => ({
    _id: f.favouriteBiodataId,
    name: f.favouriteName,
    profileImage: f.favouriteProfileImage,
    biodataType: "",
    dob: "",
    permanentDivision: "",
    biodataId: f.favouriteBiodataId,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favourites</h1>
      {biodatas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {biodatas.map((b) => (
            <BiodataCard key={b._id} biodata={b as never} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">No favourites yet.</p>
      )}
    </div>
  );
}
