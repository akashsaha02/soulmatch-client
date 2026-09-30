import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import Reveal from "../shared/Reveal";

const SuccessCounter = () => {
    const { data: stats } = useQuery({
        queryKey: ["biodata-stats"],
        queryFn: async () => (await axiosPublic.get("/biodatas/stats")).data,
    });

    const counters = [
        { value: stats?.total, label: "Profiles on SoulMatch" },
        { value: stats?.female, label: "Brides looking" },
        { value: stats?.male, label: "Grooms looking" },
        { value: stats?.marriages, label: "Happy marriages" },
    ];

    return (
        <section className="bg-plum-950 py-20 text-white md:py-24">
            <div className="container-page">
                <Reveal className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="eyebrow !text-gold-300">In numbers</p>
                    <h2 className="mt-3 text-3xl font-light md:text-5xl">
                        Love, <em className="text-gold-200">measured</em> in stories
                    </h2>
                </Reveal>
                <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
                    {counters.map((c, i) => (
                        <Reveal key={c.label} delay={i * 0.08} className="flex flex-col items-center border-white/10 text-center lg:border-l lg:first:border-l-0">
                            <dt className="order-2 mt-2 text-sm text-plum-300">{c.label}</dt>
                            <dd className="order-1 font-display text-5xl font-light tabular-nums md:text-6xl">
                                {typeof c.value === "number" ? (
                                    <CountUp end={c.value} duration={2.2} separator="," enableScrollSpy scrollSpyOnce />
                                ) : (
                                    "—"
                                )}
                            </dd>
                        </Reveal>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default SuccessCounter;
