import SectionTitleHome from "../shared/SectionTitleHome";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaUserPlus, FaUserEdit, FaSearch, FaHeart, FaCrown, FaUserCheck } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { GiBigDiamondRing } from "react-icons/gi";

const steps = [
  { icon: FaUserPlus, title: "Register for Free", description: "Sign up for free and create your basic profile to get started." },
  { icon: FaUserEdit, title: "Create Your Profile", description: "Add personal details, preferences, and photos to showcase yourself." },
  { icon: FaSearch, title: "Search for Matches", description: "Browse through thousands of profiles to find your perfect match." },
  { icon: FaHeart, title: "Express Interest", description: "Send interest requests to profiles you like and start a conversation." },
  { icon: FaUserCheck, title: "Get Profile Information", description: "Get detailed information about the biodata you are interested in." },
  { icon: HiUsers, title: "Start Meetups", description: "Start meeting up with the biodata you are interested in." },
  { icon: GiBigDiamondRing, title: "Get Married", description: "Get married to the biodata you are interested in." },
  { icon: FaCrown, title: "Upgrade to Premium", description: "Enjoy exclusive benefits like priority visibility and direct messaging." },
];

export default function HowItWorks() {
  return (
    <div>
      <SectionTitleHome heading="How It Works" subHeading="Simple Steps" />
      <VerticalTimeline lineColor="#66451c">
        {steps.map((step, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#fff", color: "#333", border: "1px solid #c48c46" }}
            contentArrowStyle={{ borderRight: "7px solid #c48c46" }}
            iconStyle={{ background: "#f6af04", color: "#fff" }}
            icon={<step.icon />}
          >
            <h3 className="vertical-timeline-element-title text-me-darkOrange text-xl md:text-2xl font-bold playfair">
              {step.title}
            </h3>
            <p className="text-gray-800 uppercase text-sm md:text-md">{step.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
