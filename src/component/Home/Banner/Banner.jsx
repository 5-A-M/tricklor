import React from 'react'
import "./Banner.sass"
import CampaignIcon from '@mui/icons-material/Campaign';

const Banner = (props) => {
  return (
    <div className="banner-home" style={{backgroundImage: `url(${props.banner})`}}>
      <Discount {...props} />
      <Support {...props} />
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

const Discount= (props) => {
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

const Support= (props)=> {
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
