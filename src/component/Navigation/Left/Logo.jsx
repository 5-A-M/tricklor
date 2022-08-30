import React from 'react'
import "./Logo.sass"

const Logo = (props) => {
  return (
    <div className="navigation-logo">
        <img src={props.logo} alt="Logo" className="navigation-logo-img" />
    </div>
  )
}

export default Logo
