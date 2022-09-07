import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "./Login.sass"
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios"
import { SERVER_URL } from '../../config/config';
import Cookie from "js-cookie"

const LoginPopup = (props) => {
  const [convertSignup, setConvertSignup]= useState(()=> false)
  const [account, setAccount]= useState(()=> "")
  const [password, setPassword]= useState(()=> "")
  const [email, setEmail]= useState(()=> "")
  const [confirmPassword, setConfirmPassword]= useState(()=> "")
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
            <BodyLogin 
                password={password}
                account={account}
                email={email}
                confirmPassword={confirmPassword}
                setAccount={setAccount}
                setPassword={setPassword}
                setEmail={setEmail}
                setConfirmPassword={setConfirmPassword}
                setConvertSignup={setConvertSignup} convertSignup={convertSignup} 
            />
        </div>
    </div>
  )
}

export const CloseLoginComponent= (props)=> {
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
            <Wrapper logo={<PersonIcon />} type={"text"} placeholder={"Tài khoản..."} value={props.account} onChange={props.setAccount}  />
            {
                props.convertSignup === true && <Wrapper logo={<EmailIcon />} type={"email"} placeholder={"Email..."} value={props.email} onChange={props.setEmail} />
            }
            <Wrapper logo={<KeyIcon />} type={"password"} placeholder={"Mật khẩu..."} value={props.password} onChange={props.setPassword} />
            {
                props.convertSignup === true && <Wrapper logo={<KeyIcon />} type={"password"} placeholder={"Nhập lại mật khẩu..."} value={props.confirmPassword} onChange={props.setConfirmPassword} />
            }
            {
                props.convertSignup === false && <Side {...props} />
            }
            {
                props.convertSignup === false ? <BtnExe {...props} /> : <BtnExeS {...props} />
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
            <input value={props.value} onChange={(e)=> props.onChange(e.target.value)} type={props.type} className="inp-title-component" placeholder={props.placeholder} autoComplete="off" />
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
            <SaveAccount {...props} />
            <ForgotPassword />
        </div>
    )
}

const SaveAccount= (props)=> {
    const saveaccount= ()=> {
        localStorage.setItem("account", props.account)
        localStorage.setItem("password", props.password)
    }
    return (
        <div className="save-account">
            <input onClick={()=> saveaccount()} type="checkbox" className="inp-save-account" />
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
    const [message, setMessage]= useState(()=> "")
    const [state, setState]= useState(()=> false)
    const login= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/login`,
            method: "post",
            data: {
                account: props.account,
                password: props.password
            },
            responseType: "json"
        })
        const result= await res.data
        setMessage(()=> result.message)
        setState(()=> result.login)
        if(result.login=== true ) {
            Cookie.set("uid", result.uid, {expires: 7})
            Cookie.set("sid", result.sid, {expires: 7})
            window.location.reload()
        }
    }
    return (
        <>
            <div style={{margin: "8px", fontSize: 12, color: state=== true ? "green" : "red"}}>{message}</div>
            <div className="btn-exe">
                <button onClick={()=> login()} className="button-btn-exe" style={{cursor: "pointer"}}>
                    Đăng nhập
                </button>
            </div>
        </>
    )
}

const BtnExeS= (props)=> {
    const [message, setMessage]= useState(()=> "")
    const [state, setState]= useState(()=> false)
    const signup= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/signup`,
            method: "post",
            data: {
                account: props.account,
                password: props.password,
                email: props.email
            }
        })
        const result= await res.data
        setMessage(()=> result.message)
        setState(()=> result.signup)
        setTimeout(()=> {
            if(result.signup === true) {
                return props.setConvertSignup(prev=> !prev)
            }
        }, 1000)
    }
    return (
        <>
            <div style={{margin: "8px", fontSize: 12, color: state=== true ? "green" : "red"}}>{message}</div>
            <div className="btn-exe">
                <button onClick={()=> signup()} className="button-btn-exe" style={{cursor: "pointer"}}>
                    Đăng ký
                </button>
            </div>
        </>
    )
}

const ToSignUp= (props)=> {
    return (
        <div className="to-sign-up">
            {  
                props.convertSignup=== false &&
                <>
                    <span className="span-to-sign-up">Chưa có tài khoản ? </span> <strong onClick={()=> {props.setConvertSignup(prev=> !prev);props.setAccount(()=> "");props.setPassword(()=> "");props.setEmail(()=> ""); props.setConfirmPassword(()=> "")}} className="strong-to-sign-up">Đăng ký ngay</strong>
                </>
            }
            {
                props.convertSignup=== true &&
                <>
                    <span className="span-to-sign-up">Đã có tài khoản ? </span> <strong onClick={()=> {props.setConvertSignup(prev=> !prev);props.setAccount(()=> "");props.setPassword(()=> "");props.setEmail(()=> ""); props.setConfirmPassword(()=> "")}} className="strong-to-sign-up">Đăng nhập</strong>
                </>
            }
        </div>
    )
}

export default LoginPopup