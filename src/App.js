import  { Routes, Route } from "react-router-dom"
import CheckAccount from "./component/CheckAccount/CheckAccount"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import Home from "./component/Home/Home"
import Navigation from "./component/Navigation/Navigation"
import "./style.sass"
import Menu from "./component/Menu/Menu"
import Account from "./component/Account/Account"
import History from "./component/History/History"
import { Fragment, useEffect, useState } from "react"
import axios from "axios"
import { SERVER_URL } from "./config/config"
import Cookie from "js-cookie"
import NotFound from "./component/Notfound/NotFound"

function App() {
  const [user, setUser]= useState(()=> {})
  const [options, setOptions]= useState(()=> {})
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: `${SERVER_URL}/`,
        method: "post",
        data: {
          uid: Cookie.get("uid"),
          sid: Cookie.get("sid")
        },
        responseType: "json"
      })
      const result= await res.data
      setUser(()=> result)
    })()
  }, [])
  useEffect(()=> {
    (async()=> {
      const res= await axios({
          url: `${SERVER_URL}/get_option/main`,
          method: "post", 
          responseType: "json"
      })
      const result= await res.data
      setOptions(()=> result.data)
    })()
  }, [])
  return (
    <Fragment>
      <Header {...user} {...options} />
      <Navigation {...options} />
      {
        user?.login=== true &&
        <Menu />
      }
      <Routes>
        <Route path="/" element={<Home {...options} {...user?.data} />} />
        <Route path="/check_live_uid" element={<CheckAccount title={"Check Live Uid"} is_fb={true} />} />
        <Route path="/check_mail" element={<CheckAccount title={"Check Live HotMail - Gmail"} is_gmail={true} />} />
        <Route path="/get_code_mail" element={<CheckAccount title={"Get Code Email"} is_get_mail={true} />} />
        <Route path="/*" element={<NotFound />} />
        {
          user?.login=== true &&
          <>
            <Route path="/account/*" element={<Account is_account={true} {...user} />} />
            <Route path="/recharge/*" element={<Account is_recharge={true} {...user} />} />
            <Route path="/history" element={<History {...user} />} />
          </>
        }
      </Routes>
      <Footer />
    </Fragment>
  )
}

export default App