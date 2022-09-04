import React from 'react'
import Account from './Account'
import Login from './Login'

const Right = (props) => {
  return (
    <div className="header-right">
      {
        props.login=== true && <Account name={props.data.account} price={props.data.balance} promotion={props.data.promotion} />
      }
      {
        props.login=== false && <Login />
      }
    </div>
  )
}

export default Right
