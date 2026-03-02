"use client";

import { FaUser, FaIdCard, FaMapMarkerAlt, FaBirthdayCake, FaBriefcase } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import Link from "next/link";
import type { Biodata } from "@/shared/types";

export default function BiodataCard({ biodata }: { biodata: Biodata & { age?: number } }) {
  const age = biodata.age ?? (new Date().getFullYear() - new Date(biodata.dob).getFullYear());
  const occupation = biodata.occupation as { value?: string } | undefined;

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition transform hover:shadow-xl relative overflow-hidden border border-me-brown">
      <div className="relative">
        <img
          src={biodata.profileImage}
          alt={biodata.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <h3 className="absolute bottom-2 left-4 flex items-center gap-2 text-me-bg font-semibold text-lg playfair uppercase">
          {biodata.name}
        </h3>
        {biodata.isPremium && (
          <div className="absolute top-4 right-4 text-lg bg-me-pink p-1 text-white rounded-full">
            <IoDiamond />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FaIdCard className="text-me-orange" />
            <span className="font-semibold text-me-brown">Biodata ID: {String(biodata.biodataId ?? biodata.id ?? biodata._id ?? "")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaUser className="text-me-orange" />
            <span className="font-semibold text-me-brown">Gender: {biodata.biodataType}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-me-orange" />
            <span className="font-semibold text-me-brown">{biodata.permanentDivision}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBirthdayCake className="text-me-orange" />
            <span className="font-semibold text-me-brown">{age} years</span>
          </div>
          {occupation?.value && (
            <div className="flex items-center space-x-2">
              <FaBriefcase className="text-me-orange" />
              <span className="font-semibold text-me-brown">{occupation.value}</span>
            </div>
          )}
        </div>
        <Link href={`/biodatas/${biodata._id ?? biodata.id}`}>
          <button
            type="button"
            className="mt-4 bg-me-teal text-white px-4 py-2 w-full text-center font-bold hover:bg-me-pink transition cinzel"
          >
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
