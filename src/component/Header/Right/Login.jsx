import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./Login.sass"
import LoginPopup from '../../Login/Login';

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
  const [open, setOpen]= useState(()=> false)
  return (
    <div className="text-right-login">
      <div className="text-right-login-login" onClick={()=> setOpen(prev=> !prev)}>Đăng nhập</div>
      {
        open=== true && <LoginPopup setOpen={setOpen} open={open} />
      }
    </div>
  )
}

export default Login
