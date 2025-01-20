import React from "react";
import { Helmet } from "react-helmet";

const teamMembers = [
    {
        name: "John Doe",
        role: "Founder & CEO",
        image: "https://via.placeholder.com/150",
        bio: "Passionate about connecting people and fostering meaningful relationships.",
    },
    {
        name: "Jane Smith",
        role: "Chief Technology Officer",
        image: "https://via.placeholder.com/150",
        bio: "Loves innovating and bringing cutting-edge technology to life.",
    },
    {
        name: "Alex Johnson",
        role: "Lead Designer",
        image: "https://via.placeholder.com/150",
        bio: "Focused on crafting seamless and user-friendly experiences.",
    },
];

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">About SoulMatch</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Building bridges for meaningful connections, one step at a time.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">How SoulMatch Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">1. Create Your Profile</h3>
                            <p className="text-gray-600 mt-2">
                                Sign up and complete your profile with accurate information and preferences.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">2. Find Compatible Matches</h3>
                            <p className="text-gray-600 mt-2">
                                Use our smart algorithms to discover people who align with your values and interests.
                            </p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">3. Connect & Communicate</h3>
                            <p className="text-gray-600 mt-2">
                                Start meaningful conversations and build connections that last.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-6 text-center"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-gray-500 text-sm">{member.role}</p>
                                <p className="text-gray-600 mt-2">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Our Mission & Vision</h2>
                    <p className="text-gray-600 text-lg text-center">
                        Our mission is to empower individuals to find meaningful connections by leveraging the power of technology and empathy. 
                        We envision a world where everyone has the opportunity to build lasting relationships in a safe and inclusive environment.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
