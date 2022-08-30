import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./Login.sass"

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
  return (
    <div className="text-right-login">
      Đăng nhập
    </div>
  )
}

export default Login
