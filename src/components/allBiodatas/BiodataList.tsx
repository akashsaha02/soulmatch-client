"use client";

import { useState } from "react";
import BiodataCard from "./BiodataCard";
import type { Biodata } from "@/shared/types";

export default function BiodatasList({ biodatas }: { biodatas: Biodata[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(biodatas.length / itemsPerPage);
  const paginatedBiodatas = biodatas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4 playfair uppercase">
        All Biodatas ({biodatas.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {paginatedBiodatas.map((biodata) => (
          <BiodataCard key={biodata._id ?? biodata.id} biodata={biodata} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium text-gray-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
