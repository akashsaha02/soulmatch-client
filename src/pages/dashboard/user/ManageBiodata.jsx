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

const races = [
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Indian", label: "Indian" },
  { value: "Hispanic", label: "Hispanic" },
  { value: "Asian", label: "Asian" },
  { value: "MiddleEastern", label: "Middle Eastern" },
  { value: "Native American", label: "Native American" },
  { value: "Pacific Islander", label: "Pacific Islander" },
  { value: "Mixed", label: "Mixed" },
  { value: "Other", label: "Other" },
];

const heightOptions = [
  { value: "4 feet 6 inch", label: "4'6\"" },
  { value: "4 feet 8 inch", label: "4'8\"" },
  { value: "4 feet 10 inch", label: "4'10\"" },
  { value: "5 feet 0 inch", label: "5'0\"" },
  { value: "5 feet 2 inch", label: "5'2\"" },
  { value: "5 feet 4 inch", label: "5'4\"" },
  { value: "5 feet 6 inch", label: "5'6\"" },
  { value: "5 feet 8 inch", label: "5'8\"" },
  { value: "5 feet 10 inch", label: "5'10\"" },
  { value: "6 feet 0 inch", label: "6'0\"" },
  { value: "6 feet 2 inch", label: "6'2\"" },
  { value: "6 feet 4 inch", label: "6'4\"" },
  { value: "6 feet 6 inch", label: "6'6\"" },

]

const ManageBiodata = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const [biodatas, loading, myBiodata] = useBiodatas();
  console.log(biodatas.length);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (myBiodata) {
      setValue("biodataType", myBiodata.biodataType);
      setValue("name", myBiodata.name);
      setValue("fatherName", myBiodata.fatherName);
      setValue("motherName", myBiodata.motherName);
      setValue("profileImage", myBiodata.profileImage);
      setValue("race", { value: myBiodata.race, label: myBiodata.race });
      setValue("height", { value: myBiodata.height, label: myBiodata.height });
      setValue("weight", myBiodata.weight);
      setValue("occupation", myBiodata.occupation);
      setValue("dob", new Date(myBiodata.dob));
      setValue("presentDivision", {
        value: myBiodata.presentDivision,
        label: myBiodata.presentDivision,
      });
      setValue("permanentDivision", {
        value: myBiodata.permanentDivision,
        label: myBiodata.permanentDivision,
      });
      setValue("mobileNumber", myBiodata.mobileNumber);
      setValue("partnerAge", myBiodata.partnerAge);
      setValue("partnerHeight", {
        value: myBiodata.partnerHeight,
        label: myBiodata.partnerHeight,
      });
      setValue("partnerWeight", myBiodata.partnerWeight);

    }
  }, [myBiodata, setValue]);


  const onSubmit = async (data) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      text: "Make sure all the information is correct before saving.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true); // Start the loading indicator
        try {
          const payload = {
            userEmail: user.email,
            name: data.name,
            fatherName: data.fatherName,
            motherName: data.motherName,
            biodataType: data.biodataType,
            profileImage: data.profileImage,
            race: data.race?.value,
            height: data.height?.value,
            weight: data.weight,
            occupation: data.occupation,
            dob: data.dob,
            presentDivision: data.presentDivision?.value,
            permanentDivision: data.permanentDivision?.value,
            mobileNumber: data.mobileNumber,
            partnerAge: data.partnerAge,
            partnerHeight: data.partnerHeight?.value,
            partnerWeight: data.partnerWeight,
          };
          console.log(payload);

          const response = await axiosSecure.post("/biodatas", payload);
          console.log(response.data);

          if (response.data.insertedId) {
            Swal.fire({
              title: "Congratulations!",
              text: "Biodata created successfully",
              icon: "success",
              confirmButtonText: "Okay",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Biodata updated successfully",
              icon: "success",
              confirmButtonText: "Okay",
            });
          }
        } catch (error) {
          console.error("Error creating biodata:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to create biodata",
            icon: "error",
            confirmButtonText: "Okay",
          });
        } finally {
          setIsLoading(false); // Stop the loading indicator
        }
      } else {
        Swal.fire("Changes were not saved", "", "info");
      }
    });
  };


  return (
    <div>
      <div className="text-center text-2xl font-bold mb-4">Manage Biodata</div>
      <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>

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

          {/* Fathers Name */}
          <div className="mb-4">
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
              Father Name
            </label>
            <input
              id="fatherName"
              placeholder="Enter your father's name"
              {...register("fatherName", { required: "Father Name is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.fatherName && <p className="text-red-500 text-xs">{errors.fatherName.message}</p>}
          </div>
          {/*Mothers Name */}
          <div className="mb-4">
            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
              Mother's Name
            </label>
            <input
              id="motherName"
              placeholder="Enter your mother's name"
              {...register("motherName", { required: "Mother's Name is required" })}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.motherName && <p className="text-red-500 text-xs">{errors.motherName.message}</p>}
          </div>



          {/* type and race */}

          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">

            {/* Biodata Type */}
            <div className="mb-4 w-full">
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

            {/* Race Type */}
            <div className="mb-4 w-full">
              <label htmlFor="race" className="block text-sm font-medium text-gray-700">
                Race
              </label>

              <Controller
                name="race"
                control={control}
                rules={{ required: "Race is required" }}
                render={({ field }) => (
                  <Select
                    placeholder="Select A Race"
                    {...field} options={races} className="w-full mt-1" />
                )}
              />
              {errors.race && <p className="text-red-500 text-xs">{errors.race.message}</p>}


            </div>


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


          {/* Height Weight and date of birth */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 w-full">
            {/* Height */}
            <div className="mb-4 w-full">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height
              </label>
              <Controller
                name="height"
                control={control}
                rules={{ required: "Height is required" }}
                render={({ field }) => (
                  <Select
                    className="mt-1 w-full"
                    {...field}
                    options={heightOptions}
                    placeholder="Select Height"
                  />
                )}
              />
              {errors.height && <p className="text-red-500 text-xs">{errors.height.message}</p>}
            </div>

            {/* Weight */}
            <div className="mb-4 w-full">
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

          </div>



          {/* Occupation and Division */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">

            {/* Occupation */}
            <div className="mb-4 w-full">
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
                  <Select {...field} options={divisions} className="w-full mt-1" />
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
                  <Select {...field} options={divisions} className="w-full mt-1" />
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




          {/* <---------------------------- Partnar Info----------------------> */}
          <div className="text-center text-gray-700 font-semibold mb-4">Expected Partner's Info</div>

          {/* partner age, height, weight */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 w-full">

            {/* Age */}
            <div className="mb-4 w-full">
              <label htmlFor="partnerAge" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="partnerAge"
                type="number"
                placeholder="Enter partner's age in number"
                {...register("partnerAge", { required: "Partner's Age is required" })}
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.partnerAge && <p className="text-red-500 text-xs">{errors.partnerAge.message}</p>}
            </div>


            {/* Partner's Height */}
            <div className="mb-4 w-full">
              <label htmlFor="partnerHeight" className="block text-sm font-medium text-gray-700">
                Partner's Height
              </label>
              <Controller
                name="partnerHeight"
                control={control}
                rules={{ required: "Partner's Height is required" }}
                render={({ field }) => (
                  <Select
                    className="mt-1 w-full"
                    {...field}
                    options={heightOptions}
                    placeholder="Select Height"
                  />
                )}
              />
              {errors.partnerHeight && <p className="text-red-500 text-xs">{errors.partnerHeight.message}</p>}
            </div>

            {/* Weight */}
            <div className="mb-4 w-full">
              <label htmlFor="partnerWeight" className="block text-sm font-medium text-gray-700">
                Partner's Weight
              </label>
              <input
                id="partnerWeight"
                type="number"
                placeholder="Partner's weight in kg"
                {...register("partnerWeight", { required: "Weight is required" })}
                className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.partnerWeight && <p className="text-red-500 text-xs">{errors.partnerWeight.message}</p>}
            </div>

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
