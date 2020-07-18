import React from 'react'
// import {Alert, AlertTitle} from '@material-ui/lab'

const Alert = ({type, message}) => {
  return (
    <div>
      <p className={type}>{message}</p>
    </div>
  )
}

export default Alert
