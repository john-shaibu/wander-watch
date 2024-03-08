import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'

const options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 2,
  };
  

const useLocation = () => {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    const success = (pos) => {
        const crd = pos.coords;
      
       setLocation({
            longitude: crd.longitude,
            latitude: crd.latitude,
            accuracy: crd.accuracy,
       })
    }
      

    useLayoutEffect(() => {
        const id = navigator.geolocation.watchPosition(success, setError, options);

        return () => {
            navigator.geolocation.clearWatch(id)
        }
    }, [])

    return [error, location]
}

export default useLocation