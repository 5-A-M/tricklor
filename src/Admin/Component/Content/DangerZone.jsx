import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { SERVER_URL } from '../../../config/config'

const DangerZone = (props) => {
  const [account, setAccount]= useState(()=> "")
  const [password, setPassword]= useState(()=> "")
  const [message, setMessage]= useState(()=> "")
  // eslint-disable-next-line
  const [status, setStatus]= useState(()=> false)
  const reset= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/admin/reset`,
        method: "post",
        responseType: "json",
        data: {
            account, password
        }
    })
    const result= await res.data
    if(result.reset=== true ) {
        setStatus(()=> true)
        setMessage(()=> "Thay đổi thông tin thành công, tự động load lại trang")
        window.location.reload()
    }
    else {
        setStatus(()=> false)
        setMessage(()=> "Tài khoản hoặc mật khẩu không chính xác")
    }
  }

  const resetHotmail= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/reset/hotmail`,
        method: "post",
        responseType: "json",
        data: {
            is_reset: true
        }
    })
    const result= await res.data
    window.location.reload()
    return console.log(result)
  }
  const resetGmail= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/reset/gmail`,
        method: "post",
        responseType: "json",
        data: {
            is_reset: true
        }
    })
    const result= await res.data
    window.location.reload()
    return console.log(result)
  }
  return (
    <div className="danger-zone">
        <h2>Đặt lại tài khoản mật khẩu Admin</h2>
        <div>
            <TextField type={"text"} onChange={(e)=> setAccount(e.target.value)} style={{background: "#fff"}} placeholder="Nhập tài khoản admin" />
        </div>
        <br />
        <br />
        <div>
            <TextField type={"password"} onChange={(e)=> setPassword(e.target.value)} style={{background: "#fff"}} placeholder="Nhập mật khẩu admin" />
        </div>
        <br />
        <br />
        {
            message
        }
        <br />
        <div>
            <Button onClick={()=> reset()} variant={"contained"}>Xong</Button>
        </div>
        <br />
        <br />
        <div>
            <div style={{fontSize: 18, fontWeight: 600}}>Reset dịch vụ hotmail</div>
            <div>
                <Button onClick={()=> resetHotmail()} variant={"contained"}>Reset</Button>
            </div>
        </div>
        <br />
        <br />
        <div>
            <div style={{fontSize: 18, fontWeight: 600}}>Reset dịch vụ gmail</div>
            <div>
                <Button onClick={()=> resetGmail()} variant={"contained"}>Reset</Button>
            </div>
        </div>
    </div>
  )
}

export default DangerZone