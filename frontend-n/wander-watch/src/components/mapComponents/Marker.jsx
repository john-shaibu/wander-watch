import {Marker, Popup, useMapEvents} from 'react-leaflet'
import { useState } from 'react'

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
export default CustomMarker