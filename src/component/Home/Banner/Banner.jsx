import React, { Fragment, useState } from 'react'
import "./Banner.sass"
import CampaignIcon from '@mui/icons-material/Campaign';

const Banner = (props) => {
  return (
    <Fragment>        
        <div className="banner-home" style={{position: "relative"}}>
        <PhoneyBackground src={props.banner} />
        </div>
    </Fragment>
  )
}

const PhoneyBackground= (props)=> {
    const [status, setStatus]= useState(()=> false)
    return (
        <div className={"phoney-background"} style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0}}>
            {
               <img alt={"open"} src={props.src} onLoad={()=> setStatus(()=> true)} style={{width: "100%", height: "100%", objectFit: "cover", display: status=== true ? "block" : "none"}} />
            }
        </div>
    )
}

// const SubBanner = (props) => {
//     return (
//         <div className="sub-banner">
//             <img className="sub-banner-icon" alt='open' src={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661895564/facebook-advertising.9544591b_pshumi.png"} />
//         </div>
//     )

// }

export const Discount= (props) => {
    const array_discount= [{text: "Từ 0 đến 100k +30% giá trị thẻ nạp"}, {text: "Từ 500k + 50% giá trị thẻ nạp"}, {text: "Từ 2000k + 100% giá trị thẻ nạp"}, {text: "Tiền khuyến mãi chỉ mua được Mail (Hotmail + Outlook + Domain)"}]
    return (
        <div className="banner-discount">
            <div className="banner-discount-title">Khuyến mãi nạp</div>
            {
                array_discount.map((item, key)=> <div key={key} className="banner-item-content"><CampaignIcon /> {item.text}</div>)    
            }
        </div>
    )
}

export const Support= (props)=> {
    const array_support= [{text: "Group Zalo nhận thông báo quan trọng"}, {text: "Video HD sử dụng Tool Check Live"}, {text: "Mọi thắc mắc vui lòng liên hệ Zalo"}]
    return (
        <div className="banner-support">
            <div className="banner-support-title">Hỗ trợ</div>
            {
                array_support.map((item, key)=> <div key={key} className="banner-item-content"><CampaignIcon /> {item.text}</div>)    
            }
        </div>
    )
}

export default Banner
