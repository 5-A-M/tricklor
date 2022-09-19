import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../config/config'

const BuyService = (props) => {
    const [data, setData]= useState(()=> {})
    useEffect(()=> {
      (async()=> {
          const res= await axios({
              url: `${SERVER_URL}/api/user/buy`,
              method: "get",
              params: {
                  apiKey: new URLSearchParams(window.location.search).get("apiKey"),
                  account_type: new URLSearchParams(window.location.search).get("account_type")
              },
              responseType: "text"
          })
          const result= await res.data
          return setData(()=> result)
      })()
    }, [])
    return (
      <div style={{position: "fixed", width: "100%", height: "100%", background: "#fff", top: 0, left: 0}}>{`${JSON.stringify(data)}`}</div>
    )
}

export default BuyService