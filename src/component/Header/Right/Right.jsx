import React, { useState } from 'react'
import Account from './Account'
import Login from './Login'

const Right = (props) => {
  const [auth, setAuth]= useState(()=> true)
  return (
    <div className="header-right">
      {
        auth=== true && <Account name={"giangpt"} price={0} promotion={0} />
      }
      {
        auth=== false && <Login />
      }
    </div>
  )
}

export default Right
