import React from 'react'
import Banner from './Banner/Banner'
import HeaderHome from './HeaderHome/HeaderHome'
import "./Home.sass"
import ListProduct from './ListProduct/ListProduct'
import ToolCheck from './ToolCheck/ToolCheck'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PublicIcon from '@mui/icons-material/Public';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = (props) => {
  return (
    <div className="wrapper-home-container">
      <Banner />
      <div className={"home-container"}>
        <ToolCheck />
        <HeaderHome />
        <ListProduct array_header={[{text: "Hotmail + Outlook (Để dễ mở khóa Hotmail Mọi người nên Download full info mail)", icon: false}, {text: "POP3", icon: <CheckBoxIcon />}, {text: "Live", icon: <HourglassBottomIcon />}, {text: "Quốc gia", icon: <PublicIcon />}, {text: "Giá", icon: <SellIcon />}, {text: "Số lượng", icon: <ShoppingCartIcon />}, {text: ""}]} arr_product={[{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"}]} />
        <br />
        <ListProduct array_header={[{text: "Gmail", icon: false}, {text: "POP3", icon: <CheckBoxIcon />}, {text: "Live", icon: <HourglassBottomIcon />}, {text: "Quốc gia", icon: <PublicIcon />}, {text: "Giá", icon: <SellIcon />}, {text: "Số lượng", icon: <ShoppingCartIcon />}, {text: ""}]} arr_product={[{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"},{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New", pop3: "Đã bật", live: "24-48 giờ", flag: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg", cost: "50đ", price: 13971, button: "Mua"}]} />
      </div>
      
    </div>
  )
}

export default Home
