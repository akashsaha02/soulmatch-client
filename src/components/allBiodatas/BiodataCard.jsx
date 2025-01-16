import { useState } from "react";
const BiodataCard = ({ biodata, handleViewProfile }) => {
  const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition relative">


      {/* Profile Image */}
      <img
        src={biodata.profileImage}
        alt={biodata.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Biodata Details */}
      <h3 className="font-semibold text-lg mb-2">{biodata.name}</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        <li>Biodata ID: {biodata.biodataId}</li>
        <li>Biodata Type: {biodata.biodataType}</li>
        <li>Permanent Division: {biodata.permanentDivision}</li>
        <li>Age: {age}</li>
        <li>Occupation: {biodata.occupation}</li>
      </ul>

      {/* View Profile Button */}
      <button
        onClick={() => handleViewProfile(biodata._id)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full text-center"
      >
        View Profile
      </button>
    </div>
  );
};

export default BiodataCard;
