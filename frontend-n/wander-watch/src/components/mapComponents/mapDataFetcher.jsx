import axios from "axios";
import { useEffect } from "react";
// import { useAsync } from "../../hooks/useAsync";
// import useLocation from "../../hooks/useLocation";

export default function getLocationAdress (longitude, latitude) {
  // useEffect (() => {
      if (!longitude || !latitude) {
        return Promise.reject('Location is not valid')
      }
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`;
      return axios.get(url).then((res) => {
        if (res.data.error_message) throw new Error(res.data.error_message)
        return res.data
      })
      .catch((err) => {
        throw new Error(err.message)
      })

    // }, [longitude, latitude])
  }
