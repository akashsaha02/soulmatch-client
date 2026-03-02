"use client";

import SectionTitleHome from "../shared/SectionTitleHome";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosPublic } from "@/shared/lib/axios";

interface SuccessStory {
  marriageDate: string;
  coupleImage?: string;
  successStory?: string;
  rating?: number;
  selfDetails?: { name: string; photo?: string };
  partnerDetails?: { name: string; photo?: string };
}

export default function SuccessStories() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosPublic.get("/success-stories");
      if (res.data) setSuccessStories(res.data);
    }
    fetchData();
  }, []);

  const sortedStories = [...successStories].sort(
    (a, b) => new Date(b.marriageDate).getTime() - new Date(a.marriageDate).getTime()
  );
  const data = sortedStories.slice(0, 4);

  return (
    <div className="pb-16 bg-gray-50">
      <SectionTitleHome heading="Success Stories" subHeading="Real Couples, Real Love" />
      <div className="gap-5 max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 mx-auto px-4 sm:px-6 lg:px-8">
        {data.map((story, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform"
          >
            <div className="md:w-1/3">
              <img
                src={story.coupleImage}
                alt={`Couple ${story.selfDetails?.name} & ${story.partnerDetails?.name}`}
                className="w-full h-64 lg:h-72 object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-me-pink playfair">
                  {story.selfDetails?.name?.split(" ")[0]} & {story.partnerDetails?.name?.split(" ")[0]}
                </h3>
                <p className="text-sm text-gray-500">
                  Married on: {new Date(story.marriageDate).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {story.successStory}
              </p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-yellow-400 ${(story.rating ?? 0) / 2 > i ? "filled" : "opacity-30"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                {story.selfDetails?.photo && (
                  <img
                    src={story.selfDetails.photo}
                    alt={story.selfDetails.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                )}
                {story.partnerDetails?.photo && (
                  <img
                    src={story.partnerDetails.photo}
                    alt={story.partnerDetails.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
