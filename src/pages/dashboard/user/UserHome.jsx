import useBiodatas from "@/hooks/useBiodatas";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { FaBirthdayCake, FaPhone, FaEnvelope, FaMale, FaFemale, FaWeight } from "react-icons/fa";
import { MdLocationOn, MdHeight } from "react-icons/md";
import { Helmet } from "react-helmet";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const UserHome = () => {
  const { user } = useAuth()
  const [, , myBiodata] = useBiodatas();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (!myBiodata) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm">
          <div className="flex justify-center items-center mx-auto mb-6">
            <div className="relative w-24 h-24">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full rounded-full shadow-md border-4 border-blue-500"
              />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            No Biodata Found
          </h1>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-gray-600">{user.displayName}</p>
          <button onClick={() => navigate('/dashboard/manage-biodata')} className="mt-6 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
            Create Biodata
          </button>
        </div>
      </div>

    );
  }

  const {
    _id,
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
    isPremium
  } = myBiodata;



  const handleRequestPremium = async (id) => {
    // alert("Request for premium biodata sent successfully")

    try {
      const res = await axiosSecure.post(`/request-premium/${id}`)
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Request for premium biodata sent successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Already Requested!",
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Already Requested!",
      });

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 flex justify-center items-center p-6">
      <Helmet>
        <title>{name} | Biodata</title>
      </Helmet>
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col items-center bg-gradient-to-r from-me-orange to-me-darkOrange p-8 text-white">
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h1 className="text-3xl font-extrabold mt-4 playfair">{name}</h1>
          <p className="text-sm font-medium text-lg mt-2 opacity-90">{biodataType}</p>
        </div>

        {/* Profile Details */}
        <div className="p-8 space-y-8">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
              Personal Information
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center">
                <FaBirthdayCake className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Date of Birth:</span>
                <span className="ml-auto text-gray-800">
                  {new Date(dob).toLocaleDateString()}
                </span>
              </li>
              <li className="flex items-center">
                <FaMale className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Father's Name:</span>
                <span className="ml-auto text-gray-800">{fatherName}</span>
              </li>
              <li className="flex items-center">
                <FaFemale className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Mother's Name:</span>
                <span className="ml-auto text-gray-800">{motherName}</span>
              </li>
              <li className="flex items-center">
                <MdHeight className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Height:</span>
                <span className="ml-auto text-gray-800">{height}</span>
              </li>
              <li className="flex items-center">
                <FaWeight className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Weight:</span>
                <span className="ml-auto text-gray-800">{weight.value} kg</span>
              </li>
              <li className="flex items-center">
                <MdLocationOn className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Race:</span>
                <span className="ml-auto text-gray-800">{race}</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Mobile:</span>
                <span className="ml-auto text-gray-800">{mobileNumber}</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-auto text-gray-800">{userEmail}</span>
              </li>
            </ul>
          </section>

          {/* Partner Preferences */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
              Partner Preferences
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center">
                <FaBirthdayCake className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Age:</span>
                <span className="ml-auto text-gray-800">{partnerAge.value} years</span>
              </li>
              <li className="flex items-center">
                <MdHeight className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Height:</span>
                <span className="ml-auto text-gray-800">{partnerHeight}</span>
              </li>
              <li className="flex items-center">
                <FaWeight className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Weight:</span>
                <span className="ml-auto text-gray-800">{partnerWeight.value} kg</span>
              </li>
            </ul>
          </section>

          {/* Location */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
              Location
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdLocationOn className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Present Division:</span>
                <span className="ml-auto text-gray-800">{presentDivision}</span>
              </li>
              <li className="flex items-center">
                <MdLocationOn className="text-indigo-500 mr-3" />
                <span className="font-medium text-gray-600">Permanent Division:</span>
                <span className="ml-auto text-gray-800">{permanentDivision}</span>
              </li>
            </ul>
          </section>

          {/* Premium Section */}
          <div className="text-center">
            {isPremium ? (
              <button className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600">
                Premium User
              </button>
            ) : (
              <button
                onClick={() => handleRequestPremium(_id)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600"
              >
                Make Biodata Premium
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserHome;
