import useBiodatas from '@/hooks/useBiodatas'
import { Loader } from 'lucide-react'
import React from 'react'
import SectionTitleHome from './../../components/shared/SectionTitleHome';

const AllBiodatas = () => {


  const [biodatas, loading, myBiodata] = useBiodatas()

  if (loading) return <Loader />
  
  return (
    <div>

      <div className="">
        <SectionTitleHome />
      </div>

      <div className="">
        {biodatas.length}
      </div>




    </div>
  )
}

export default AllBiodatas
