"use client";

import SectionTitleHome from "../shared/SectionTitleHome";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import slide1 from "@/assets/couple1.jpg";
import slide2 from "@/assets/couple2.jpg";
import slide3 from "@/assets/couple3.jpg";
import slide4 from "@/assets/couple6.jpg";
import slide5 from "@/assets/couple7.jpg";
import { LucideUserSearch, School } from "lucide-react";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import { FaRegQuestionCircle } from "react-icons/fa";

const slides = [
  { image: slide1, title: "Find Your Match", description: "Connect with your soulmate.", icon: LucideUserSearch, link: "/biodatas" },
  { image: slide2, title: "Wedding Services", description: "Plan your dream wedding.", icon: School, link: "/about" },
  { image: slide3, title: "Premium Membership", description: "Enjoy exclusive benefits.", icon: IoDiamondOutline, link: "/dashboard/user-home" },
  { image: slide4, title: "Success Stories", description: "Hear from happy couples.", icon: LuCircleCheckBig, link: "/" },
  { image: slide5, title: "FAQs", description: "Get answers to your questions.", icon: FaRegQuestionCircle, link: "/about" },
];

export default function Services() {
  return (
    <div className="pb-16 px-4 max-w-7xl mx-auto">
      <SectionTitleHome heading="Our Services" subHeading="Quick Access" />
      <div className="relative">
        <Swiper
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            440: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          loop
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={slide.image.src}
                alt={slide.title}
                className="w-full h-52 md:h-72 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-black/40 via-black/60 to-black/90 flex flex-col items-center justify-end text-white text-center p-4">
                <slide.icon size={48} />
                <h3 className="text-lg md:text-xl font-bold uppercase cinzel">{slide.title}</h3>
                <p className="mt-2 text-sm md:text-base uppercase">{slide.description}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-me-darkOrange/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href={slide.link}
                  className="bg-white text-black py-2 px-4 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-200 transition playfair"
                >
                  Learn More
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
