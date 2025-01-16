import React from 'react'
import SectionTitleHome from '../shared/SectionTitleHome'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import slide1 from '../../assets/ban-bg.jpg';
import { School } from 'lucide-react';

const slides = [
    { image: slide1, title: 'Salads', icon: School },
    { image: slide1, title: 'Pizzas', icon: School },
    { image: slide1, title: 'Soups', icon: School },
    { image: slide1, title: 'Desserts', icon: School },
    { image: slide1, title: 'Salads', icon: School },
    { image: slide1, title: 'Salads', icon: School },
    { image: slide1, title: 'Salads', icon: School },
    { image: slide1, title: 'Salads', icon: School },
    { image: slide1, title: 'Salads', icon: School },
];


const Services = () => {
    return (
        <div>
            <div style={{ backgroundImage: `url(${slide1})` }} className='min-h-[70vh] bg-cover bg-center bg-no-repeat '>
            <SectionTitleHome />

                
                <Swiper
                    // slidesPerView={2}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    // spaceBetween={10}
                    breakpoints={{
                        440: { slidesPerView: 3, spaceBetween: 10 },
                        900: { slidesPerView: 4, spaceBetween: 10 },
                        1400: { slidesPerView: 5, spaceBetween: 10 },
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
                        <SwiperSlide key={index} className="relative text-center">
                            <img src={slide.image} alt={slide.title} className="w-full rounded h-52 md:h-72 object-cover" />
                            <div className='absolute inset-0 bg-black/50 '> </div>
                            <h3 className="absolute cinzel bottom-8 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl lg:text-4xl uppercase text-white backdrop:blur-lg py-2 px-6 rounded">
                                {slide.title}
                                <div className="">
                                    <slide.icon />
                                </div>


                            </h3>

                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

        </div>
    )
}

export default Services
