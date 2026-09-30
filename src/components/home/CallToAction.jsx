import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Reveal from "../shared/Reveal";
import useAuth from "@/hooks/useAuth";
import ctaImg from "../../assets/couple5.jpg";

const CallToAction = () => {
    const { user } = useAuth();

    return (
        <section className="container-page pb-20 md:pb-28">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-plum-900 px-6 py-16 text-center text-white sm:px-12 md:py-24">
                <img src={ctaImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-plum-900/80 to-plum-950/90" />
                <div className="relative mx-auto max-w-2xl">
                    <h2 className="text-balance text-4xl font-light leading-tight md:text-6xl">
                        Your story is waiting to <em className="text-gold-200">begin.</em>
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-white/80">
                        Join thousands of members who found love on SoulMatch. Creating a profile takes less than five minutes.
                    </p>
                    <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button asChild size="lg" className="bg-white text-plum-950 hover:bg-white/90">
                            <Link to={user ? "/dashboard/manage-biodata" : "/register"}>
                                {user ? "Complete your biodata" : "Create free profile"} <ArrowRight />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                            <Link to="/biodatas">Browse profiles</Link>
                        </Button>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default CallToAction;
