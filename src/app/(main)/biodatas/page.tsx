"use client";

import { useState } from "react";
import { useGetBiodatasQuery } from "@/features/biodata/api/biodataApi";
import Filters from "@/components/allBiodatas/Filters";
import BiodatasList from "@/components/allBiodatas/BiodataList";
import Loader from "@/shared/components/Loader";
import type { Biodata } from "@/shared/types";

export default function BiodatasPage() {
  const initialFilters = {
    ageRange: [18, 50] as [number, number],
    biodataType: "",
    division: "",
    isPremium: false,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const { data: biodatas = [], isLoading } = useGetBiodatasQuery();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRangeChange = (range: number | number[]) => {
    setFilters((prev) => ({ ...prev, ageRange: range as [number, number] }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setSortBy("default");
  };

  const filteredBiodatas = (biodatas as Biodata[])
    .filter((biodata) => {
      const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();
      return (
        (filters.biodataType === "" || biodata.biodataType === filters.biodataType) &&
        (filters.division === "" || biodata.permanentDivision === filters.division) &&
        (!filters.isPremium || biodata.isPremium) &&
        age >= filters.ageRange[0] &&
        age <= filters.ageRange[1] &&
        (!searchQuery || biodata.name.toLowerCase().includes(searchQuery))
      );
    })
    .sort((a, b) => {
      if (sortBy === "id") return (a.id ?? 0) - (b.id ?? 0);
      if (sortBy === "age") {
        const ageA = new Date().getFullYear() - new Date(a.dob).getFullYear();
        const ageB = new Date().getFullYear() - new Date(b.dob).getFullYear();
        return ageA - ageB;
      }
      return 0;
    });

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-2">
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleRangeChange={handleRangeChange}
          handleSearch={handleSearch}
          handleSort={handleSort}
          handleReset={handleReset}
        />
        <BiodatasList biodatas={filteredBiodatas} />
      </div>
    </div>
  );
}
