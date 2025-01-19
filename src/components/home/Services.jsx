import React from 'react';
import SectionTitleHome from '../shared/SectionTitleHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import slide1 from '../../assets/ban-bg.jpg';
import { School } from 'lucide-react';

const slides = [
    { image: slide1, title: 'Find Your Match', description: 'Connect with your soulmate.', icon: School, link: '/find-match' },
    { image: slide1, title: 'Wedding Services', description: 'Plan your dream wedding.', icon: School, link: '/wedding-services' },
    { image: slide1, title: 'Premium Membership', description: 'Enjoy exclusive benefits.', icon: School, link: '/premium-membership' },
    { image: slide1, title: 'Success Stories', description: 'Hear from happy couples.', icon: School, link: '/success-stories' },
    { image: slide1, title: 'FAQs', description: 'Get answers to your questions.', icon: School, link: '/faqs' },
];

const Services = () => {
    return (
        <div className="pb-16 px-4">
            {/* Section Title */}
            <SectionTitleHome heading="Our Services" subHeading="Quick Access to Matrimonial Solutions" />

            {/* Swiper Container */}
            <div className="relative">
                <Swiper
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        440: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        1400: { slidesPerView: 5, spaceBetween: 25 },
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="group relative overflow-hidden rounded-lg">
                            {/* Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-52 md:h-72 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Content */}
                            <div className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center text-white text-center p-4">
                                <slide.icon className="text-4xl mb-2" />
                                <h3 className="text-lg md:text-xl font-bold uppercase">
                                    {slide.title}
                                </h3>
                                <p className="mt-2 text-sm md:text-base">
                                    {slide.description}
                                </p>
                            </div>

                            {/* Hover Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a
                                    href={slide.link}
                                    className="bg-white text-black py-2 px-4 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-200 transition"
                                >
                                    Learn More
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Services;
