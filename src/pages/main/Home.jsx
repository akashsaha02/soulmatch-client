import Banner from '@/components/home/Banner';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessCounter from '@/components/home/SuccessCounter';
import SuccessStories from '@/components/home/SuccessStories';
import FeaturedUsers from '@/components/home/FeaturedUsers';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div className=''>
      <Helmet>
        <title>Home | SoulMatch</title>
      </Helmet>
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
