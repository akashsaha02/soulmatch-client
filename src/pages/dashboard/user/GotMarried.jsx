// GotMarried.jsx

import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    successStory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          coupleImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosSecure.post("/success-stories", formData);
      toast.success("Success story submitted!");
      setFormData({
        selfBiodataId: "",
        partnerBiodataId: "",
        coupleImage: "",
        successStory: "",
      });
    } catch (error) {
      console.error("Error submitting success story:", error);
      toast.error("Failed to submit success story.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Share Your Success Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="selfBiodataId" className="block text-sm font-medium">
            Self Biodata ID
          </label>
          <input
            type="text"
            id="selfBiodataId"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="partnerBiodataId" className="block text-sm font-medium">
            Partner Biodata ID
          </label>
          <input
            type="text"
            id="partnerBiodataId"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coupleImage" className="block text-sm font-medium">
            Couple Image (optional)
          </label>
          <input
            type="file"
            id="coupleImage"
            name="coupleImage"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 p-2"
          />
          {formData.coupleImage && (
            <img
              src={formData.coupleImage}
              alt="Couple Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="successStory" className="block text-sm font-medium">
            Success Story Review
          </label>
          <textarea
            id="successStory"
            name="successStory"
            value={formData.successStory}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>

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
