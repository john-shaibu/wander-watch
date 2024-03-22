import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import useLocation from '../hooks/useLocation'
import { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom'
import { useAsync } from '../hooks/useAsync';
import MapLoader from './mapComponents/MapLoader';
import UserLocationInfo from './mapComponents/UserLocationInfo';
import getLocationAdress from './mapComponents/mapDataFetcher';
import CustomMarker from './mapComponents/Marker';
import { useState } from 'react';
import { saveLocation } from '../request';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '../hooks/useMutation';
import { useTimeout } from '../hooks/useTimeout';



function findClosest(point, list) {
  let closestDistance = null;
  let closestPoint = null;
  let closestPointIndex = -1

  for (const index in list) {
    const item = list[index]
    const distance = calculateDistance(point, item);

    // Check if it's the first point or closer than the current closest
    if (closestDistance === null || (distance < closestDistance && distance > 0.0001)) {
      closestDistance = distance;
      closestPoint = item;
      closestPointIndex = index
    }
  }

  return [closestPoint, closestPointIndex];
}

// Function to calculate distance between two points (Haversine formula)
function calculateDistance(point1, point2) {
  const earthRadius = 6371; // kilometers

  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;

  const lat1Rad = point1.lat * Math.PI / 180;
  const lat2Rad = point2.lat * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
           Math.cos(lat1Rad) * Math.cos(lat2Rad) *
           Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

const returnClosestDistance =(locationList, location, field = 'geometry') => {
  const locations = locationList.map((item) => {
    return item[field].location
  })

  const closest = findClosest(location, locations)

  return closest
}

const locationHandler = (locationTitle, location) => {
  let formatted_address = null;

  if (locationTitle != null) {
    const results = locationTitle.results;
    // console.log(results)
    const closestLocation = results[returnClosestDistance(results, location)[1]];

    return closestLocation['address_components'].slice(0, 3).map(( { long_name } ) => {
      return long_name
    }).join(', ')
  }

  return formatted_address
}



const MapContents = () => {
  // Core hooks

  const mapObject = useMap()
  let location = mapObject['_lastCenter'];

  const { value: locationTitle, loading: loadingLocationAddress } = useAsync(getLocationAdress(location?.lng, location?.lat), [location])

  const formatted_address = useMemo(() => locationHandler(locationTitle, location), [locationTitle, location])
  const minsToSeconds = useMemo(() => {
    let mins = 10
     return 1000 * 60 * mins
  }, [])


  // Mutation setter functions
  const saveLocationMutation = useMutation((params, config) => saveLocation(params, config), {
    onSuccess(successData) {
      

    },
    onError(ErrorMessage) {
      // setError(error_message = ErrorMessage.message)

    },
    onSettled({ value, error, retries }) {
    }
  })

  const [,, reset] = useTimeout(() => {
    if (formatted_address && location) saveLocationMutation.mutate({ name: formatted_address, latitude: location?.lat , longitude: location?.lng })
    reset()
  }, minsToSeconds, true, true)


  return <>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <CustomMarker title={formatted_address ?? 'Couldn\'t get location info'} />
    {createPortal(<UserLocationInfo formatted_address={formatted_address ?? 'Couldn\'t get location info'} loading={loadingLocationAddress}  zoomDelta={1} />, document.querySelector('.map-container'))}
  </>
}


const Map = () => {
  // Core hooks
  const [error, location] = useLocation()
  const mapRef = useRef(null)

  return (
    <div className='map-container'>
      {!location ? <MapLoader /> : <MapContainer zoomControl={false} zoom={8} center={{ lng: location.longitude, lat: location.latitude }} ref={mapRef} scrollWheelZoom={false} >
        <MapContents />
      </MapContainer>}
    </div>
  )
}

export default Map