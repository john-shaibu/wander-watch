import axios from "axios";
// import { useAsync } from "../../hooks/useAsync";
// import useLocation from "../../hooks/useLocation";

export default function getLocationAdress (longitude, latitude) {
    if (!longitude || !latitude) {
      return Promise.reject('Location is not valid')
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`;
    return axios.get(url).then((res) => res.data)
  }


// export function MapData(){
//     const [err, location] = useLocation()
//     const { loading: loadingLocation, value: locationTitle, error: locationError } = useAsync(getLocationAdress(location?.longitude, location?.latitude), [ location ])
//     const  locationFallback = 'omo!'
//     console.log(locationError);
    
//     if (locationTitle != null) {
//         const results = locationTitle.results;
    
//         if (results[0]){
//           let Street_no = '';
//           let street_name = '';
//           let city = '';
//           let state = '';
//           let country = ''
    
//           let address_components = results[0].address_components;
//           let formatted_address = results[0].formatted_address;
    
//           for (var i = 0; i < address_components.length; i++) {
//               if (address_components[i].types[0] === "administrative_area_level_1" && address_components[i].types[1] === "political") {
//                   state = address_components[i].long_name;    
//               }
//               if (address_components[i].types[0] === "locality" && address_components[i].types[1] === "political" ) {                                
//                   city = address_components[i].long_name;   
//               }
              
//               if (address_components[i].types[0] === "country") {
//                   country = address_components[i].long_name;
    
//               }
//             }
//           // console.log(results);
//           console.log(city, state, country)
//           console.log(formatted_address)
//         }
//       } else {
//         console.log('could not get your location info')    
//       }

//       return [loadingLocation, locationTitle, locationFallback]
// }