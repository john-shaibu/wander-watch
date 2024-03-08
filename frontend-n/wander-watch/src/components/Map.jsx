import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LocationIcon, PreciseLocation, ZoomInIcon, ZoomOutIcon } from '../assets'
import useLocation from '../hooks/useLocation'
import { useState } from 'react';

const CustomMarker = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
}

const Map = () => {
  const [err, location] = useLocation()

  return (
    <div className='map-container'>
        {!location ? null : <MapContainer zoom={5} center={[location.longitude, location.latitude]}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker />
        </MapContainer>}
        <div className="user_location_info">
            <div className="location_info">
                <LocationIcon />
                <b>Kenneth Mellanby Hall, UI</b>
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
    </div>
  )
}

export default Map