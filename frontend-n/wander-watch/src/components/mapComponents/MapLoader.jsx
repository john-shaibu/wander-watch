import React from 'react'
import { Spinner } from '../../assets'

const MapLoader = () => {
  return (
    <div className='map_loader'>
        <Spinner />
        <b>Trying to get your location...</b>
    </div>
  )
}

export default MapLoader