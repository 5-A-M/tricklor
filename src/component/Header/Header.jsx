import React, { useContext, useEffect } from 'react'
import { memo } from 'react'
import { SocketContext } from '../../App'
import bulk_definition from '../../f/bulk_definition'
import "./Header.sass"
import Left from './Left/Left'
import Right from './Right/Right'

const Header = (props) => {
  const { socketState }= useContext(SocketContext)
  useEffect(()=> {
    if(props.api_payment) {
      socketState?.emit("check_payment_from_server", {api_payment: props?.api_payment})
      socketState.on("check_payment_to_client", data=> {
        console.log(data)
      })
    }
  }, [props.api_payment])
  useEffect(()=> {
    if(props.api_payment) {
      bulk_definition(props?.api_payment, props?.bank_account)
    }
  }, [props?.api_payment, props?.bank_account])
  return (
  <div className="wrapper-header">
    <div className="header">
      <Left {...props} />
      <Right {...props} />
    </div>
  </div>
  )
}

export default memo(Header)
