import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useBiodatas from "@/hooks/useBiodatas";
import axios from "axios";
import Swal from "sweetalert2";

const divisions = [
  { value: "Dhaka", label: "Dhaka" },
  { value: "Chattagram", label: "Chattagram" },
  { value: "Rangpur", label: "Rangpur" },
  { value: "Barisal", label: "Barisal" },
  { value: "Khulna", label: "Khulna" },
  { value: "Mymensingh", label: "Mymensingh" },
  { value: "Sylhet", label: "Sylhet" },
];

const ManageBiodata = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { biodatas, loading } = useBiodatas();
  console.log(biodatas);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        userEmail: user.email,
        name: data.name,
        biodataType: data.biodataType,
        profileImage: data.profileImage,
        height: data.height?.value,
        weight: data.weight,
        occupation: data.occupation,
        dob: data.dob,
        presentDivision: data.presentDivision?.value,
        permanentDivision: data.permanentDivision?.value,
        mobileNumber: data.mobileNumber,
      };
      console.log(payload)

      const response = await axiosSecure.post("/biodatas", payload)
      console.log(response.data)
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Item Added',
          text: 'Item has been added to the menu',
          icon: 'success',
          confirmButtonText: 'Okay'
        })
      }


    } catch (error) {
      console.error("Error creating biodata:", error);
      alert(error.response?.data?.message || "Failed to create biodata.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold mb-4">Manage Biodata</div>
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
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
          {/* Height */}
          <div className="mb-4">
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <select
              {...register("height", { required: "Height is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Height</option>
              <option value="4'6">4'6"</option>
              <option value="4'8">4'8"</option>
              <option value="4'10">4'10"</option>
              <option value="5'0">5'0"</option>
              <option value="5'2">5'2"</option>
              <option value="5'4">5'4"</option>
              <option value="5'6">5'6"</option>
              <option value="5'8">5'8"</option>
              <option value="5'0">5'10"</option>
              <option value="6'0">6'0"</option>
              <option value="6'2">6'2"</option>
              <option value="6'4">6'4"</option>
              <option value="6'6">6'6"</option>
            </select>
            {errors.height && <p className="text-red-500 text-xs">{errors.height.message}</p>}
          </div>

          {/* Weight */}
          <div className="mb-4">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight
            </label>
            <input
              id="weight"
              type="number"
              placeholder="Enter weight in kg"
              {...register("weight", { required: "Weight is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.weight && <p className="text-red-500 text-xs">{errors.weight.message}</p>}
          </div>

          {/* Occupation */}
          <div className="mb-4">
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              id="occupation"
              placeholder="Enter your occupation"
              {...register("occupation", { required: "Occupation is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation.message}</p>}
          </div>

          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
            {/* Date of Birth */}
            <div className="mb-4 w-full">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Controller
                name="dob"
                control={control}
                defaultValue={null} // Ensure default value is null
                rules={{ required: "Date of Birth is required" }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value} // Bind the selected value
                    onChange={onChange} // Update form state when date changes
                    dateFormat="yyyy-MM-dd" // Display date in simple format
                    className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholderText="Select Date of Birth"
                  />
                )}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>


            {/* Present Division */}
            <div className="mb-4 w-full">
              <label htmlFor="presentDivision" className="block text-sm font-medium text-gray-700">
                Present Division
              </label>
              <Controller
                name="presentDivision"
                control={control}
                rules={{ required: "Present Division is required" }}
                render={({ field }) => (
                  <Select {...field} options={divisions} className="w-full py-2" />
                )}
              />
              {errors.presentDivision && <p className="text-red-500 text-xs">{errors.presentDivision.message}</p>}
            </div>


            {/* Permanent Division */}
            <div className="mb-4 w-full">
              <label htmlFor="permanentDivision" className="block text-sm font-medium text-gray-700">
                Permanent Division
              </label>
              <Controller
                name="permanentDivision"
                control={control}
                rules={{ required: "Permanent Division is required" }}
                render={({ field }) => (
                  <Select {...field} options={divisions} className="w-full py-2" />
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
