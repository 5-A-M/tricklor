import React, { Fragment } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PublicIcon from '@mui/icons-material/Public';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./ListProduct.sass"

const ListProduct = (props) => {
  return (
    <div className="list-product-container">
        <table className="list-product-table">
            <THead />
            <TBody />
        </table>
    </div>
  )
}

const THead= (props)=> {
    const array_header= [{text: "Hotmail + Outlook (Để dễ mở khóa Hotmail Mọi người nên Download full info mail)", icon: false}, {text: "POP3", icon: <CheckBoxIcon />}, {text: "Live", icon: <HourglassBottomIcon />}, {text: "Quốc gia", icon: <PublicIcon />}, {text: "Giá", icon: <SellIcon />}, {text: "Số lượng", icon: <ShoppingCartIcon />}, {text: ""}]
    return (
        <thead className="thead-container">
            <tr className="thead-container-tr">
                {
                    array_header.map((item, key) => <Th key={key} {...item} />)
                }
            </tr>
        </thead>
    )
}

const Th= (props) => {
    return (
        <th className="th-container">
            <p className="th-container-p">{props.icon}</p>
            <span className="th-container-span">{props.text}</span>
        </th>   
    )
}


export default ListProduct

const TBody= (props)=> {
    return (
        <tbody className="tbody-container">
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />
          <Tr />          
        </tbody>
    ) 

}

const Tr= (props) => {
    const array_body = [{icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891637/out_ir7w08.png", text: "Hotmail New"}, {text: "Đã bật"}, {text: "24-48 giờ"}, {icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661891723/us.92d14a6a_aipblo.svg"}, {text: "50đ"}, {text: 13971}, {button: "Mua"}]
    return (
        <tr className="tbody-container-tr">
            {
                array_body.map((item, key) => <Td key={key} {...item} />)
            }
        </tr>
    )
}

const Td= (props)=> {
    return (
        <td className="td-container">
            {
                props.icon &&
                <p className="td-container-p">
                    <img src={props.icon} alt="Icon" className="td-container-img" />
                </p>
            }
            {
                props.text &&
                <span className="td-container-span">{props.text}</span>
            }
            {
                props.button &&
                <div className="td-container-button">{props.button}</div>
            }
        </td>
    )
}