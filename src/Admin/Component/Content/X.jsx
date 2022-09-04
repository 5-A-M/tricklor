import React, { useEffect, useState } from 'react'
import axios from "axios"
import { SERVER_URL } from '../../../config/config'

const X = (props) => {
  const [data, setData]= useState(()=> {})
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/get_option/main`,
            method: "post", 
            responseType: "json"
        })
        const result= await res.data
        setData(()=> result.data)
    })()
  }, [])
  const [title, setTitle]= useState(()=> "")
  const [banner, setBanner]= useState(()=> "")
  const [logo, setLogo]= useState(()=> "")
  const [hotline, setHotline]= useState(()=> "")
  const [email, setEmail]= useState(()=> "")
  const [message, setMessage]= useState(()=> "")
  const [state, setState]= useState(()=> false)
  useEffect(()=> {
    setTitle(()=> data?.title)
    setBanner(()=> data?.banner)
    setLogo(()=> data?.logo)
    setHotline(()=> data?.hotline)
    setEmail(()=> data?.email)
  }, [data])
  const update_admin_option= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/update/admin_option`,
        method: "post",
        data: {
            title, banner, logo, hotline, email
        },
        responseType: "json"
    })
    const result= await res.data
    if(result.recharge=== true ) {
        setMessage(()=> "Cập nhật thành công")
        setState(()=> result.recharge)
        setTimeout(()=> {
            setMessage(()=> "")
        }, 3000)
    }
  }
  return (
    <div className="settings-admin" style={{width: "100%"}}>
        <CommonX title={"Tiêu đề trang web: "} content={title} onChange={setTitle} />
        <CommonX title={"Banner: "} content={banner} onChange={setBanner} />
        <CommonX title={"Logo: "} content={logo} onChange={setLogo} />
        <CommonX title={"Hotline: "} content={hotline} onChange={setHotline} />
        <CommonX title={"Email: "} content={email} onChange={setEmail} />
        <div className="message-update-success" style={{margin: "16px 0", fontSize: 14, color: state=== true ? "green" : "red"}}>{message}</div>
        <div className="settings-admin-button" style={{marginTop: 16, display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <button onClick={()=> update_admin_option()} className="settings-admin-button-main" style={{width: 200, height: 40, borderRadius: 80, fontSize: 18, fontWeight: 600, background: "#2e89ff", color: "#fff", border: "none", outline: "none", cursor: "pointer"}}>Cập nhật</button>
        </div>
    </div>
  )
}

const CommonX= (props)=> {
    return (
        <div className="component-settings-admin" style={{marginBottom: 16}}>
            <Title1 {...props} />
            <Content1 {...props} />
        </div>
    )
}

const Title1= (props)=> {
    return (
        <div className="component-settings-admin-title" style={{fontSize: 16, marginBottom: 8}}>{props.title}</div>
    )
}

const Content1= (props)=> {
    return (
        <div className="component-settings-admin-content" style={{height: 50, maxWidth: "100%", width: "100%", textOverflow: "ellipsis", overflow: "hidden", border: "1px solid #e7e7e7", display: "flex", alignItems: 'center', padding: 5}}>
            <input onChange={(e)=> props.onChange(e.target.value)} type="text" className="component-settings-admin-content-x" style={{width: "100%", height: "100%", border: "none", outline: "none", background: "transparent", color: "#fff", fontSize: 18}} value={props.content} />
        </div>
    )
}

export default X