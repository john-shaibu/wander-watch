import React from 'react'
import { CloseIcon } from '../assets'
import {Icon} from '../components/Icon'

const ErrorMessage = (props) => {

  const message = props.message
  const type = props.errorType

  return (
    <div className={`error ${type}`}>{message} <span><Icon iconelement={CloseIcon} /> </span></div>
  )
}

export default ErrorMessage