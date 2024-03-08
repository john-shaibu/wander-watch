import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LocationIcon, PreciseLocation, ZoomInIcon, ZoomOutIcon } from '../assets'
import useLocation from '../hooks/useLocation'
import { useEffect, useRef, useState } from 'react';

const CustomMarker = ({ title = '' }) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
        map.zoomIn(5)
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
    console.log(position)
    return position === null ? null : (
        <Marker position={position}>
          <Popup>{title}</Popup>
        </Marker>
      )
}

const Map = () => {
  const [err, location] = useLocation()
  const mapRef = useRef(null)
  console.log(location);
  const locationTitle = 'Kenneth Mellanby Hall, UI'

  useEffect(() => {
    if (location && mapRef.current) { 
        mapRef.current._container.click() 
        mapRef.current._container.click() 
    }
  }, [location, mapRef])

  return (
    <div className='map-container'>
        {!location ? null : <MapContainer zoom={8} center={{lng: location.longitude, lat: location.latitude}} ref={mapRef}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker title={locationTitle}/>
        </MapContainer>}
        <div className="user_location_info">
            <div className="location_info">
                <LocationIcon />
                <b>{locationTitle}</b>
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