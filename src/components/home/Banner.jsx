import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import slide1 from '../../assets/ban-bg.jpg';
import slide2 from '../../assets/banner.jpg';

const slides = [
    { image: slide1, },
    { image: slide2, },
];

const Banner = () => {
    return (
        <div
            className="relative min-h-[80vh] flex justify-center items-center text-white"
        >
            {/* Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>

            {/* Swiper */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                className="relative w-full max-w-[1920px] z-10"
            >
                {slides.map((slide, index) => (

                    <SwiperSlide key={index}>
                        <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
                            {/* Zoom-in effect with Framer Motion */}
                            <motion.div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                                animate={{ scale: [1, 1.4, 1] }} // Scale animation loop
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            ></motion.div>

                            {/* Black Overlay */}
                            <div className="absolute inset-0 bg-black/70"></div>

                            {/* Content on top of the overlay */}
                            <div className="relative z-10 text-center text-white">
                                <h2 className="text-4xl font-bold">{slide.title}</h2>
                            </div>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>

            {/* Main Content */}
            <div className="absolute z-20 text-center px-6">
                <p className='playfair text-xl uppercase'><span className="text-4xl">#1</span> Matrimony</p>
                <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-10 playfair">
                    Find your<br />
                    <span className="text-me-red">Right Match</span> here
                </h1>
                <p className="mt-2 md:text-xl">
                    Most trusted Matrimony Brand in the World.
                </p>

                {/* Search Fields */}
                <div className="mt-8 bg-black/30 backdrop-blur-sm p-4 rounded-lg shadow-lg text-black w-full max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {/* Name Input */}
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="border border-gray-300 p-3 font-bold text-me-brown placeholder:font-bold placeholder:text-me-brown rounded focus:outline-none focus:ring-2 focus:ring-me-orange"
                        />
                        {/* Gender Dropdown */}
                        <select
                            className="border border-gray-300 p-3 font-bold text-me-brown rounded placeholder:font-bold placeholder:text-me-brown focus:outline-none focus:ring-2 focus:ring-me-orange"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {/* Age Input */}
                        <input
                            type="number"
                            placeholder="Enter Age"
                            className="border border-gray-300 p-3 font-bold text-me-brown rounded placeholder:font-bold placeholder:text-me-brown focus:outline-none focus:ring-2 focus:ring-me-orange"
                        />
                        <button
                            className="w-full bg-me-teal text-white py-3 rounded hover:bg-me-pink font-bold transition duration-200 uppercase"
                        >
                            Search Now
                        </button>
                    </div>
                    {/* Search Button */}

                </div>
            </div>
        </div>
    );
};

export default Banner;
