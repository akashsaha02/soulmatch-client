import { useEffect, useState } from "react";
import CountUp from "react-countup";
import SectionTitleHome from "../shared/SectionTitleHome";
import useBiodatas from "@/hooks/useBiodatas";
import { axiosPublic } from "@/hooks/useAxiosPublic";
import maleImg from '../../assets/icons/male.png'
import femaleImg from '../../assets/icons/woman.png'
import successImg from '../../assets/icons/marrige.png'

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
            icon: femaleImg,
            count: femaleBiodataCount,
            label: "Girls' Profiles",
            color: "text-pink-500",
        },
        {
            icon: maleImg,
            count: maleBiodataCount,
            label: "Boys' Profiles",
            color: "text-blue-500",
        },
        {
            icon: successImg,
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
                            {/* Image */}
                            <img src={counter.icon} className="w-20 pb-4" alt=""/>
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
