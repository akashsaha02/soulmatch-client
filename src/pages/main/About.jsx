import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import HowItWorks from "@/components/home/HowItWorks";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import aboutImg from '../../assets/tell-us.jpg'
import missionImg from '../../assets/5.jpg'
import team1 from '../../assets/1.jpg'
import team2 from '../../assets/2.jpg'
import team3 from '../../assets/3.jpg'

const teamMembers = [
    { name: "Jean Smith", role: "Founder & CEO", image: team1, bio: "Passionate about connecting people and fostering meaningful relationships." },
    { name: "Jane Smith", role: "Chief Technology Officer", image: team2, bio: "Loves innovating and bringing cutting-edge technology to life." },
    { name: "Alex Johnson", role: "Lead Designer", image: team3, bio: "Focused on crafting seamless and user-friendly experiences." },
];

const values = [
    { icon: ShieldCheck, title: "Privacy first", text: "Contact details stay hidden until you choose to share them." },
    { icon: HeartHandshake, title: "Family friendly", text: "Profiles built around values, traditions and family background." },
    { icon: Sparkles, title: "Genuine members", text: "Profiles are reviewed and premium members are approved by our team." },
];

const About = () => {
    return (
        <div>
            <Helmet>
                <title>About | SoulMatch</title>
            </Helmet>
            <PageHeader
                eyebrow="About us"
                title={<>Building bridges for <em className="text-primary">meaningful</em> connections</>}
            />

            <section className="container-page grid items-center gap-12 pb-20 lg:grid-cols-2">
                <Reveal>
                    <img src={aboutImg} alt="A couple smiling together" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
                </Reveal>
                <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                    <p>
                        SoulMatch is a trusted matrimonial platform designed to help individuals find their perfect life partners. We understand that marriage is a journey of love, trust and compatibility, and our platform is tailored to diverse cultural and personal preferences.
                    </p>
                    <p>
                        With thoughtful search tools, reviewed profiles and strong privacy features, SoulMatch keeps the experience safe and simple — so you can focus on the person, not the process.
                    </p>
                    <Button asChild size="lg" className="mt-2">
                        <Link to="/biodatas">Explore profiles <ArrowRight /></Link>
                    </Button>
                </Reveal>
            </section>

            <section className="bg-secondary/40 py-20">
                <div className="container-page grid gap-6 md:grid-cols-3">
                    {values.map((v, i) => (
                        <Reveal key={v.title} delay={i * 0.08} className="rounded-3xl bg-card p-8 shadow-soft">
                            <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary"><v.icon className="h-5 w-5 text-primary" /></span>
                            <h3 className="mt-5 text-xl font-medium">{v.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            <HowItWorks />

            <section className="section bg-plum-950 text-white">
                <div className="container-page grid items-center gap-12 lg:grid-cols-2">
                    <Reveal className="space-y-5">
                        <p className="eyebrow !text-gold-300">Our mission</p>
                        <h2 className="text-3xl font-light md:text-5xl">Making <em className="text-gold-200">meaningful</em> connections</h2>
                        <p className="text-lg leading-relaxed text-plum-200">
                            Our mission is to empower people to find lasting relationships through technology and empathy. We envision a world where everyone can build a life together in a safe and inclusive environment.
                        </p>
                        <p className="text-lg leading-relaxed text-plum-200">
                            We believe in a platform that bridges gaps, nurtures trust and celebrates diversity — helping you discover the bonds that truly matter.
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <img src={missionImg} alt="Wedding celebration" className="aspect-square w-full rounded-[2rem] object-cover" />
                    </Reveal>
                </div>
            </section>

            <section className="section container-page">
                <SectionHeading eyebrow="Our team" title="The people behind SoulMatch" />
                <div className="grid gap-6 md:grid-cols-3">
                    {teamMembers.map((member, i) => (
                        <Reveal key={member.name} delay={i * 0.08} className="group overflow-hidden rounded-3xl bg-card shadow-soft">
                            <div className="aspect-[4/3] overflow-hidden">
                                <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-medium">{member.name}</h3>
                                <p className="text-sm font-medium text-primary">{member.role}</p>
                                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
