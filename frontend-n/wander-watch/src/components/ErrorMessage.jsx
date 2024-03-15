import React from 'react'

const ErrorMessage = (props) => {

  const message = props.message
  const type = props.errorType

  return (
    <div className={`error ${type}`}>{message}</div>
  )
}

export default ErrorMessage