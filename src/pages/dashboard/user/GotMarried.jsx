import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useBiodatas from "@/hooks/useBiodatas";
import Swal from "sweetalert2";
import { useEffect } from "react";
import SectionTitleHome from "@/components/shared/SectionTitleHome";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();




  const [, , myBiodata] = useBiodatas();

  useEffect(() => {
    if (myBiodata) {
      setValue("selfBiodataId", myBiodata.biodataId);
    }
  }, [myBiodata, setValue]);

  const onSubmit = async (data) => {

    console.log(data)
    try {
      const res = await axiosSecure.post("/success-stories", data);

      if (res.data) {
        console.log(res.data)
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Success story submitted!",
      });
      // reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting success story:", error);
      // toast.error("Failed to submit success story.");
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to submit success story.",
      });
    }
  };

  return (
    <div className="p-6">
     
      <SectionTitleHome heading="Got Married" subHeading='Share Your Success Story'/>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Self Biodata ID */}
          <div className="mb-4">
            <label htmlFor="selfBiodataId" className="block text-sm font-medium">
              Self Biodata ID
            </label>
            <input
              type="text"
              id="selfBiodataId"
              value={myBiodata?.biodataId}
              {...register("selfBiodataId")}
              readOnly
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Partner Biodata ID */}
          <div className="mb-4">
            <label htmlFor="partnerBiodataId" className="block text-sm font-medium">
              Partner Biodata ID
            </label>
            <input
              type="text"
              id="partnerBiodataId"
              {...register("partnerBiodataId", { required: "Partner Biodata ID is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.partnerBiodataId && (
              <p className="text-red-500 text-sm mt-1">{errors.partnerBiodataId.message}</p>
            )}
          </div>

          {/* Marriage Date */}
          <div className="mb-4">
            <label htmlFor="marriageDate" className="block text-sm font-medium">
              Marriage Date
            </label>
            <input
              type="date"
              id="marriageDate"
              {...register("marriageDate", { required: "Marriage date is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.marriageDate && (
              <p className="text-red-500 text-sm mt-1">{errors.marriageDate.message}</p>
            )}
          </div>

          {/* Couple Image URL */}
          <div className="mb-4">
            <label htmlFor="coupleImage" className="block text-sm font-medium">
              Couple Image URL
            </label>
            <input
              type="text"
              id="coupleImage"
              {...register("coupleImage", { required: "Image URL is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.coupleImage && (
              <p className="text-red-500 text-sm mt-1">{errors.coupleImage.message}</p>
            )}
          </div>

          {/* Success Story */}
          <div className="mb-4">
            <label htmlFor="successStory" className="block text-sm font-medium">
              Success Story Review
            </label>
            <textarea
              id="successStory"
              {...register("successStory", { required: "Success story is required" })}
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
            {errors.successStory && (
              <p className="text-red-500 text-sm mt-1">{errors.successStory.message}</p>
            )}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating (out of 10)
            </label>
            <input
              type="number"
              id="rating"
              {...register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Minimum rating is 1" },
                max: { value: 10, message: "Maximum rating is 10" },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GotMarried;
