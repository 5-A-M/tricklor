import { Snackbar } from '@mui/material'
import React from 'react'

const Alert = (props) => {
  return (
    <Snackbar
        open={props.open}
        autoHideDuration={props.duration}
        message={props.message}
      />
  )
}

export default Alert