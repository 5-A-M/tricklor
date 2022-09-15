import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../App';

const Auth = (props) => {
  const { socketState }= useContext(SocketContext)
  const [check, setCheck]= useState(()=> false)
  // useEffect(()=> {
  //   // console.log(socket.sta/ )
    
  // }, [socketState])
    useEffect(()=> {
      socketState?.emit("verify_email", {auth_token: new URLSearchParams(window.location.search).get("auth"), id_user: new URLSearchParams(window.location.search).get("uid")})
    }, [socketState])
  return (
    <div style={{width: "100%", height: "100vh",background: "#fff", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {
        check=== false && <Button onClick={()=> {socketState.emit("join_room", {id_room: new URLSearchParams(window.location.search).get("roomId")}); setCheck(()=> true)}} variant={"contained"}>Nhấn vào đây để tiếp tục</Button>
      }
       {
        check === true && <div>Đã xác thực xong, bạn có thể tắt trang web</div>
       }
    </div>

  )
}

export default Auth