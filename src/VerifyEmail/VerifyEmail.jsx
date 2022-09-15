import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SERVER_URL } from '../config/config'
import Cookie from "js-cookie"
import {QRCodeCanvas} from 'qrcode.react';

const VerifyEmail = (props) => {
    const [message, setMessage]= useState(()=> "")
    const [qrLogin, setQrLogin]= useState(()=> false)
    const [tokenLogin, setTokenLogin]= useState(()=> "")
    const [value, setValue]= useState(()=> "")
    const location= useLocation()
    let disable= value.length <= 0 ? true : false
    const sendVerifyMail= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/auth/verify`,
            method: "post",
            responseType: "json",
            data: {
                email: location.state.email,
                id_user: Cookie.get("uid"),
                password: value
            }
        })
        const result= await res.data
        if(result.verify=== false ) {
            setMessage(()=> <span style={{color: "red"}}>{result.message}</span>)
            setQrLogin(()=> false)
        }
        else {
            setMessage(()=> <span style={{color: "green"}}>{result.message}</span>)
            setQrLogin(()=> true)
            setTokenLogin(()=> result.token_login)
        }
    }
    return (
        <div className="verify-email" style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", flexDirection: "column"}}>
            {
                qrLogin=== true && <div style={{margin: '16px 0', fontWeight: 600, fontSize: 20}}>Trang web sẽ tự động trở lại trang chủ trong 1 phút nữa</div>
            }
            <div style={{marginBottom: 16, textAlign: "center"}}>Vui lòng nhập mật khẩu của bạn để hoàn thành xác thực 2fa</div>
            <input type="password" onChange={(e)=> setValue(e.target.value)} style={{width: 350, height: 50, fontSize: 18, outline: "none", textAlign: "center"}} />
            <div style={{margin: "16px 0"}}></div>
            <Button onClick={()=> sendVerifyMail()} variant={"contained"} disabled={disable}>Xác nhận</Button>
            <br />
            <div>{message}</div>
            {
                qrLogin=== true && <>
                    <div style={{margin: "16px 0", fontSize: 18}}>Đây là mã qr code đăng nhập 2fa của bạn, Vui lòng không chia sẻ nó cho bất cứ ai</div>
                    <QRCodeCanvas 
                    value={window.location.origin+"/2fa/login/auth?token="+tokenLogin}
                    renderAs={"svg"}
                    size={300}
                    includeMargin={false}
                    imageSettings={{
                        height: "100%",
                        width: "100%"
                    }}
                />
                </>
            }
        </div>
    )
}

export default VerifyEmail