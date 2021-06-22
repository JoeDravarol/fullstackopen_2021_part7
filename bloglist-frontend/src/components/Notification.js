import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <Alert severity={notification.status}>
      {notification.message}
    </Alert>
  )
}

export default Notification
