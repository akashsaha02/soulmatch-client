import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaFemale, FaMale, FaRing } from "react-icons/fa";
import SectionTitleHome from "../shared/SectionTitleHome";
import useBiodatas from "@/hooks/useBiodatas";
import { axiosPublic } from "@/hooks/useAxiosPublic";

const SuccessCounter = () => {

    const [biodatas] = useBiodatas();
    const [successStories, setSuccessStories] = useState([]); // State to store success stories
    useEffect(() => {
        async function fetchData() {
            const res = await axiosPublic.get("/success-stories");
            if (res.data) {
                setSuccessStories(res.data);
            }
        }
        fetchData();
    }, []);

    const maleBiodataCount = biodatas.filter(biodata => biodata.biodataType == 'Male').length;
    const femaleBiodataCount = biodatas.filter(biodata => biodata.biodataType == 'Female').length;
    const counters = [
        {
            icon: FaFemale,
            count: femaleBiodataCount,
            label: "Girls' Profiles",
            color: "text-pink-500",
        },
        {
            icon: FaMale,
            count: maleBiodataCount,
            label: "Boys' Profiles",
            color: "text-blue-500",
        },
        {
            icon: FaRing,
            count: successStories.length,
            label: "Successful Marriages",
            color: "text-green-500",
        },
    ];

    return (
        <div className=" py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <SectionTitleHome heading="Our Success" subHeading="Numbers Speak" />

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {counters.map((counter, index) => (
                        <div
                            key={index}
                            className=" p-6 flex flex-col items-center border border-me-brown "
                        >
                            {/* Icon */}
                            <counter.icon className={`text-5xl mb-4 ${counter.color}`} />
                            {/* Count with animation */}
                            <h3 className="text-4xl font-bold text-me-brown mb-2 cinzel">
                                <CountUp
                                    start={0}
                                    end={counter.count}
                                    duration={2.5}
                                    separator=","
                                />
                            </h3>
                            {/* Label */}
                            <p className="text-me-brown uppercase">{counter.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessCounter;
