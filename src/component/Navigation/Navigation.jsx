import React from 'react'
import Left from './Left/Left'
import "./Navigation.sass"
import Right from './Right/Right'

const Navigation = (props) => {
  return (
    <div className="wrapper-navigation" style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
      <div className="navigation">
        <Left {...props} />
        <Right {...props} />
      </div>
    </div>
  )
}

export default Navigation
