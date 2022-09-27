import React, { useContext } from 'react'
import "./Lang.sass"
import Cookie from "js-cookie"
import axios from 'axios'
import { SERVER_URL } from '../../../../config/config'
import { SocketContext } from '../../../../App'

const Lang = (props) => {
//   const [lang, setLang]= useState(()=> 0)
  const setLanguage= async (lang)=> {
    const res= await axios({
        url: `${SERVER_URL}/set/c/lang`,
        method: "post",
        data: {
            id_user: Cookie.get("uid"),
            lang: lang
        },
        responseType: "json"
    })
    const result= await res.data
    window.location.reload()
    return console.log(result)

  }
  return (
    <div className="lang">
        <LangTemplate setLang={setLanguage} lang={"vn"} className="lang-vn" text={"VI"} flag={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661880723/t%E1%BA%A3i_xu%E1%BB%91ng_yqg6xw.jpg"}></LangTemplate>
        <LangTemplate setLang={setLanguage} lang={"en"} className="lang-en" text={"EN"} flag={"https://res.cloudinary.com/dxkhlwfz3/image/upload/v1661880760/t%E1%BA%A3i_xu%E1%BB%91ng_1_rha6ar.jpg"}></LangTemplate>
    </div>
  )
}

export default Lang

const LangTemplate= (props)=> {
    const { lang }= useContext(SocketContext)
    return (
        <div style={{cursor: "pointer", padding: 5, background: lang===props?.lang ? "#2e89ff" : "transparent", color: lang===props?.lang ? "#fff" : "#000"}} className={props.className} onClick={()=> props.setLang(props.lang)}>
            <Text {...props} />
            <Flag {...props} />
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
        <div className="flag-left-header" style={{borderRadius: 5, overflow: "hidden"}}>
            <img src={props.flag} alt={"Open"} className="img-flag-left-header" />
        </div>
    )
}