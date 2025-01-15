import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "@/hooks/useAuth";

const divisions = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chattagra", label: "Chattagra" },
  { value: "Rangpur", label: "Rangpur" },
  { value: "Barisal", label: "Barisal" },
  { value: "Khulna", label: "Khulna" },
  { value: "Mymensingh", label: "Mymensingh" },
  { value: "Sylhet", label: "Sylhet" },
];

const ManageBiodata = () => {
  const { user } = useAuth();
  const [biodataId, setBiodataId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/biodata", {
        ...data,
        biodataId,
        userEmail: user.email,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error creating biodata:", error);
      alert(error.response?.data?.message || "Failed to create biodata.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios.get(`/api/biodata/${user.email}`).then((res) => {
      if (res.data.biodata) {
        const { biodata } = res.data;
        Object.keys(biodata).forEach((key) => setValue(key, biodata[key]));
        setBiodataId(biodata.biodataId);
      }
    });
  }, [user, setValue]);

  return (
    <div>
      <div className="text-center text-2xl font-bold mb-4">Manage Biodata</div>
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Biodata Type */}
          <div className="mb-4">
            <label htmlFor="biodataType" className="block text-sm font-medium text-gray-700">
              Biodata Type
            </label>
            <select
              {...register("biodataType", { required: "Biodata Type is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.biodataType && <p className="text-red-500 text-xs">{errors.biodataType.message}</p>}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              placeholder="Enter your valid name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          {/* Profile Image */}
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Image Link
            </label>
            <input
              id="profileImage"
              placeholder="Enter your formal profile image link"
              {...register("profileImage", { required: "Profile Image Link is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.profileImage && <p className="text-red-500 text-xs">{errors.profileImage.message}</p>}
          </div>

          <div className="flex items-center justify-between space-x-4">
            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholderText="Select Date of Birth"
                  />
                )}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>

            {/* Permanent Division */}
            <div className="mb-4">
              <label htmlFor="permanentDivision" className="block text-sm font-medium text-gray-700">
                Permanent Division
              </label>
              <Controller
                name="permanentDivision"
                control={control}
                defaultValue=""
                rules={{ required: "Permanent Division is required" }}
                render={({ field }) => (
                  <Select {...field} options={divisions} className="mt-1 w-full px-4 py-2" />
                )}
              />
              {errors.permanentDivision && <p className="text-red-500 text-xs">{errors.permanentDivision.message}</p>}
            </div>


          </div>




          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              placeholder="Enter your valid mobile number"
              {...register("mobileNumber", { required: "Mobile Number is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>}
          </div>

          {/* Save Button */}
          <div className="mb-4">
            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save & Publish Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageBiodata;
