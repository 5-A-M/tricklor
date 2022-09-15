import React, { Fragment, useContext, useMemo, useState } from 'react'
import {QRCodeCanvas} from 'qrcode.react';
import { v4 } from 'uuid';
import Cookie from "js-cookie"
import { useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config/config';
import { SocketContext } from '../../App';
import { Navigate } from 'react-router-dom';
// import { Button } from '@mui/material';

const TwoFaAuthentication = (props) => {
  return (
    <div className={"two-fa-authentication"}>
        <WrapQrCode {...props} />
    </div>
  )
}

const WrapQrCode= (props)=> {
    const [qrV1, setQrV1]= useState(()=> "")
    // eslint-disable-next-line
    const [verify1, setVerify1]= useState(()=> false)
    const [token, setToken]= useState(()=> "")
    // const [confirmEmail, setConfirmEmail]= useState(()=> false)
    const { socketState }= useContext(SocketContext)
    const id_room= useMemo(()=> v4(), [])
    useEffect(()=> {
        console.log(socketState)
        socketState.emit("join_room", {id_room})
    }, [socketState, id_room])
    useEffect(()=> {
        socketState.on("verify1", (data)=> {
            setVerify1(data.is_verify_1)
            setToken(data.token)
        })
    }, [socketState])
    useEffect(()=> {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/token/qr`,
                method: "post",
                data: {
                    uid: Cookie.get("uid")
                },
                responseType: "json"
            })
            const result= await res.data
            setQrV1(()=> result.token_qr_code)
        })()
    }, [])
    return (
        <Fragment>
            <div className={"wrap-qr-code"} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <QRCodeCanvas 
                    value={window.location.origin+"/auth?token="+qrV1+"?state="+Cookie.get("uid")+"?roomId="+id_room}
                    renderAs={"svg"}
                    size={300}
                    includeMargin={false}
                    imageSettings={{
                        height: "100%",
                        width: "100%"
                    }}
                />
            </div>
            <br />
            <div style={{textAlign: "center"}}>Quét mã QR để tiến hành tạo xác thực 2 bước</div>
            {
                verify1=== true && <Navigate to={`/authentication/auth/verify?token=${token}?email=${props.data.email}`} state={{is_verify: true, email: props.data.email}} />
            }
        </Fragment>
    )
}

export default TwoFaAuthentication