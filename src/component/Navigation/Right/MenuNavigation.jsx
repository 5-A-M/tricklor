import React from 'react'
import "./MenuNavigation.sass"
import {Link } from "react-router-dom"

const MenuNavigation = (props) => {
  const array_link= [{text: "Check Live UID", link: "/check_live_uid"}, {text: "Check Mail", link: "/check_mail"}, {text: "Get Code Mail", link: "/get_code_mail"}]
  return (
    <div className="menu-navigation">
        {
            array_link.map((items, key)=> <ComponentLink key={key} {...items} />)
        }     
    </div>
  )
}

const ComponentLink= (props) => {
    return (
        <div className="menu-navigation-navigation-link">
            <Link className="menu-navigation-link" to={`${props.link}`}>
                <div className="menu-navigation-navigation-link-text hover-text">
                    {props.text}
                </div>
            </Link>
        </div>
    )
}

export default MenuNavigation
