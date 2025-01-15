import React from "react";
import useBiodatas from "@/hooks/useBiodatas";

const UserHome = () => {
  const [, , myBiodata] = useBiodatas();

  if (!myBiodata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const {
    name,
    profileImage,
    biodataType,
    dob,
    fatherName,
    motherName,
    height,
    weight,
    occupation,
    partnerAge,
    partnerHeight,
    partnerWeight,
    permanentDivision,
    presentDivision,
    mobileNumber,
    race,
    userEmail,
  } = myBiodata;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col items-center bg-indigo-600 p-6 text-white">
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          <h1 className="text-2xl font-bold mt-4">{name}</h1>
          <p className="text-sm mt-1">{biodataType}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
              Personal Information
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Date of Birth:</span>
                <span>{new Date(dob).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Father's Name:</span>
                <span>{fatherName}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Mother's Name:</span>
                <span>{motherName}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{height}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{weight} kg</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Race:</span>
                <span>{race}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Mobile:</span>
                <span>{mobileNumber}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{userEmail}</span>
              </li>
            </ul>
          </div>

          {/* Partner Preferences */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
              Partner Preferences
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{partnerAge} years</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{partnerHeight}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{partnerWeight} kg</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h2 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
              Location
            </h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="font-medium">Present Division:</span>
                <span>{presentDivision}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Permanent Division:</span>
                <span>{permanentDivision}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
