import useFavourites from '@/hooks/useFavourites';
import React from 'react'

const MyFavourites = () => {

  const [favourites, refetch] = useFavourites();
  return (
    <div>MyFavourites</div>
    
  )
}

export default MyFavourites