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
  const { color_code }= useContext(SocketContext)
  const array_link= [{text: "Trang chủ", link: "/", icon: <HomeIcon style={{color: color_code}} />, is_link: true}, {text: "Thông tin cá nhân", link: "/account", icon: <AccountBoxIcon style={{color: color_code}} />, is_link: true}, {text: "Nạp tiền", link: "/recharge", icon: <PaymentIcon style={{color: color_code}} />, is_link: true}, {text: "Lịch sử giao dịch", link: "/history", icon: <HistoryIcon style={{color: color_code}} />, is_link: true}, {text: "Đăng xuất", icon: <LogoutIcon style={{color: color_code}} />}]
  return (
    <div className="menu-login">
        {
            array_link.map((item, key)=> <ComponentLink {...props} {...item} key={key} />)   
        }
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