import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks' 
import {Marker, Popup} from 'react-leaflet'

const Map = () => {
    const position = [51.505, -0.09]
  return (
    <div className='map-container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </div>
  )
}

export default Map