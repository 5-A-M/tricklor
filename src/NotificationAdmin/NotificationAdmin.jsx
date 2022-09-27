import React, { useContext } from 'react'
import "./NotificationAdmin.sass"
import validUrl  from "valid-url"
import { SocketContext } from '../App'

const NotificationAdmin = (props) => {
  const { color_code }= useContext(SocketContext)
  return (
    <div className="notification-admin" style={{width: "100%", height: 50, display: "flex", justifyContent: 'center', alignItems: "center",}}>
      <div className="notification-like-marquee" style={{background: color_code, width: "100%", maxWidth: 1200}}>
        {
          validUrl.isUri(props?.notification) ? <img alt={"open"} src={props?.notification} style={{maxHeight: "100%", width: "auto"}} /> : <p>{props.notification}</p>
        }
        
      </div>
    </div>
  )
}

export default NotificationAdmin