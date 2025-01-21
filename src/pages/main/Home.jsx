import Banner from '@/components/home/Banner';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessCounter from '@/components/home/SuccessCounter';
import SuccessStories from '@/components/home/SuccessStories';
import FeaturedUsers from '@/components/home/FeaturedUsers';

const Home = () => {
  return (
    <div className=''>
      <Banner />
      <Services />
      <FeaturedUsers />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStories />
    </div>
  )
}

export default Home
