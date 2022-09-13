import React, { useState } from 'react'
import "./Logo.sass"
import { Link } from "react-router-dom"
const Logo = (props) => {
  const [loaded, setLoaded]= useState(()=> false)
  return (
    <Link className="logo-link" to={"/"}>
      <div className="navigation-logo">
        {
          <img onLoad={()=> setLoaded(()=> true)} style={{display: loaded=== true? "block" : "none"}} src={props.logo} alt="Logo" className="navigation-logo-img" />
        }
        {
          loaded=== false &&
          <div></div>
        }
      </div>
    </Link>
  )
}

export default Logo
