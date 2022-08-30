import React, { useState } from 'react'
import Login from './Login'

const Right = (props) => {
  const [auth, setAuth]= useState(()=> false)
  return (
    <div className="header-right">
        {
            auth=== true && <div>Hello World</div>
        }
        {
            auth=== false && <Login />
        }
    </div>
  )
}

export default Right
