import { MapContainer, TileLayer} from 'react-leaflet';
import useLocation from '../hooks/useLocation'
import { useRef } from 'react';
import { createPortal } from 'react-dom'
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
let formatted_address = '';

const DiscoveryMap = () => {
  const [, location] = useLocation()
  const mapRef = useRef(null)
  const { loading: loadingLocation, value: locationTitle, error: locationError } = useAsync(getLocationAdress(location?.longitude, location?.latitude), [ location ])
  const  locationFallback = 'omo!'
  
  if (locationTitle != null) {
    const results = locationTitle.results;
    if (results[0]){
      let address_components = results[0].address_components;
      

      for (var i = 0; i < address_components.length; i++) {
          if (address_components[i].types[0] === "street_number") {
              Street_no = address_components[i].long_name;    
          }
          if (address_components[i].types[0] === "neighborhood" || address_components[i].types[0] === "route" || address_components[i].types[0] === "premise") {
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
      formatted_address = `${!Street_no ? '' : Street_no + ', '}${street_name}, ${city}, ${state}, ${country}`
      // console.log(`${!Street_no ? '' : Street_no+','} street_name, city, state, country`)
      console.log(formatted_address)
    }
  } else {
    console.log('could not get your location info')    
  }
  
  return (
    <div className='map-container'>
        {!location ? <MapLoader /> : <MapContainer zoomControl={false} zoom={8} center={{lng: location.longitude, lat: location.latitude}} ref={mapRef} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CustomMarker title={!loadingLocation && locationTitle ? formatted_address : locationFallback}/>
               {/* {!formatted_address ? '' : createPortal(<UserLocationInfo refined_location_name={formatted_address} zoomDelta={1} />, document.querySelector('.map-container'))}     */}
        </MapContainer>}
    </div>
  )
}

export default DiscoveryMap