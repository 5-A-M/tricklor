import React from 'react'
import "./Header.sass"
import Left from './Left/Left'
import Right from './Right/Right'

const Header = () => {
  return (
    <div className="header">
      <Left />
      <Right />
    </div>
  )
}

export default Header
