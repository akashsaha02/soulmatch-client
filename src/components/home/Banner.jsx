import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DIVISIONS } from "@/lib/biodata";
import heroImg from "../../assets/ban-bg.jpg";

const AGES = Array.from({ length: 33 }, (_, i) => 18 + i); // 18–50

const trust = [
    { icon: Users, text: "Thousands of members" },
    { icon: ShieldCheck, text: "Verified profiles" },
    { icon: Sparkles, text: "Private & secure" },
];

const Banner = () => {
    const navigate = useNavigate();
    const reduce = useReducedMotion();
    const [search, setSearch] = useState({ gender: "any", minAge: "21", maxAge: "35", division: "any" });

    const update = (key) => (value) => setSearch((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search.gender !== "any") params.set("gender", search.gender);
        if (search.division !== "any") params.set("division", search.division);
        params.set("minAge", search.minAge);
        params.set("maxAge", search.maxAge);
        navigate(`/biodatas?${params.toString()}`);
    };

    const fadeUp = (delay) =>
        reduce
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
            };

    return (
        <section className="relative">
            <div className="relative flex min-h-[92svh] items-end overflow-hidden pb-40 pt-32 md:pb-44">
                <motion.img
                    src={heroImg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
                    initial={reduce ? false : { scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 bg-gradient-to-r from-plum-950/60 via-transparent to-transparent" />

                <div className="container-page relative text-white">
                    <motion.p {...fadeUp(0.1)} className="eyebrow !text-gold-200">
                        The #1 trusted matrimony platform
                    </motion.p>
                    <motion.h1
                        {...fadeUp(0.2)}
                        className="mt-5 max-w-3xl text-balance text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl"
                    >
                        Where two stories become <em className="font-normal text-gold-200">one.</em>
                    </motion.h1>
                    <motion.p {...fadeUp(0.35)} className="mt-6 max-w-xl text-lg text-white/80">
                        Meet people who share your values, family traditions and dreams — and take the first step toward a lifetime together.
                    </motion.p>
                    <motion.ul {...fadeUp(0.5)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                        {trust.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-gold-200" /> {text}
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>

            {/* Search card overlaps the bottom edge of the hero */}
            <div className="container-page relative z-10 -mt-28">
                <motion.form
                    {...fadeUp(0.6)}
                    onSubmit={handleSubmit}
                    aria-label="Find a match"
                    className="grid gap-4 rounded-3xl border border-border/60 bg-white p-5 shadow-lift sm:grid-cols-2 md:p-6 lg:grid-cols-[1fr_1.3fr_1fr_auto] lg:items-end"
                >
                    <div className="space-y-2">
                        <Label htmlFor="hero-gender">I&apos;m looking for</Label>
                        <Select value={search.gender} onValueChange={update("gender")}>
                            <SelectTrigger id="hero-gender"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Anyone</SelectItem>
                                <SelectItem value="Female">A bride</SelectItem>
                                <SelectItem value="Male">A groom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label id="hero-age-label">Aged</Label>
                        <div className="flex items-center gap-2" role="group" aria-labelledby="hero-age-label">
                            <Select value={search.minAge} onValueChange={update("minAge")}>
                                <SelectTrigger aria-label="Minimum age"><SelectValue /></SelectTrigger>
                                <SelectContent className="max-h-64">
                                    {AGES.filter((a) => a <= Number(search.maxAge)).map((a) => (
                                        <SelectItem key={a} value={String(a)}>{a}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">to</span>
                            <Select value={search.maxAge} onValueChange={update("maxAge")}>
                                <SelectTrigger aria-label="Maximum age"><SelectValue /></SelectTrigger>
                                <SelectContent className="max-h-64">
                                    {AGES.filter((a) => a >= Number(search.minAge)).map((a) => (
                                        <SelectItem key={a} value={String(a)}>{a}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hero-division">Living in</Label>
                        <Select value={search.division} onValueChange={update("division")}>
                            <SelectTrigger id="hero-division"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any division</SelectItem>
                                {DIVISIONS.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" size="lg" className="h-11 sm:col-span-2 lg:col-span-1">
                        <Search /> Find matches
                    </Button>
                </motion.form>
            </div>
        </section>
    );
};

export default Banner;
