import React, { useState } from 'react'
import "./Lang.sass"

const Lang = (props) => {
  const [lang, setLang]= useState(()=> 0)
    
  return (
    <div className="lang">
        <LangTemplate className="lang-vn" text={"VI"} flag={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661880723/t%E1%BA%A3i_xu%E1%BB%91ng_yqg6xw.jpg"}></LangTemplate>
        <LangTemplate className="lang-en" text={"EN"} flag={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661880760/t%E1%BA%A3i_xu%E1%BB%91ng_1_rha6ar.jpg"}></LangTemplate>
    </div>
  )
}

export default Lang

const LangTemplate= (props)=> {
    return (
        <div className={props.className}>
            <Text {...props} />
            <Flag {...props}></Flag>
        </div>
    )
}

const Text= (props)=> {
    return (
        <div className="text-left-header">
            {props.text}
        </div>
    )
}

const Flag= (props)=> {
    return (
        <div className="flag-left-header">
            <img src={props.flag} alt={"Open"} className="img-flag-left-header" />
        </div>
    )
}