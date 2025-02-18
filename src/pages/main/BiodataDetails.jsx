import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import useFavourites from '@/hooks/useFavourites';
import usePremium from '@/hooks/usePremium';
import BiodataRecomendation from '@/components/allBiodatas/BiodataRecomendation';
import { IoMdHeart } from "react-icons/io";

const BiodataDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [, refetch] = useFavourites();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  // const isPremium = usePremium();

  // console.log(isPremium);
  const [isPremium, isLoading, userData] = usePremium();

  useEffect(() => {
    axiosSecure
      .get(`/biodatas/details/${id}`)
      .then((res) => {
        setBiodata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  // const isPremium = false;

  const handleAddToFavourite = () => {
    if (user && user.email) {
      // Send data logic
      const favouriteBiodata = {
        favouriteId: id,
        favouriteBiodataId: biodataId,
        email: user.email,
        favouriteName: name,
        favouriteProfileImage: profileImage,
        favouriteEmail: userEmail,
      }

      axiosSecure.post('/favourites', favouriteBiodata)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Profile added to favourites!',
            timer: 1000,
          });
          refetch();
        })
        .catch((err) => {
          // Handle various error cases
          if (err.response && err.response.data) {
            if (err.response.data.message === 'Already added to favourites!') {
              Swal.fire({
                icon: 'warning',
                title: 'Already Added',
                text: 'This profile is already in your favourites!',
              });
            } else if (err.response.data.message === 'You cannot add your own profile to favourites.') {
              Swal.fire({
                icon: 'warning',
                title: 'Cannot Add Own Profile',
                text: 'You cannot add your own profile to favourites.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again!',
              });
            }
          } else {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again!',
            });
          }
        });

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'You\'re not logged in!',
        text: 'Please login to add to favourites!',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  if (loading) return <Loader />;

  if (!biodata) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No biodata found.</p>
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
    biodataId,
    race,
    userEmail,
  } = biodata;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 flex flex-col items-center justify-center">
            <img
              src={profileImage}
              alt={name}
              className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <h1 className="text-3xl font-bold mt-4">{name}</h1>
            <p className="text-sm mt-2">{biodataType}</p>
            <div className="mt-6 space-y-3 text-center">
              <p>
                <span className="font-medium">Present Location:</span>{" "}
                {presentDivision}
              </p>
              <p>
                <span className="font-medium">Permanent Location:</span>{" "}
                {permanentDivision}
              </p>
              <button
                onClick={handleAddToFavourite}
                className="bg-white text-indigo-600 px-6 py-2 rounded-full shadow-md hover:bg-indigo-100"
              >
                Add to Favourites <IoMdHeart />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-4">Details</h2>
            <div className="space-y-4">
              <p>
                <span className="font-medium text-gray-700">Date of Birth:</span>{" "}
                {new Date(dob).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Father's Name:
                </span>{" "}
                {fatherName}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Mother's Name:
                </span>{" "}
                {motherName}
              </p>
              <p>
                <span className="font-medium text-gray-700">Height:</span>{" "}
                {height}
              </p>
              <p>
                <span className="font-medium text-gray-700">Weight:</span>{" "}
                {weight.value} kg
              </p>
              <p>
                <span className="font-medium text-gray-700">Race:</span>{" "}
                {race}
              </p>
            </div>

            <h2 className="text-2xl font-semibold border-b pb-4">
              Partner Preferences
            </h2>
            <div className="space-y-4">
              <p>
                <span className="font-medium text-gray-700">
                  Preferred Age:
                </span>{" "}
                {partnerAge.value} years
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Preferred Height:
                </span>{" "}
                {partnerHeight}
              </p>
              <p>
                <span className="font-medium text-gray-700">
                  Preferred Weight:
                </span>{" "}
                {partnerWeight.value} kg
              </p>
            </div>

            <h2 className="text-2xl font-semibold border-b pb-4">
              Contact Information
            </h2>
            {isPremium ? (
              <p>
                <span className="font-medium text-gray-700">Mobile:</span>{" "}
                {mobileNumber}
              </p>
            ) : (
              <Link to={`/checkout/${biodataId}`}>
                <Button className='mt-4 bg-me-orange'>View Contact Information</Button>
              </Link>
            )}
          </div>
        </div>




      </div>
      <div className="">
        <BiodataRecomendation type={biodataType} />
      </div>
    </div>

  );
};

export default BiodataDetails;
