import React, { useState } from 'react'
import "./Account.sass"
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Payment } from '../Recharge/Recharge';

const Account = (props) => {
  return (
    <div className="wrapper-account-page">
      <div className="account-page">
        <Left {...props} />
        <Right {...props} />
      </div>
    </div>
  )
}

const Left= (props)=> {
  const array_link_account= [{text: "Thông tin cá nhân", icon: <PersonIcon />, link: "/info"}, {text: "Two-Factor Authentication (2FA)", icon: <LockIcon />, link: "/2fa"}, {text: "Đổi mật khẩu", icon: <VpnKeyIcon />, link: "/change_password"}]
  const array_link_recharge= [{text: "VIETCOMBANK", icon: "https://dongvanfb.com/_nuxt/vcb.144038a5.png", link: "/channel_1", typeIcon: "img"}]
  return (
    <div className="left-side-account">

      {
        <>
          
          {props.is_account=== true && array_link_account?.map((item, key)=> <ComponentLinkLeft type={"account"} key={key} {...item} />)}
        </>
      }
      {
        <>
          {props.is_recharge=== true && array_link_recharge?.map((item, key)=> <ComponentLinkLeft type={"recharge"} key={key} {...item} />)}
        </>
      }
    </div>
  )
}

const ComponentLinkLeft= (props)=> {
  return (
    <NavLink className={({isActive})=> isActive ? "wrapper-link-component-link-left-link wrapper-link-component-link-left-link-active" : "wrapper-link-component-link-left-link wrapper-link-component-link-left-link-inactive"} to={`/${props.type}${props.link}`}>
      <div className="component-link-left-link">
        {
          props.typeIcon=== "img" ? <div className="component-link-left-link-icon"><img alt="open" src={props.icon} className="img-component-link-left-link-icon" style={{width: 20, height: 20}} /></div> : 
          <div className="component-link-left-link-icon">{props.icon}</div>
        }
        <div className="component-link-right-link-text">{props.text}</div>
      </div>
    </NavLink>
  )
}

const Right= (props)=> {
  return (
    <div className="right-side-account">
      {
        props.is_account=== true &&
        <Routes >
          <Route path="/" element={<Navigate replace={true} to={"/account/info"} />} />
          <Route path="/info" element={<Infomation />} />
          <Route path="/2fa" element={<TwoFa />} />
          <Route path="/change_password" element={<ChangePassword />} />
        </Routes>
      }
      {
        props.is_recharge=== true &&
        <Routes >
          <Route path="/" element={<Navigate replace={true} to={"/recharge/channel_1"} />} />
          <Route path="/channel_1" element={<Payment />} />
          {/* <Route path="/channel_2" element={<TwoFa />} />
          <Route path="/channel_3" element={<ChangePassword />} /> */}
        </Routes>
      }
    </div>
  )
}

const Infomation= (props)=> {
  return (
    <div className="infomation-account">
      <Title info={"Thông tin cá nhân"} />
      <DetailInfo  />
    </div>
  )
}

const DetailInfo= (props)=> {
  return (
    <div className="wrapper-detail-infomation-account">

      <div className="detail-infomation-account">
        <ComponentDetailInfo left={"Tài khoản: "} right={"giangpt"} placeholder={"giangpt"} readOnly={true} />
        <ComponentDetailInfo left={"Email: "} right={"giangpt@gmail.com"} placeholder={"giangpt@gmail.com"} readOnly={true} />
        <ComponentDetailInfo left={"Số tiền: "} right={"0"} placeholder={"giangpt@gmail.com"} readOnly={true} />
        <ComponentDetailInfo left={"Tiền khuyến mại: "} placeholder={"giangpt@gmail.com"} right={"0"} readOnly={true} />
      </div>
    </div>
  )
}

const ComponentDetailInfo= (props)=> {
  return (
    <div className="component-detail-info-account">
      <LeftComponentDetailInfo {...props} />
      <RightComponentDetailInfo {...props} />
    </div>
  )
}

const LeftComponentDetailInfo= (props)=> {
  return (
    <div className="left-component-detail-info">
      {props.left}
    </div>
  )
}

const RightComponentDetailInfo= (props)=> {
  return (
    <div className="right-component-detail-info">
      <input onChange={(e)=> props.onChange(e.target.value)} type="text" className="inp-right-component-detail-info" value={props.right} readOnly={props.readOnly} placeholder={props.placeholder} />
    </div>
  )
}

export const Title= (props)=> {
  return (
    <div className="title-common">
      {props.info}
    </div>
  )
}

const TwoFa= (props)=> {
  return (
    <div className="two-fa">
      <Title info={"Two-Factor Authentication (2FA)"} />
      <div style={{textAlign: "center"}}>Tính năng đang được nâng cấp</div>
    </div>
  )
}

const ChangePassword= (props)=> {
  const [currentPassword, setCurrentPassword]= useState(()=> "")
  const [newPassword, setNewPassword]= useState(()=> "")
  const [confirmNewPassword, setConfirmNewPassword]= useState(()=> "")
  return (
    <div className="change-password">
      <Title info={"Đổi mật khẩu"} />
      <MainChangePassword {...props} currentPassword={currentPassword} newPassword={newPassword} confirmNewPassword={confirmNewPassword} setCurrentPassword={setCurrentPassword} setNewPassword={setNewPassword} setConfirmNewPassword={setConfirmNewPassword} />
    </div>
  )
}

const MainChangePassword= (props)=> {
  return (
    <div className="wrapper-main-change-password">
      <div className="main-change-password">
        <ComponentDetailInfo {...props} onChange={props.setCurrentPassword} left={"Mật khẩu hiện tại: "} right={props.currentPassword} placeholder={"Mật khẩu hiện tại"} readOnly={false}  />
        <ComponentDetailInfo {...props} onChange={props.setNewPassword} left={"Mật khẩu mới: "} right={props.newPassword} placeholder={"Mật khẩu mới"} readOnly={false} />
        <ComponentDetailInfo {...props} onChange={props.setConfirmNewPassword} left={"Nhập lại mật khẩu mới: "} right={props.confirmNewPassword} placeholder={"Nhập lại mật khẩu mới"} readOnly={false} />
      </div>
    </div>
  )
}

export default Account