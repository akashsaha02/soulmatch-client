"use client";

import { useGetBiodatasQuery } from "@/features/biodata/api/biodataApi";
import SectionTitleHome from "../shared/SectionTitleHome";
import BiodataCard from "./BiodataCard";
import type { Biodata } from "@/shared/types";

export default function BiodataRecomendation({ type }: { type: string }) {
  const { data: biodatas = [] } = useGetBiodatasQuery();
  const filteredBiodatas = (biodatas as Biodata[]).filter((b) => b.biodataType === type).slice(0, 3);

  return (
    <div className="max-w-6xl px-6 mx-auto">
      <SectionTitleHome heading="Recomended Biodatas" subHeading="Explore similar biodatas" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBiodatas.map((biodata) => (
          <BiodataCard biodata={biodata} key={biodata._id ?? biodata.id} />
        ))}
      </div>
    </div>
  );
}
