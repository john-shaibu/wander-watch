import React, { useState } from 'react'
import { LocationIcon, PreciseLocation, ZoomInIcon, ZoomOutIcon } from '../../assets'
import { useMap } from 'react-leaflet';


const UserLocationInfo = (props) => {
   const mapObject = useMap()
   const { zoomDelta = 1 } = props

    function zoomIn(e){
        e.stopPropagation()
        mapObject.zoomIn(zoomDelta)
    }

    function zoomOut(e){
        e.stopPropagation()
        mapObject.zoomOut(zoomDelta)
    }

    function getPreciseLocation(e){
        e.stopPropagation()
        mapObject.flyTo(mapObject['_lastCenter'], 18)
    }

  return (
    <div className="user_location_info">
        <div className="location_info">
            <LocationIcon />
            <b>{props.refined_location_name}</b>
        </div>
        <div className="map_controls">
            <button className="zoom_out" onClick={zoomOut} >
                <ZoomOutIcon />
            </button>
            <button className="zoom_in" onClick={zoomIn}>
                <ZoomInIcon />
            </button>
            <button className="go_to_precise_location primary-btn" onClick={getPreciseLocation}>
                <PreciseLocation />
            </button>
        </div>
    </div>
  )
}

export default UserLocationInfo