import React from 'react'
import "./Header.sass"
import Left from './Left/Left'
import Right from './Right/Right'

const Header = (props) => {
  return (
    <div className="header">
      <Left {...props} />
      <Right {...props} />
    </div>
  )
}

export default Header
