import React from 'react'
import "./MenuNavigation.sass"
import { NavLink } from "react-router-dom"

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
            <NavLink className={({isActive})=> (isActive===true ? "active-link menu-navigation-link" : "disabled-link menu-navigation-link")} to={`${props.link}`}>
                <div className="menu-navigation-navigation-link-text hover-text">
                    {props.text}
                </div>
            </NavLink>
        </div>
    )
}

export default MenuNavigation
