import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "./Login.sass"
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';

const LoginPopup = (props) => {
  const [convertSignup, setConvertSignup]= useState(()=> false)
  return (
    <div className="wrapper-login">
        <div className="login-p">
            <CloseLoginComponent setOpen={props.setOpen} />
            {
                convertSignup=== true &&
                <Title title1={"Đăng ký"} title2={"Bạn cần đăng ký để sử dụng dịch vụ"} />
            }
            {
                convertSignup=== false &&
                <Title title1={"Đăng nhập"} title2={"Bạn cần đăng nhập để sử dụng dịch vụ"} />
            }
            <BodyLogin setConvertSignup={setConvertSignup} convertSignup={convertSignup} />
        </div>
    </div>
  )
}

const CloseLoginComponent= (props)=> {
    return (
        <div className="close-login-component">
            <div className="close-login-icon" onClick={()=> props.setOpen(()=> false)}>
                <CloseIcon titleAccess='Close' className="close-login-icon-icon" style={{width: 36, height: 36, color: "#3a3b3c"}} />
            </div>
        </div>
    )
}

const Title= (props)=> {
    return (
        <div className="title-component-login">
            <Title1 {...props} />
            <Title2 {...props} />
        </div>
    )
}

const Title1= (props)=> {
    return (
        <div className="title-component-login-title-1"><h5 className="title-component-login-title-1-heading">{props.title1}</h5></div> 
    )
}

const Title2= (props)=> {
    return (
        <div className="title-component-login-title-2">{props.title2}</div> 
    )
}

const BodyLogin= (props)=> {
    return (
        <div className="title-component-login-body-login">
            <Wrapper logo={<PersonIcon />} type={"text"} placeholder={"Tài khoản..."}  />
            {
                props.convertSignup === true && <Wrapper logo={<EmailIcon />} type={"email"} placeholder={"Email..."} />
            }
            <Wrapper logo={<KeyIcon />} type={"password"} placeholder={"Mật khẩu..."} />
            {
                props.convertSignup === true && <Wrapper logo={<KeyIcon />} type={"password"} placeholder={"Nhập lại mật khẩu..."} />
            }
            {
                props.convertSignup === false && <Side />
            }
            {
                props.convertSignup === false ? <BtnExe /> : <BtnExeS />
            }
            <ToSignUp {...props} />
        </div>
    )
}

const Logo= (props)=> {
    return (
        <div className="title-component-logo-container">
            {props.logo}
        </div>
    )
}

const Inp= (props)=> {
    return (
        <div className="title-component-inp-container">
            <input type={props.type} className="inp-title-component" placeholder={props.placeholder} autoComplete="off" />
        </div>
    )
}

const Wrapper= (props)=> {
    return (
        <div className="wrapper-home-container-1">
            <Logo {...props} />    
            <Inp {...props} />
        </div>
    )
}

const Side= (props)=> {
    return (
        <div className="side-container">
            <SaveAccount />
            <ForgotPassword />
        </div>
    )
}

const SaveAccount= (props)=> {
    return (
        <div className="save-account">
            <input type="checkbox" className="inp-save-account" />
            <span className="span-save-account">Lưu tài khoản</span>
        </div>
    )
}

const ForgotPassword= (props)=> {
    return (
        <div className="forgot-password">
            <span className="span-forgot-password">Quên mật khẩu</span>
        </div>
    )
}

const BtnExe= (props)=> {
    return (
        <div className="btn-exe">
            <button className="button-btn-exe">
                Đăng nhập
            </button>
        </div>
    )
}

const BtnExeS= (props)=> {
    return (
        <div className="btn-exe">
            <button className="button-btn-exe">
                Đăng ký
            </button>
        </div>
    )
}

const ToSignUp= (props)=> {
    return (
        <div className="to-sign-up">
            {  
                props.convertSignup=== false &&
                <>
                    <span className="span-to-sign-up">Chưa có tài khoản ? </span> <strong onClick={()=> props.setConvertSignup(prev=> !prev)} className="strong-to-sign-up">Đăng ký ngay</strong>
                </>
            }
            {
                props.convertSignup=== true &&
                <>
                    <span className="span-to-sign-up">Đã có tài khoản ? </span> <strong onClick={()=> props.setConvertSignup(prev=> !prev)} className="strong-to-sign-up">Đăng nhập</strong>
                </>
            }
        </div>
    )
}

export default LoginPopup