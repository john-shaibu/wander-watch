import React from 'react'
import { Spinner } from '../assets'

const Loader = (props) => {
  return (
    <div className={`map_loader ${props.className} `}>
        <Spinner />
        <b>{props.loaderMessage}</b>
    </div>
  )
}

export default Loader