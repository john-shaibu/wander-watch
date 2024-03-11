import { MapContainer, TileLayer} from 'react-leaflet';
import useLocation from '../hooks/useLocation'
import { useEffect, useRef, useState } from 'react';
import { useAsync } from '../hooks/useAsync';
import MapLoader from './mapComponents/MapLoader';
import UserLocationInfo from './mapComponents/UserLocationInfo';
import getLocationAdress from './mapComponents/mapDataFetcher';
import CustomMarker from './mapComponents/Marker';

let Street_no = '';
let street_name = '';
let city = '';
let state = '';
let country = ''

const Map = () => {
  const [err, location] = useLocation()
  const mapRef = useRef(null)
  const { loading: loadingLocation, value: locationTitle, error: locationError } = useAsync(getLocationAdress(location?.longitude, location?.latitude), [ location ])
  const  locationFallback = 'omo!'
  console.log(locationError);
  console.log(locationTitle);
  
  if (locationTitle != null) {
    const results = locationTitle.results;
    if (results[0]){
            let address_components = results[0].address_components;
      let formatted_address = results[0].formatted_address;
      

      for (var i = 0; i < address_components.length; i++) {
          if (address_components[i].types[0] === "administrative_area_level_3" && address_components[i].types[1] === "political") {
              Street_no = address_components[i].long_name;    
          }
          if (address_components[i].types[0] === "neighborhood") {
              street_name = address_components[i].long_name;    
          }
          if (address_components[i].types[0] === "administrative_area_level_1" && address_components[i].types[1] === "political") {
              state = address_components[i].long_name;    
          }
          if (address_components[i].types[0] === "locality" && address_components[i].types[1] === "political" ) {                                
              city = address_components[i].long_name;   
          }
          
          if (address_components[i].types[0] === "country") {
              country = address_components[i].long_name;

          }
        }
      // console.log(results);
      console.log(Street_no, street_name, city, state, country)
      // console.log(formatted_address)
    }
  } else {
    console.log('could not get your location info')    
  }


  useEffect(() => {
    if (location && mapRef.current) { 
      mapRef.current._container.click() 
      mapRef.current._container.click() 
    }
  }, [location, mapRef])
  
  return (
    <div className='map-container'>
        {!location ? <MapLoader /> : <MapContainer zoom={8} center={{lng: location.longitude, lat: location.latitude}} ref={mapRef} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker title={!loadingLocation && locationTitle ? locationTitle : locationFallback}/>
            <UserLocationInfo refined_location_name={`${Street_no}, ${street_name}, ${state} State, ${country} `} />
        </MapContainer>}
        
    </div>
  )
}

export default Map