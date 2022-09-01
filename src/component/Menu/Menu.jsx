import { NavLink } from "react-router-dom"
import "./Menu.sass"
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

const Menu = (props) => { 
  const array_link= [{text: "Trang chủ", link: "/", icon: <HomeIcon />}, {text: "Thông tin cá nhân", link: "/account", icon: <AccountBoxIcon />}, {text: "Nạp tiền", link: "/recharge", icon: <PaymentIcon />}, {text: "Lịch sử giao dịch", link: "/history", icon: <HistoryIcon />}, {text: "Đăng xuất", link: "/logout", icon: <LogoutIcon />}]
  return (
    <div className="menu-login">
        {
            array_link.map((item, key)=> <ComponentLink {...props} {...item} key={key} />)   
        }
    </div>
  )
}

const ComponentLink= (props)=> {
    return (
        <NavLink to={`${props.link}`} className={({isActive})=> isActive ? "menu-login-link menu-login-link-active" : "menu-login-link menu-login-link-inactive"}>
            <div className="menu-login-link-component-link">
                <div className="menu-login-component-link-icon">
                    {props.icon}
                </div>
                <div className="menu-login-component-link-text">
                    {props.text}
                </div>
            </div>
        </NavLink>
    )
}

export default Menu