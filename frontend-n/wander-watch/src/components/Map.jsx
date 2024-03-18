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



const locationHandler = (locationTitle) => {
  let Street_no = '';
  let street_name = '';
  let city = '';
  let state = '';
  let country = ''
  let formatted_address = '';

  if (locationTitle != null) {
    const results = locationTitle.results;

    if (results[0]) {
      let address_components = results[0].address_components;

      for (var i = 0; i < address_components.length; i++) {
        if (address_components[i].types[0] === "street_number") {
          Street_no = address_components[i].long_name;
        }
        if (address_components[i].types[0] === "neighborhood"  || address_components[i].types[0] === "premise" || address_components[i].types[0] === "plus_code" || address_components[i].types[0] === "route") {
          street_name = address_components[i].long_name;
        }
        if (address_components[i].types[0] === "administrative_area_level_1" && address_components[i].types[1] === "political") {
          state = address_components[i].long_name;
        }
        if (address_components[i].types[0] === "locality" && address_components[i].types[1] === "political") {
          city = address_components[i].long_name;
        }

        if (address_components[i].types[0] === "country") {
          country = address_components[i].long_name;

        }
      }

      formatted_address = `${!Street_no ? '' : Street_no + ', '}${street_name}, ${city}, ${state}, ${country}`
      return formatted_address
    }
  } else {
    return
  }
}


const Map = () => {
  const [error, location] = useLocation()
  const mapRef = useRef(null)
  const saveLocationMutation = useMutation((params, config) => saveLocation(params, config), {
    onSuccess(successData) {
      console.log(successData);

    },
    onError(ErrorMessage) {
      // setError(error_message = ErrorMessage.message)

      console.log(ErrorMessage.message);
    },
    onSettled({ value, error, retries }) {
      console.log(retries);
    }
  })

  let navigate = useNavigate()

  const [address, setAddress] = useState();

  const { loading: loadingLocation, value: locationTitle, error: locationError } = useAsync(getLocationAdress(location?.longitude, location?.latitude), [location])
  const locationFallback = 'omo!'

  const formatted_address = useMemo(() => locationHandler(locationTitle), [locationTitle])

  console.log(
    locationTitle
  );
  useEffect(() => {
    let intervalId;
    if (location) {
      intervalId = setInterval(() => {
        saveLocationMutation.mutate({ longitude: location?.longitude, latitude: location?.latitude, name: formatted_address })
      }, 1000 * 60 * 10)
      
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [location])





  return (
    <div className='map-container'>
      {!location ? <MapLoader /> : <MapContainer zoomControl={false} zoom={8} center={{ lng: location.longitude, lat: location.latitude }} ref={mapRef} scrollWheelZoom={false} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker title={!loadingLocation && locationTitle ? formatted_address : locationFallback} />
        {!formatted_address ? '' : createPortal(<UserLocationInfo refined_location_name={formatted_address} zoomDelta={1} />, document.querySelector('.map-container'))}
      </MapContainer>}
    </div>
  )
}

export default Map