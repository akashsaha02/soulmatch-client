import { Button } from '@/components/ui/button'
import SectionTitleHome from './../../components/shared/SectionTitleHome';
import Banner from '@/components/home/Banner';
import Services from '@/components/home/Services';

const Home = () => {
  return (
    <div className=''>
      <Banner/>
      <Services/>
      <SectionTitleHome />
    </div>
  )
}

export default Home
