import { Link } from 'react-router-dom';
import { ArrowUpRight, Crown, HeartHandshake, MessageCircleHeart, UserSearch } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import { cn } from '@/lib/utils';

import img1 from '../../assets/couple1.jpg';
import img2 from '../../assets/couple2.jpg';
import img3 from '../../assets/couple3.jpg';
import img4 from '../../assets/couple6.jpg';

const services = [
    {
        image: img1,
        icon: UserSearch,
        title: 'Find your match',
        description: 'Filter by age, location and profession to meet people who fit your life.',
        link: '/biodatas',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        image: img2,
        icon: Crown,
        title: 'Premium membership',
        description: 'Stand out and unlock contact details.',
        link: '/dashboard/user-home',
    },
    {
        image: img3,
        icon: MessageCircleHeart,
        title: 'Success stories',
        description: 'Hear from couples who met here.',
        link: '/#stories',
    },
    {
        image: img4,
        icon: HeartHandshake,
        title: 'Personal support',
        description: 'Our team is here whenever you need a hand.',
        link: '/contact',
        className: 'md:col-span-2',
    },
];

const Services = () => {
    return (
        <section className="section container-page">
            <SectionHeading
                eyebrow="What we offer"
                title={<>Everything you need to <em className="text-primary">find the one</em></>}
                lead="Thoughtful tools that respect your time, your privacy and your family's traditions."
            />

            <div className="grid auto-rows-[260px] gap-4 md:grid-cols-4 md:auto-rows-[240px]">
                {services.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.08} className={cn('h-full', s.className)}>
                        <Link
                            to={s.link}
                            className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl p-6 text-white shadow-soft"
                        >
                            <img
                                src={s.image}
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/30 to-transparent" />
                            <div className="relative">
                                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-md">
                                    <s.icon className="h-5 w-5" />
                                </span>
                                <h3 className="text-2xl font-medium">{s.title}</h3>
                                <p className="mt-1 max-w-sm text-sm text-white/80">{s.description}</p>
                            </div>
                            <ArrowUpRight className="absolute right-6 top-6 h-6 w-6 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                        </Link>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default Services;
