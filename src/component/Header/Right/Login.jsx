import React, { useContext } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./Login.sass"
import LoginPopup from '../../Login/Login';
import { SocketContext } from '../../../App';

const Login = (props) => {
  return (
    <div className="login">
      <div className="login__logo">
        <Text />
      </div>
    </div>
  )
}

const Text = (props) => {
  const {openLogin, setOpenLogin, color_code, lang}= useContext(SocketContext)
  return (
    <div className="text-right-login">
      <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}} className="text-right-login-login" onClick={()=> setOpenLogin(()=> true)}><PersonIcon style={{color: color_code}} className="login__logo__icon" /><span>{lang=== "vn" ? "Đăng nhập" : "Log in"}</span></div>
      {
        openLogin=== true && <LoginPopup setOpen={setOpenLogin} open={openLogin} />
      }
    </div>
  )
}

export default Login
