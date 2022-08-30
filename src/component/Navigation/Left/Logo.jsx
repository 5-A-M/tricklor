import React from 'react'
import "./Logo.sass"
import { Link } from "react-router-dom"

const Logo = (props) => {
  return (
    <Link className="logo-link" to={"/"}>
        <div className="navigation-logo">
            <img src={props.logo} alt="Logo" className="navigation-logo-img" />
        </div>
    </Link>
  )
}

export default Logo
