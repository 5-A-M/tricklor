import React, { useState } from 'react'
import "./ToolCheck.sass"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { SocketContext } from '../../../App'

const ToolCheck = (props) => {
  const array_link= [{text: "Check Live UID", icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661886418/fb-icon_gugp7z.png", review: 5, link: "/check_live_uid", background: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661887656/bg1_bw8tkr.png"},
    {text: "Check Mail", icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661886418/outlook-icon_ib41qc.png", review: 5, link: "/check_mail", background: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661887656/ng2_t62gmk.png"},
    {text: "Get Code Mail", icon: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661886418/main-icon_xxmv2z.png", review: 5, link: "/get_code_mail", background: "https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661887656/bg3_tfvhvg.png"},
    ]
  return (
    <div className="tool-check">
        {
            array_link.map((items, key) => <ComponentToolCheck key={key } {...items} />)
        }      
    </div>
  )
}

export default ToolCheck

const ComponentToolCheck= (props) => {
    const [open, setOpen]= useState(()=> false)
    return (
        <div className="tool-check-component-check" style={{backgroundImage: `url(${props.background})`}} onMouseEnter={()=> setOpen(()=> true)} onMouseLeave={()=> setOpen(()=> false)}>
            <IconComponentToolCheck {...props} />

            <div className="tool-check-component-check-wrapper">
                <NameComponentToolCheck open={open} {...props} /> 
                <ReviewComponentToolCheck {...props} />
            </div>
        </div>
    )
}

const IconComponentToolCheck = (props) => {
    return (
        <div className="tool-check-icon-check">
            <div className="tool-check-icon-check-wrapper">
                <img src={props.icon} alt='open' className="tool-check-icon-check-icon" />
            </div> 
        </div>
    )

}

const NameComponentToolCheck = (props) => {
    const { lang }= useContext(SocketContext)
    return (
        <div className="tool-check-name-check">
            <div className="tool-check-name-check-text">
                {props.text}
            </div>
            <div className="tool-check-name-check-text-check">
                Tool
            </div>
            {
                props.open &&
                <Link className="tool-check-name-check-link" to={`${props.link}`}>
                    <div className="tool-check-name-check-link-button">
                        {
                            lang=== "vn" ? "Sử dụng" : "Use"
                        }
                    </div>
                </Link>
            }
            <div></div>
        </div>
    )

}

const ReviewComponentToolCheck = (props) => {
    return (
        <div className="tool-check-review-component-check">

        </div>
    )

}