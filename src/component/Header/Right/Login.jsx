import React, { useContext } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./Login.sass"
import LoginPopup from '../../Login/Login';
import { SocketContext } from '../../../App';

const Login = (props) => {
  return (
    <div className="login">
      <div className="login__logo">
        <PersonIcon className="login__logo__icon" />
        <Text />
      </div>
    </div>
  )
}

const Text = (props) => {
  const {openLogin, setOpenLogin}= useContext(SocketContext)
  return (
    <div className="text-right-login">
      <div className="text-right-login-login" onClick={()=> setOpenLogin(()=> true)}>Đăng nhập</div>
      {
        openLogin=== true && <LoginPopup setOpen={setOpenLogin} open={openLogin} />
      }
    </div>
  )
}

export default Login
