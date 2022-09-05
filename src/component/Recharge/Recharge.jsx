import React from 'react'
import { Title } from '../Account/Account'
import NumberFormat from 'react-number-format';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import "./Recharge.sass"

export const Payment= (props)=> {
  return (
    <div className="payment" >
      <Title info={<div>Nạp tiền thông qua ngân hàng <span style={{fontSize: 30}}>VIETCOMBANK</span></div>} />
      <MainPayment />
    </div>
  )
}


const MainPayment= (props)=> {
  return (
    <div className="main-payment">
      <LogoBanking logo={"https://dongvanfb.com/_nuxt/vcb-lg.b14cf53f.png"} />
      <ProBanking />
    </div>
  )
}

const LogoBanking= (props)=> {
  return (
    <div className="wrapper-logo-banking-main-payment">
      <div className="logo-banking-main-payment">
        <img src={props.logo} alt="open" className="logo-banking-main-payment-img" />
      </div>
    </div>
  )
}

const ProBanking= (props)=> {
  return (
    <div className="pro-banking-main-payment">
      <Pro1 />
      <Pro2 />
      <PromotionTable />
      <ContactSupport />
    </div>
  )
}

const Pro1= (props)=> {
  return (
    <div className="pro-1-banking-main-payment">
      <span className="pro-1-banking-main-payment-span">Nhập số tiền cần nạp: </span>
      <div className="pro-1-banking-main-payment-div">
        <NumberFormat thousandSeparator={true} displayType={"input"} placeholder={"Nhập số tiền cần nạp"} className="pro-1-banking-main-payment-div-inp" />
        <div className="pro-1-banking-main-payment-div-div">VND</div>
      </div>
    </div>
  )
}

const Pro2= (props)=> {
  return (
    <div className="button-payment">
      <button className="button-payment-main">
        Thanh toán
      </button>

    </div>
  )
}

const PopupPayment= (props)=> {
  return (
    <div className="popup-payment-wrapper" style={{width: "100%", height: "100%", background: "rgba(255, 255, 255, 0.75)", position: "fixed", top: 0, left: 0, display: "flex", justifyContent: 'center', alignItems: "center"}}> 
      <div className="popup-payment" style={{width: 800, height: "auto", borderRadius: 10, background: "#fff", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        
      </div>
    </div>
  )
}

const LeftPopup= (props)=> {
  return (
    <div className="left-popup-payment-wrapper" style={{width: 200, height: "auto"}}>
      
    </div>
  )
}

const RightPopup= (props)=> {
  return (
    <div className="right-popup-payment-wrapper" style={{width: "calc(100% - 200px)", height: "auto"}}>

    </div>
  )
}

const PromotionTable= (props)=> {
  return (
    <div className="promotion-table">
      <div className="promotion-table-title">Khuyến mãi nạp tiền</div>
      <ListPromotion speaker={<VolumeUpIcon style={{color: "#007c30"}} />} text={"Từ 0 đến 100k + 30% giá trị thẻ nạp"} />
    </div>
  )
}

const ListPromotion= (props)=> {
  return (
    <div className="list-promotion">
      <DetailPromotion {...props} />
      <DetailPromotion {...props} />
      <DetailPromotion {...props} />
    </div>
  )
}

const DetailPromotion= (props)=> {
  return (
    <div className="wrapper-element-promotion">
      <div className="speaker-promotion">{props.speaker}</div>
      <div className="text-promotion">{props.text}</div>
    </div>
  )
}

export const ContactSupport= (props)=> {
  return (
    <div className="contact-support">
      <ContactSupport1 content={"Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống kiểm tra và kích hoạt tự động. Tài khoản của bạn sẽ được cộng tiền sau 1 dến 5 phút."} />
      <ContactSupport1 />
    </div>
  )
}

const ContactSupport1= (props)=> {
  return (
    <div className="contact-support-1">
      {props.content}
    </div>
  )
}
