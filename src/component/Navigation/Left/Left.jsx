import React from 'react'
import Logo from './Logo'

const Left = (props) => {
  return (
    <div className="left-navigation">
      <Logo logo={props.logo} />
    </div>
  )
}

export default Left
