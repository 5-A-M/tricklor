import React, { useContext } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import "./Contact.sass"
import { SocketContext } from '../../../../App';

const Contact = (props) => {
  const { color_code }= useContext(SocketContext)
  return (
    <div className="contact">
        <a style={{color: "#000"}} href={`tel:${props.hotline}`}>
            <TemplateContact icon={<LocalPhoneIcon style={{color: color_code}} />} content={props.hotline} />
        </a>
        <TemplateContact icon={<MailIcon style={{color: color_code}} />} content={props.email} />
    </div>
  )
}

export default Contact

const TemplateContact= (props)=> {
    return (
        <div className="t-contact">
            <div className="contact-icon">
                {props.icon}
            </div>
            <div className="contact-content">
                {props.content}
            </div>
        </div>
    )
}