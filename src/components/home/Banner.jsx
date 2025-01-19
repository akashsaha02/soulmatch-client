import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import slide1 from '../../assets/ban-bg.jpg';

const slides = [
    { image: slide1, title: 'Find Your Match' },
    { image: slide1, title: 'Wedding Services' },
    { image: slide1, title: 'Success Stories' },
    { image: slide1, title: 'Premium Membership' },
    { image: slide1, title: 'FAQs' },
];

const Banner = () => {
    return (
        <div
            className="relative min-h-[70vh] flex justify-center items-center text-white"
        >
            {/* Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60"></div>

            {/* Swiper */}
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                className="relative w-full max-w-[1920px] z-10"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="flex flex-col items-center justify-center min-h-[70vh] bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >

                            <div className="bg-black/60 w-full h-full inset-0"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Main Content */}
            <div className="absolute z-20 text-center px-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    Find Your Perfect Match
                </h1>
                <p className="mt-2 text-lg md:text-2xl">
                    Join the most trusted Matrimonial Brand in the World.
                </p>

                {/* Search Fields */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Name Input */}
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {/* Gender Dropdown */}
                        <select
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {/* Age Input */}
                        <input
                            type="number"
                            placeholder="Enter Age"
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {/* Search Button */}
                    <button
                        className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Search Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
