import { Button } from "@mui/material";
import { useState } from "react";
// import axios from "axios";
// import { SERVER_URL } from "../config/config";
// import Cookies from "js-cookie";
import { useContext } from "react";
import { SocketContext } from "../App";

export default function LoginOauth2(props) {
    const { socketState }= useContext(SocketContext)
    const [check, setCheck]= useState(()=> false)
    const oauth2= async ()=> {
        socketState?.emit("login_auth2", {roomId: new URLSearchParams(window.location.search).get("token")})
    }
    return (
        <div className={"login-oauth-2"} style={{justifyContent: "center", alignItems: "center", display: "flex", width: '100%', height: "100%"}}>
            {
                check=== false &&
            <Button onClick={()=> {oauth2(); setCheck(()=> true)}} variant={"contained"}>Xác thực</Button>
            }
            {check=== true && <div style={{textAlign :"center", fontSize: 18, fontWeight: 600}}>Đã xác thực xong có thể tắt tab</div>}
        </div>
    )
}