import React from 'react'
import "./Footer.sass"

const Footer = (props) => {
  return (
    <footer className="footer-home__content" >
      <FooterComponent />
    </footer>
  )
}

export default Footer

const FooterComponent = (props) => {
    return (
        <div className="footer-home__footer">
            <img className="footer-home__img" src={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661894612/secure.754afbde_u9e9ll.png"} alt={"open"}  />
        </div>
    )
}