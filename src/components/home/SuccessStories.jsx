import SectionTitleHome from "../shared/SectionTitleHome";
import { FaStar } from "react-icons/fa"; // For star rating
import { useEffect, useState } from "react";
import { axiosPublic } from "@/hooks/useAxiosPublic";

const SuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]); // State to store success stories

    useEffect(() => {
        async function fetchData() {
            const res = await axiosPublic.get("/success-stories");
            if (res.data) {
                setSuccessStories(res.data);
            }
        }
        fetchData();
    }, []);

    // Sorting the stories by marriage date in descending order
    const sortedStories = successStories.sort(
        (a, b) => new Date(a.marriageDate) - new Date(b.marriageDate)
    );

    const data = sortedStories.slice(0, 2);

    return (
        <div className="pb-16 bg-gray-50">
            <SectionTitleHome heading="Success Stories" subHeading="Real Couples, Real Love" />

            <div className=" gap-5 max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 mx-auto px-4 sm:px-6 lg:px-8">
                {data.map((story, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform"
                    >
                        {/* Left: Couple Image */}
                        <div className="md:w-1/3">
                            <img
                                src={story.coupleImage}
                                alt={`Couple ${story.selfDetails.name} & ${story.partnerDetails.name}`}
                                className="w-full h-72 lg:h-80 object-cover"
                            />
                        </div>
                        {/* Right: Card Body */}
                        <div className="p-6 md:w-2/3">
                            {/* Couple's Name and Marriage Date */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <h3 className="text-2xl font-bold text-me-pink playfair">
                                    {story.selfDetails.name.split(" ")[0]} & {story.partnerDetails.name.split(" ")[0]}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Married on: {new Date(story.marriageDate).toLocaleDateString()}
                                </p>
                            </div>
                            {/* Story */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                                {story.successStory}
                            </p>
                            {/* Stars */}
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-yellow-400 ${i < story.rating / 2 ? "filled" : "opacity-30"
                                            }`}
                                    />
                                ))}
                            </div>
                            {/* Couple Photos */}
                            <div className="flex items-center gap-4 mt-4">
                                <img
                                    src={story.selfDetails.photo}
                                    alt={`${story.selfDetails.name}`}
                                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                                />
                                <img
                                    src={story.partnerDetails.photo}
                                    alt={`${story.partnerDetails.name}`}
                                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;
