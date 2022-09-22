import React from 'react'
import "./NotificationAdmin.sass"
import validUrl  from "valid-url"

const NotificationAdmin = (props) => {
  return (
    <div className="notification-admin" style={{width: "100%", height: 50, display: "flex", justifyContent: 'center', alignItems: "center"}}>
      <div className="notification-like-marquee">
        {
          validUrl.isUri(props?.notification) ? <img alt={"open"} src={props?.notification} style={{maxHeight: "100%", width: "auto"}} /> : <p>{props.notification}</p>
        }
        
      </div>
    </div>
  )
}

export default NotificationAdmin