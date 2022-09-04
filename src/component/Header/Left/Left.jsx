import React from 'react'
import Contact from './Contact/Contact'
import Lang from './Lang/Lang'
import "./Left.sass"

const Left = (props) => {
  return (
    <div className="left-header">
      <Lang {...props} />
      <Contact {...props} />
    </div>
  )
}

export default Left
