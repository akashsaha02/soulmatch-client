"use client";

import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import FeaturedUsers from "@/components/home/FeaturedUsers";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessCounter from "@/components/home/SuccessCounter";
import Gallery from "@/components/home/Galary";
import SuccessStories from "@/components/home/SuccessStories";
import SoulmatchFAQ from "@/components/home/SoulmatchFAQ";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Services />
      <FeaturedUsers />
      <HowItWorks />
      <SuccessCounter />
      <Gallery />
      <SuccessStories />
      <SoulmatchFAQ />
    </div>
  );
}
