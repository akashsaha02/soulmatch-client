"use client";

import { useState } from "react";
import { useGetBiodatasQuery } from "@/features/biodata/api/biodataApi";
import SectionTitleHome from "../shared/SectionTitleHome";
import BiodataCard from "../allBiodatas/BiodataCard";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import type { Biodata } from "@/shared/types";

function calculateAge(dob: string) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function FeaturedUsers() {
  const { data: biodatas = [] } = useGetBiodatasQuery();
  const [sortOrder, setSortOrder] = useState("default");

  const premiumUsers = (biodatas as Biodata[])
    .filter((b) => b.isPremium === true)
    .map((b) => ({ ...b, age: calculateAge(b.dob) }));

  const sortedUsers = (() => {
    if (sortOrder === "ascending") return [...premiumUsers].sort((a, b) => a.age - b.age);
    if (sortOrder === "descending") return [...premiumUsers].sort((a, b) => b.age - a.age);
    return premiumUsers;
  })().slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionTitleHome heading="Featured Users" subHeading="Our Premium Members" />
      <div className="flex justify-end items-center mb-4">
        <label className="mr-2 font-bold playfair">Sort By:</label>
        <select
          className="border border-gray-300 rounded px-2 py-1 playfair font-bold"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="ascending">Age (Ascending)</option>
          <option value="descending">Age (Descending)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedUsers.map((biodata, index) => (
          <BiodataCard key={index} biodata={biodata} />
        ))}
      </div>
      <div className="py-4 flex justify-center">
        <Link href="/biodatas">
          <Button className="bg-me-pink cinzel font-bold">
            See More <FaArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
