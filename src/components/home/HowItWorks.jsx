import React from "react";
import SectionTitleHome from "../shared/SectionTitleHome";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
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

            {/* Timeline */}
            <VerticalTimeline>
                {steps.map((step, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: "#fff", color: "#333" }}
                        contentArrowStyle={{ borderRight: "7px solid #4f46e5" }}
                        iconStyle={{ background: "#4f46e5", color: "#fff" }}
                        icon={<step.icon />}
                    >
                        <h3 className="vertical-timeline-element-title text-xl font-bold">
                            {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
};

export default HowItWorks;
