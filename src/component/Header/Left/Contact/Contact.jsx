import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import "./Contact.sass"

const Contact = (props) => {
  return (
    <div className="contact">
        <TemplateContact icon={<LocalPhoneIcon />} content={"0382983233"} />
        <TemplateContact icon={<MailIcon />} content={"email@example.com"} />
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