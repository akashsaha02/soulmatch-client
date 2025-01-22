import useBiodatas from '@/hooks/useBiodatas'
import SectionTitleHome from '../shared/SectionTitleHome';
import BiodataCard from '../allBiodatas/BiodataCard';

const FeaturedUsers = () => {

    const [biodatas, loading, myBiodata] = useBiodatas();

    const premiumUsers = biodatas.filter(biodata => biodata.isPremium === true).slice(0, 6);

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <SectionTitleHome heading="Featured Users" subHeading="Our Premium Members" />
            <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {premiumUsers.map((biodata, index) => (
                    <BiodataCard key={index} biodata={biodata} />))}
            </div>

        </div>
    )
}

export default FeaturedUsers
