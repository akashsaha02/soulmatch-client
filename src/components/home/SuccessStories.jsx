import SectionTitleHome from "../shared/SectionTitleHome";
import { FaStar } from "react-icons/fa"; // For star rating

import couple1 from '../../assets/couple1.jpg'
import couple2 from '../../assets/couple2.jpg'
import couple3 from '../../assets/couple3.jpg'
import couple4 from '../../assets/couple4.jpg'

// Sample data for Success Stories
const successStories = [
    {
        image: couple1, // Couple image
        marriageDate: "2023-06-15", // Marriage Date
        stars: 5, // Review stars
        story: "We met on the platform, and our journey started with trust. Now we are happily married. It's a dream come true!",
        names: "John & Emily", // Couple's name
    },
    {
        image: couple2, // Couple image
        marriageDate: "2024-01-10", // Marriage Date
        stars: 4, // Review stars
        story: "Thanks to this platform, we found each other and are so grateful for the opportunity to build our lives together.",
        names: "Mark & Sarah", // Couple's name
    },
    {
        image: couple3, // Couple image
        marriageDate: "2022-11-20", // Marriage Date
        stars: 5, // Review stars
        story: "We couldn't be happier. The process was smooth, and we found our perfect match.",
        names: "David & Alice", // Couple's name
    },
];

const SuccessStories = () => {
    // Sorting by marriage date (ascending)
    const sortedStories = successStories.sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate));

    return (
        <div className="pb-16">
            <SectionTitleHome heading="Success Stories" subHeading="Real Couples, Real Love" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {sortedStories.map((story, index) => (
                    <div key={index} className="bg-white shadow-lg transform transition-all duration-300">
                        <div className="relative">
                            {/* Image */}
                            <img src={story.image} alt={`Couple ${story.names}`} className="w-full h-48 object-cover" />
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-30 rounded-t-2xl"></div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 bg-white rounded-b-2xl">
                            {/* Couple's Name */}
                            <h3 className="text-2xl font-semibold text-me-pink playfair">{story.names}</h3>

                            {/* Marriage Date */}
                            <p className="text-sm text-gray-800 font-bold mb-4 cinzel mt-2">{new Date(story.marriageDate).toLocaleDateString()}</p>

                            {/* Review Stars */}
                            <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-yellow-500 ${i < story.stars ? "filled" : ""}`} />
                                ))}
                            </div>

                            {/* Success Story Text */}
                            <p className="text-gray-800 font-medium text-base leading-relaxed line-clamp-2 ">{story.story}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;
