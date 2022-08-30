import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./Login.sass"

const Login = (props) => {
  return (
    <div className="login">
        <div className="login__logo">
          <PersonIcon name="person" />
        </div>
    </div>
  )
}

export default Login
