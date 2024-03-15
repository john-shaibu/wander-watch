import {Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'

const CustomMarker = ({ title = '' }) => {
    const [position, setPosition] = useState(null)
    const mapObject = useMap();
    
    useEffect(() => {
      setPosition(mapObject['_lastCenter'])
      mapObject.flyTo(mapObject['_lastCenter'])
      mapObject.zoomIn(8)
      mapObject.locate()
    }, [])

    useMapEvents({
      click(){
      }, 
      locationfound(e) {
        setPosition(e.latlng)
        mapObject.flyTo(e.latlng, mapObject.getZoom())
      },
    })

    return position === null ? null : (
        <Marker position={position}>
          <Popup>{title}</Popup>
        </Marker>
      )
}
export default CustomMarker