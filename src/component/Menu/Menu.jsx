import { NavLink } from "react-router-dom"
import "./Menu.sass"
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookie from "js-cookie"
import { useContext } from "react";
import { SocketContext } from "../../App";

const Menu = (props) => { 
  const { color_code, lang }= useContext(SocketContext)
  const array_link= [{text: lang=== "vn" ? "Trang chủ" : "Home", link: "/", icon: <HomeIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Thông tin cá nhân" : "Infomation", link: "/account", icon: <AccountBoxIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Nạp tiền" : "Recharge", link: "/recharge", icon: <PaymentIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Lịch sử giao dịch" : "Transaction history", link: "/history", icon: <HistoryIcon style={{color: color_code}} />, is_link: true}, {text: lang=== "vn" ? "Đăng xuất"  :"Logout", icon: <LogoutIcon style={{color: color_code}} />}]
  return (
      <div className={"menu-login-sub"} style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div className="menu-login" style={{maxWidth: 1200}}>
            {
                array_link.map((item, key)=> <ComponentLink {...props} {...item} key={key} />)   
            }
        </div>
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