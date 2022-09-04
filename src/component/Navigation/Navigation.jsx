import React from 'react'
import Left from './Left/Left'
import "./Navigation.sass"
import Right from './Right/Right'

const Navigation = (props) => {
  return (
    <div className="navigation">
      <Left {...props} />
      <Right {...props} />
    </div>
  )
}

export default Navigation
