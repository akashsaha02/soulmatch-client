import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useBiodatas from "@/hooks/useBiodatas";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [, , myBiodata] = useBiodatas();
  const selfBiodataId = myBiodata?.biodataId;

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/success-stories", data);
      toast.success("Success story submitted!");
      reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting success story:", error);
      toast.error("Failed to submit success story.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Share Your Success Story</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Self Biodata ID */}
        <div className="mb-4">
          <label htmlFor="selfBiodataId" className="block text-sm font-medium">
            Self Biodata ID
          </label>
          <input
            type="text"
            id="selfBiodataId"
            value={selfBiodataId || ""}
            {...register("selfBiodataId")}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
          {errors.selfBiodataId && (
            <p className="text-red-500 text-sm mt-1">{errors.selfBiodataId.message}</p>
          )}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
