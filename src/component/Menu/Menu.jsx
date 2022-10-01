import { NavLink } from "react-router-dom"
import "./Menu.sass"
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookie from "js-cookie"
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
import Cookies from "js-cookie";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { memo } from "react";
import { Box } from "@mui/system";

const Menu = (props) => { 
  const { color_code, lang, socketState }= useContext(SocketContext)
  const [alertLogout, setAlertLogout]= useState(()=> false)
  useEffect(()=> {
    socketState?.emit("check_login_other_device", {roomId: Cookies.get("uid")})
    socketState?.on("check_login_other_device_from_server", (data)=> {
        if(data.logout=== true) {
            setAlertLogout(()=> true)
        }
    })
  }, [])
  const array_link= [{text: lang=== "vn" ? "Trang chủ" : "Home", link: "/", icon: <HomeIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Thông tin cá nhân" : "Infomation", link: "/account", icon: <AccountBoxIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Nạp tiền" : "Recharge", link: "/recharge", icon: <PaymentIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Lịch sử giao dịch" : "Transaction history", link: "/history", icon: <HistoryIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Đăng xuất"  :"Logout", icon: <LogoutIcon style={{color: color_code}} />}]
  return (
      <div className={"menu-login-sub"} style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div className="menu-login" style={{maxWidth: 1200}}>
            {
                array_link.map((item, key)=> <ComponentLink {...props} {...item} key={key} />)   
            }
        </div>
        <AlertLogout open={alertLogout} />
    </div>
  )
}

const ComponentLink= (props)=> {
    const logout= ()=> {
        Cookie.remove("sid")
        Cookie.remove("uid")
        window.location.href= window.location.origin
    }
    return (
        <>  
            {props.is_link=== true ?
            <NavLink to={`${props.link}`} className={({isActive})=> isActive ? "menu-login-link menu-login-link-active" : "menu-login-link menu-login-link-inactive"}>
                <div className="menu-login-link-component-link">
                    <div className="menu-login-component-link-icon">
                        {props.icon}
                    </div>
                    <div className="menu-login-component-link-text">
                        {props.text}
                    </div>
                </div>
            </NavLink> : <div className={"menu-login-link menu-login-link-inactive"}>
                <div onClick={()=> logout()} className="menu-login-link-component-link" style={{cursor: "pointer"}}>
                    <div className="menu-login-component-link-icon">
                        {props.icon}
                    </div>
                    <div className="menu-login-component-link-text">
                        {props.text}
                    </div>
                </div>
            </div>}
            
        </>
    )
}

export default Menu

const AlertLogout= memo((props)=> {
    const { lang }= useContext(SocketContext)
    const logout= ()=> {
        Cookie.remove("sid")
        Cookie.remove("uid")
        window.location.href= window.location.origin
    }
    return (
        <Dialog open={props.open}>
            <Box style={{borderRadius: 10, padding: 16}}>
                <DialogTitle style={{textAlign: "center"}}>{lang=== "vn" ? "Tài khoản hiện đang đăng nhập ở nơi khác" : "Account is currently logged in elsewhere"}</DialogTitle>
                <br />
                <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} >
                    <Button onClick={logout} variant={"contained"}>{lang=== "vn" ? "Xác nhận" : "Confirm"}</Button>
                </Box>
            </Box>
        </Dialog>
    )
})