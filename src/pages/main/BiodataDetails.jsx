import { useParams } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader';

const BiodataDetails = () => {
    const { id } = useParams();
    const [biodata, setBiodata] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosSecure = useAxiosSecure();

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

    if (loading) return <Loader />;

    if (!biodata) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">No biodata found.</p>
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
    } = biodata;

    return (
        <div className="min-h-screen p-4 flex justify-center">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 flex flex-col items-center">
                    <img
                        src={profileImage}
                        alt={name}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover"
                    />
                    <h1 className="text-2xl font-bold mt-4">{name}</h1>
                    <p className="text-sm mt-1">{biodataType}</p>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Date of Birth:</p>
                                <p>{new Date(dob).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="font-medium">Father's Name:</p>
                                <p>{fatherName}</p>
                            </div>
                            <div>
                                <p className="font-medium">Mother's Name:</p>
                                <p>{motherName}</p>
                            </div>
                            <div>
                                <p className="font-medium">Height:</p>
                                <p>{height}</p>
                            </div>
                            <div>
                                <p className="font-medium">Weight:</p>
                                <p>{weight} kg</p>
                            </div>
                            <div>
                                <p className="font-medium">Race:</p>
                                <p>{race}</p>
                            </div>
                        </div>
                    </div>

                    {/* Partner Preferences */}
                    <div>
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Partner Preferences
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Preferred Age:</p>
                                <p>{partnerAge} years</p>
                            </div>
                            <div>
                                <p className="font-medium">Preferred Height:</p>
                                <p>{partnerHeight}</p>
                            </div>
                            <div>
                                <p className="font-medium">Preferred Weight:</p>
                                <p>{partnerWeight} kg</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div>
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Location Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Present Division:</p>
                                <p>{presentDivision}</p>
                            </div>
                            <div>
                                <p className="font-medium">Permanent Division:</p>
                                <p>{permanentDivision}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Mobile:</p>
                                <p>{mobileNumber}</p>
                            </div>
                            <div>
                                <p className="font-medium">Email:</p>
                                <p>{userEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
