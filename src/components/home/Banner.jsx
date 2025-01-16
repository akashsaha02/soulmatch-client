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

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${slide1})` }} className='min-h-[70vh] bg-cover bg-center bg-no-repeat '>

            <h1 className="">Find your
                Right Match here
                Most trusted Matrimony Brand in the World.</h1>
         

        </div>
    )
}

export default Banner
