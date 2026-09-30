import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const firstName = (name = "") => name.split(" ")[0];

const SuccessStories = () => {
    const { data: stories = [], isLoading } = useQuery({
        queryKey: ["success-stories"],
        queryFn: async () => (await axiosPublic.get("/success-stories")).data,
    });

    // Most recent marriages first
    const data = [...stories]
        .sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate))
        .slice(0, 4);

    if (!isLoading && data.length === 0) return null;

    return (
        <section id="stories" className="section scroll-mt-20 bg-rose-glow">
            <div className="container-page">
                <SectionHeading
                    eyebrow="Success stories"
                    title={<>Real couples, <em className="text-primary">real love</em></>}
                    lead="Every week, new couples tell us how they found each other on SoulMatch."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    {isLoading
                        ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-3xl" />)
                        : data.map((story, i) => (
                            <Reveal key={story._id || i} delay={(i % 2) * 0.1}>
                                <figure className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft sm:flex-row">
                                    <img
                                        src={story.coupleImage}
                                        alt={`${story.selfDetails?.name} and ${story.partnerDetails?.name}`}
                                        loading="lazy"
                                        className="h-64 w-full object-cover sm:h-auto sm:w-2/5"
                                    />
                                    <div className="flex flex-1 flex-col p-7">
                                        <Quote className="h-8 w-8 text-primary/25" />
                                        <blockquote className="mt-3 line-clamp-5 flex-1 font-display text-lg leading-relaxed text-foreground/90">
                                            {story.successStory}
                                        </blockquote>
                                        <div className="mt-5 flex items-center gap-1" aria-label={`Rated ${Math.round(story.rating / 2)} out of 5`}>
                                            {Array.from({ length: 5 }).map((_, s) => (
                                                <Star
                                                    key={s}
                                                    className={cn("h-4 w-4", s < Math.round(story.rating / 2) ? "fill-gold-400 text-gold-400" : "text-border")}
                                                />
                                            ))}
                                        </div>
                                        <figcaption className="mt-4 flex items-center gap-3 border-t pt-4">
                                            <div className="flex -space-x-3">
                                                <img src={story.selfDetails?.photo} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
                                                <img src={story.partnerDetails?.photo} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {firstName(story.selfDetails?.name)} & {firstName(story.partnerDetails?.name)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Married {new Date(story.marriageDate).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                                                </p>
                                            </div>
                                        </figcaption>
                                    </div>
                                </figure>
                            </Reveal>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
