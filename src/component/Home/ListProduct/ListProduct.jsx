import { useState } from 'react'
import { CloseLoginComponent } from '../../Login/Login'

import "./ListProduct.sass"

const ListProduct = (props) => {
  return (
    <div className="list-product-container">
        <table className="list-product-table">
            <THead array_header={props.array_header} />
            <TBody arr_product={props.arr_product} />
        </table>
    </div>
  )
}

const THead= (props)=> {
    
    return (
        <thead className="thead-container">
            <tr className="thead-container-tr">
                {
                    props.array_header.map((item, key) => <Th key={key} {...item} />)
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
          {
            props.arr_product.map((item, key)=> <Tr key={key} {...item} />)
          }
        </tbody>
    ) 

}

const Tr= (props) => {
    const array_body = props
    return (
        <tr className="tbody-container-tr">
            <Td icon={array_body.icon} text={array_body.text} />
            <Td text={array_body.pop3} />
            <Td text={array_body.live} />
            <Td icon={array_body.flag} />
            <Td text={array_body.cost} />
            <Td text={array_body.cost} />
            <Td button={array_body.button} />
        </tr>
    )
}

const Td= (props)=> {
    const [open, setOpen]= useState(()=> false)
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
                <div className="td-container-button"><button className="td-container-button-btn" onClick={()=> setOpen(prev=> !prev)} style={{width: "100%", height: "100%", border: "none", outline: "none", color: "#fff", fontSize: 18, background: "transparent", cursor: "pointer"}}>{props.button}</button>
                    {
                        open=== true && <PopupPurchase open={open} setOpen={setOpen} />
                    }
                </div>
            }
        </td>
    )
}

const PopupPurchase= (props)=> {
    
    return (
        <div className="purchase-popup">
            <div className="sub-purchase-popup">
                <div className="sub-close-purchase-popup" style={{display: "flex", justifyContent: "flex-end"}}>
                    <CloseLoginComponent {...props} />
                </div>
                <div className="wrapper-purchase-popup" style={{width: "100%"}}>
                    <Title title={"Sản phẩm: Hotmail NEW"} />
                    <DetailPurchase left={"Số lượng"} />
                    <DetailPurchase left={"Giá"} />
                    <DetailPurchase left={"Số tiền"} />
                </div>
            </div>
        </div>
    )
}

const Title= (props)=> {
    return (
        <div className="title-purchase-popup">
            {props.title}
        </div>
    )
}

const DetailPurchase= (props)=> {

    return (
        <div className="detail-purchase-detail">
            <div className="detail-purchase-detail-wrap" style={{width: "100%"}}>
                <strong className="strong-detail-purchase-detail" style={{color: "#000"}}>{props.left}</strong>
                <div className="div-detail-purchase-detail">
                    <input onChange={()=> {}} value={50} type="number" className="inp-div-detail-purchase-detail" style={{textAlign: "right", border: "none", outline: "none", fontSize: 18}} />
                </div>
            </div>
        </div>
    )
}