import SectionTitleHome from "@/components/shared/SectionTitleHome";
import { axiosSecure } from "@/hooks/useAxiosSecure";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const AdminSuccessStory = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  // Fetch success stories on component mount
  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axiosSecure.get("/success-stories");
        setSuccessStories(response.data);
      } catch (error) {
        toast.error("Failed to fetch success stories.");
      }
    };
    fetchSuccessStories();
  }, []);

  // Handle opening of the modal with the selected story
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  // Handle closing of the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <div className="p-6">

      <Helmet>
        <title>Success Stories | Dashboard</title>
      </Helmet>
      <SectionTitleHome heading="Success Stories" subHeading="All the married couples" />

      <table className="table-auto w-full max-w-5xl mx-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Male Biodata ID</th>
            <th className="px-4 py-2">Female Biodata ID</th>
            <th className="px-4 py-2">View Story</th>
          </tr>
        </thead>
        <tbody>
          {successStories.length > 0 ? (
            successStories.map((story) => (
              <tr key={story._id} className="text-center">
                <td className="border px-4 py-2">{story.selfBiodataId}</td>
                <td className="border px-4 py-2">{story.partnerBiodataId}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleViewStory(story)}
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No success stories found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for displaying the success story */}
      {isModalOpen && selectedStory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Success Story</h3>
            <p className="mb-4"><strong>Male Biodata ID:</strong> {selectedStory.selfBiodataId}</p>
            <p className="mb-4"><strong>Female Biodata ID:</strong> {selectedStory.partnerBiodataId}</p>
            {selectedStory.coupleImage && (
              <div className="mb-4">
                <img
                  src={selectedStory.coupleImage}
                  alt="Couple Image"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
            <p className="mb-4"><strong>Story:</strong> {selectedStory.successStory}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuccessStory;
