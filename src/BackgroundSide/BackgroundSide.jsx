import React from 'react'
import "./style.sass"

const BackgroundSide = (props) => {
  return (
    <div className="background-side" style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%",backgroundImage: `url(${props?.background})`}}></div>
  )
}

export default BackgroundSide