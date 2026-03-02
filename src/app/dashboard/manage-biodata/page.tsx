"use client";

import Loader from "@/shared/components/Loader";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetBiodataByEmailQuery } from "@/features/biodata/api/biodataApi";

export default function ManageBiodataPage() {
  const { user } = useAuth();
  const { data: myBiodata, isLoading } = useGetBiodataByEmailQuery(user?.email ?? "", { skip: !user?.email });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <SectionTitleHome heading="Manage Biodata" subHeading="Create or update your biodata" />
      <p className="text-gray-600 mt-4">
        {myBiodata ? "Biodata form - use the original ManageBiodata component for full form." : "Create your biodata to get started."}
      </p>
    </div>
  );
}
