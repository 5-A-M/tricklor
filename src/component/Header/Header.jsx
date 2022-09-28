import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { memo } from 'react'
import { SocketContext } from '../../App'
import { SERVER_URL } from '../../config/config'
import bulk_definition from '../../f/bulk_definition'
import "./Header.sass"
import Left from './Left/Left'
import Right from './Right/Right'

const Header = (props) => {
  const { socketState }= useContext(SocketContext)
  useEffect(()=> {
    if(props.api_payment && props?.data?.balance) {
      socketState?.emit("check_payment_from_server", {api_payment: props?.api_payment})
      socketState.on("check_payment_to_client",async data=> {
        if(data.data.description.toLowerCase()?.includes(props?.data?.account?.toLowerCase()) === true) {
          const res= await axios({
            url: `${SERVER_URL}/get/c/payment`,
            method: "get",
            responseType: "json"
          })
          const result= await res.data
          if(result.id !== data?.data?.id) {
            axios({
              url: `${SERVER_URL}/recharge/manual`,
              method: "post",
              data: {
                account: data?.data.description,
                balance: parseInt(props?.data?.balance),
                recharge: parseInt(data?.data?.amount)
              }
            })
            // 
            axios({
              url: `${SERVER_URL}/up/c/payment`,
              method: "post",
              data: {
                id: data?.data?.id,
                time: new Date().getTime()
              },
              responseType: "json"
            })
          }
        }
      })
    }
  }, [props.api_payment, props?.data?.balance, props?.data?.account])
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
