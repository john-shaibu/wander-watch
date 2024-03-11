import React from 'react'
import { LocationIcon, PreciseLocation, ZoomInIcon, ZoomOutIcon } from '../../assets'


const UserLocationInfo = (props) => {
  return (
    <div className="user_location_info">
        <div className="location_info">
            <LocationIcon />
            <b>{props.refined_location_name}</b>
        </div>
        <div className="map_controls">
            <button className="zoom_out">
                <ZoomOutIcon />
            </button>
            <button className="zoom_in">
                <ZoomInIcon />
            </button>
            <button className="go_to_precise_location primary-btn">
                <PreciseLocation />
            </button>
        </div>
    </div>
  )
}

export default UserLocationInfo