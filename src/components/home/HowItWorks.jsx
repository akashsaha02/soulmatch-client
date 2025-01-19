import React from 'react'
import SectionTitleHome from '../shared/SectionTitleHome'
import { FaUserPlus, FaUserEdit, FaSearch, FaHeart, FaCrown } from "react-icons/fa";

const HowItWorks = () => {

    const steps = [
        {
            icon: FaUserPlus,
            title: "Register for Free",
            description: "Sign up for free and create your basic profile to get started.",
        },
        {
            icon: FaUserEdit,
            title: "Create Your Profile",
            description: "Add personal details, preferences, and photos to showcase yourself.",
        },
        {
            icon: FaSearch,
            title: "Search for Matches",
            description: "Browse through thousands of profiles to find your perfect match.",
        },
        {
            icon: FaHeart,
            title: "Express Interest",
            description: "Send interest requests to profiles you like and start a conversation.",
        },
        {
            icon: FaCrown,
            title: "Upgrade to Premium",
            description: "Enjoy exclusive benefits like priority visibility and direct messaging.",
        },
    ];
    return (
        <div>

            <SectionTitleHome heading="How It Works" subHeading="Simple Steps" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto my-8">
                {steps.map((step, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        {/* Icon */}
                        <div className="flex justify-center mb-4 text-indigo-600">
                            <step.icon className="text-5xl" />
                        </div>
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        {/* Description */}
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HowItWorks