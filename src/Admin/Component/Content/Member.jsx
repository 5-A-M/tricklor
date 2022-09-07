import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../../config/config'

const Member = (props) => {
  const [data, setData]= useState(()=> [])
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: `${SERVER_URL}/get_user`,
        method: "get",
        responseType: "json",

      })
      const result= await res.data
      return setData(()=> result.data)
    })()
  }, [])
  return (
    <div className="member-stat" style={{width: "100%"}}>
      {
        data?.map((item, key)=> <ComponentMember key={item._id} {...item} />)
      }
    </div>
  )
}

const ComponentMember= (props)=> {
    return (
      <div className="component-member" style={{width: "100%", marginBottom: 30, paddingBottom: 16, borderBottom: "1px solid #e7e7e7"}}>
        <div>Tài khoản: <strong><input type="text"value={props.account} style={{fontSize: 18}} /></strong></div>
        <br />
        <div>Số tiền: <strong><input type="text"value={props.balance} style={{fontSize: 18}} /></strong></div>
        <br />
        <div>Email: <strong><input type="text"value={props.email} style={{fontSize: 18}} /></strong></div>
      </div>
    )
}

export default Member