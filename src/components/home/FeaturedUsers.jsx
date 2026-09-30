import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useBiodatas from '@/hooks/useBiodatas';
import SectionHeading from '../shared/SectionHeading';
import BiodataCard, { BiodataCardSkeleton } from '../allBiodatas/BiodataCard';
import { Button } from '../ui/button';

const FeaturedUsers = () => {
    const [biodatas, loading] = useBiodatas();
    const scroller = useRef(null);

    const premiumUsers = biodatas.filter((b) => b.isPremium === true).slice(0, 8);

    const scrollBy = (dir) => {
        const el = scroller.current;
        if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    if (!loading && premiumUsers.length === 0) return null;

    return (
        <section className="section overflow-hidden bg-secondary/40">
            <div className="container-page">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading
                        align="left"
                        className="!mb-0"
                        eyebrow="Featured members"
                        title="Meet our premium members"
                        lead="Verified members who've gone premium to find their partner faster."
                    />
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" aria-label="Scroll left" onClick={() => scrollBy(-1)}><ArrowLeft /></Button>
                        <Button variant="outline" size="icon" aria-label="Scroll right" onClick={() => scrollBy(1)}><ArrowRight /></Button>
                    </div>
                </div>

                <div
                    ref={scroller}
                    className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
                >
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-15px)]"><BiodataCardSkeleton /></div>
                        ))
                        : premiumUsers.map((biodata) => (
                            <div key={biodata._id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-15px)]">
                                <BiodataCard biodata={biodata} />
                            </div>
                        ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <Button asChild size="lg" variant="secondary">
                        <Link to="/biodatas">Browse all profiles <ArrowRight /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedUsers;
