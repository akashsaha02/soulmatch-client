import useBiodatas from "@/hooks/useBiodatas"
import SectionTitleHome from "../shared/SectionTitleHome";
import BiodataCard from "./BiodataCard";

const BiodataRecomendation = ({ type }) => {
    const [biodatas, loading] = useBiodatas();

    const filteredBiodatas = biodatas.filter(biodata => biodata.biodataType === type).slice(0, 3);

    return (
        <div className="max-w-6xl px-6 mx-auto">

            <SectionTitleHome heading="Recomended Biodatas" subHeading="Explore similar biodatas" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBiodatas.map((biodata) => (
                    <BiodataCard biodata={biodata} key={biodata._id} />
                ))}
            </div>

        </div>
    )
}

export default BiodataRecomendation
