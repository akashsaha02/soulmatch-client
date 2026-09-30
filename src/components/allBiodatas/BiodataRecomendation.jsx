import useBiodatas from "@/hooks/useBiodatas"
import SectionHeading from "../shared/SectionHeading";
import BiodataCard from "./BiodataCard";

const BiodataRecomendation = ({ type, excludeId }) => {
    const [biodatas] = useBiodatas();

    const similar = biodatas
        .filter((biodata) => biodata.biodataType === type && biodata._id !== excludeId)
        .slice(0, 4);

    if (!similar.length) return null;

    return (
        <section className="container-page pt-20">
            <SectionHeading align="left" eyebrow="You may also like" title="Similar profiles" className="!mb-10" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {similar.map((biodata) => (
                    <BiodataCard biodata={biodata} key={biodata._id} />
                ))}
            </div>
        </section>
    )
}

export default BiodataRecomendation
