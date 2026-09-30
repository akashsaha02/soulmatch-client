import { Gem, HeartHandshake, Search, UserPlus } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";

const steps = [
    {
        icon: UserPlus,
        title: "Create your profile",
        description: "Sign up free and share your story, background and what you're looking for.",
    },
    {
        icon: Search,
        title: "Discover matches",
        description: "Browse profiles with filters for age, location and profession.",
    },
    {
        icon: HeartHandshake,
        title: "Connect with care",
        description: "Save favourites and request contact details when you're ready.",
    },
    {
        icon: Gem,
        title: "Begin forever",
        description: "Meet, involve your families, and share your success story with us.",
    },
];

const HowItWorks = () => {
    return (
        <section className="section container-page">
            <SectionHeading
                eyebrow="How it works"
                title="Four simple steps to your happily ever after"
            />

            <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {/* connecting line on large screens */}
                <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
                {steps.map((step, i) => (
                    <Reveal as="li" key={step.title} delay={i * 0.1} className="relative flex flex-col items-center text-center">
                        <div className="relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-soft ring-8 ring-background">
                            <step.icon className="h-6 w-6 text-primary" />
                            <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-plum-900 text-[11px] font-semibold text-white">
                                {i + 1}
                            </span>
                        </div>
                        <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
};

export default HowItWorks;
