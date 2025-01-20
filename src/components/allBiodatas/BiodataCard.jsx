import { FaUser, FaIdCard, FaMapMarkerAlt, FaBirthdayCake, FaBriefcase } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";

const BiodataCard = ({ biodata, handleViewProfile }) => {
  const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition transform hover:shadow-xl relative overflow-hidden border border-me-brown">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={biodata.profileImage}
          alt={biodata.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <h3 className="absolute bottom-2 left-4 flex items-center gap-2 text-me-bg font-semibold text-lg playfair uppercase">
          {biodata.name}
        </h3>
        {biodata.isPremium && (<div className="absolute top-4 right-4 text-lg bg-me-pink p-1 text-white rounded-full"><IoDiamond /></div>)}
      </div>

      {/* Biodata Details */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FaIdCard className="text-me-orange" />
            <span className="font-semibold text-me-brown">Biodata ID: {biodata.biodataId}</span>
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
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-me-orange" />
            <span className="font-semibold text-me-brown">{biodata.occupation}</span>
          </div>
        </div>

        {/* View Profile Button */}
        <button
          onClick={() => handleViewProfile(biodata._id)}
          className="mt-4 bg-me-teal text-white px-4 py-2 w-full text-center font-bold hover:bg-me-pink transition cinzel"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default BiodataCard;
