import React from 'react'
import "./NotificationAdmin.sass"

const NotificationAdmin = (props) => {
  return (
    <div className="notification-admin" style={{width: "100%", height: 50, display: "flex", justifyContent: 'center', alignItems: "center"}}>
      <div className="notification-like-marquee">
        <p>{props.notification}</p>
      </div>
    </div>
  )
}

export default NotificationAdmin