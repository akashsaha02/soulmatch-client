import Banner from '@/components/home/Banner';
import Services from '@/components/home/Services';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessCounter from '@/components/home/SuccessCounter';
import SuccessStories from '@/components/home/SuccessStories';
import FeaturedUsers from '@/components/home/FeaturedUsers';
import Gallery from '@/components/home/Galary';
import SoulmatchFAQ from '@/components/home/SoulmatchFAQ';
import CallToAction from '@/components/home/CallToAction';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>SoulMatch — Find your life partner</title>
      </Helmet>
      <Banner />
      <Services />
      <FeaturedUsers />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStories />
      <Gallery />
      <SoulmatchFAQ />
      <CallToAction />
    </>
  )
}

export default Home
