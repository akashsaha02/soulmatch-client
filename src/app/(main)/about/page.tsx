"use client";

import HowItWorks from "@/components/home/HowItWorks";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import aboutImg from "@/assets/tell-us.jpg";
import Link from "next/link";
import team1 from "@/assets/1.jpg";
import team3 from "@/assets/3.jpg";
import team2 from "@/assets/2.jpg";
import missionImg from "@/assets/5.jpg";

const teamMembers = [
  { name: "Jean Smith", role: "Founder & CEO", image: team1, bio: "Passionate about connecting people and fostering meaningful relationships." },
  { name: "Jane Smith", role: "Chief Technology Officer", image: team2, bio: "Loves innovating and bringing cutting-edge technology to life." },
  { name: "Alex Johnson", role: "Lead Designer", image: team3, bio: "Focused on crafting seamless and user-friendly experiences." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="my-10 bg-me-darkOrange/15 rounded-lg">
          <SectionTitleHome heading="About SoulMatch" subHeading="Building Bridges for Meaningful Connections" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <img src={aboutImg.src} alt="About" className="w-full rounded-lg" />
          </div>
          <div>
            <h2 className="cinzel text-xl md:text-3xl font-bold text-me-brown">About SoulMatch</h2>
            <p className="my-4 text-gray-700 lg:text-lg">
              SoulMatch is a trusted matrimonial platform designed to help individuals find their perfect life partners. We understand that marriage is a journey of love, trust, and compatibility, and our platform is tailored to meet diverse cultural and personal preferences.
              With advanced matching tools, verified profiles, and robust privacy features, SoulMatch ensures a safe and seamless experience for its users. Our premium features, such as personalized matchmaking and access to exclusive profiles, make finding your soulmate easier than ever.
              Join SoulMatch today to begin your journey of meaningful connections and create your happily ever after!
            </p>
            <Link href="/biodatas" className="text-white bg-me-teal px-4 py-2 lg:text-lg rounded hover:bg-me-pink mt-2 font-semibold playfair inline-block">
              Explore Now
            </Link>
          </div>
        </div>
        <HowItWorks />
        <div className="space-y-12">
          <SectionTitleHome heading="Meet Our Team" subHeading="The People Behind SoulMatch" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300 text-center">
                <img
                  src={member.image.src}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600 object-cover"
                />
                <h3 className="text-2xl font-semibold text-gray-800 cinzel">{member.name}</h3>
                <p className="text-me-brown text-sm font-medium">{member.role}</p>
                <p className="text-gray-600 mt-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-10 py-12 bg-gray-50">
          <SectionTitleHome heading="Our Mission & Vision" subHeading="Empowering Connections, Building Bridges" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img src={missionImg.src} alt="Mission and Vision" className="w-full rounded-lg shadow-lg object-cover md:max-w-lg" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-me-brown cinzel">Making Meaningful Connections</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to empower individuals to find meaningful connections by leveraging the power of technology and empathy. We envision a world where everyone has the opportunity to build lasting relationships in a safe and inclusive environment.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                At SoulMatch, we believe in creating a platform that bridges gaps, nurtures trust, and celebrates diversity. Together, we can help you discover the bonds that truly matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
