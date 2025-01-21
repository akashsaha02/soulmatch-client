import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import useFavourites from '@/hooks/useFavourites';
import usePremium from '@/hooks/usePremium';

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
    const [ isPremium, isLoading, userData ] = usePremium();

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
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
  <div className="bg-white max-w-4xl w-full rounded-xl shadow-xl overflow-hidden">
    {/* Header Section */}
    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white p-8 text-center">
      <img
        src={profileImage}
        alt={name}
        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
      />
      <h1 className="text-3xl font-bold mt-4">{name}</h1>
      <p className="text-sm font-light mt-2">{biodataType}</p>
    </div>

    {/* Details Section */}
    <div className="p-8 space-y-8">
      {/* Personal Information */}
      <section>
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Personal Information
          </h2>
          <button
            onClick={handleAddToFavourite}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md"
          >
            Add to Favourites
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {new Date(dob).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Father's Name</p>
            <p className="font-medium text-gray-800">{fatherName}</p>
          </div>
          <div>
            <p className="text-gray-500">Mother's Name</p>
            <p className="font-medium text-gray-800">{motherName}</p>
          </div>
          <div>
            <p className="text-gray-500">Height</p>
            <p className="font-medium text-gray-800">{height}</p>
          </div>
          <div>
            <p className="text-gray-500">Weight</p>
            <p className="font-medium text-gray-800">{weight} kg</p>
          </div>
          <div>
            <p className="text-gray-500">Race</p>
            <p className="font-medium text-gray-800">{race}</p>
          </div>
        </div>
      </section>

      {/* Partner Preferences */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-6">
          Partner Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Preferred Age</p>
            <p className="font-medium text-gray-800">{partnerAge} years</p>
          </div>
          <div>
            <p className="text-gray-500">Preferred Height</p>
            <p className="font-medium text-gray-800">{partnerHeight}</p>
          </div>
          <div>
            <p className="text-gray-500">Preferred Weight</p>
            <p className="font-medium text-gray-800">{partnerWeight} kg</p>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-6">
          Location Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Present Division</p>
            <p className="font-medium text-gray-800">{presentDivision}</p>
          </div>
          <div>
            <p className="text-gray-500">Permanent Division</p>
            <p className="font-medium text-gray-800">{permanentDivision}</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-6">
          Contact Information
        </h2>
        {isPremium ? (
          <div>
            <p className="text-gray-500">Mobile</p>
            <p className="font-medium text-gray-800">{mobileNumber}</p>
          </div>
        ) : (
          <div className="text-center">
            <Link to={`/checkout/${biodataId}`}>
              <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600">
                View Contact Information
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  </div>
</div>

    );
};

export default BiodataDetails;
