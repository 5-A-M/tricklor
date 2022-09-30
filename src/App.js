import  { Routes, Route } from "react-router-dom"
// import CheckAccount from "./component/CheckAccount/CheckAccount"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import Home from "./component/Home/Home"
import Navigation from "./component/Navigation/Navigation"
import "./style.sass"
import Menu from "./component/Menu/Menu"
import { createContext, Fragment, useEffect, useState } from "react"
import axios from "axios"
import { SERVER_URL } from "./config/config"
import Cookie from "js-cookie"
import NotFound from "./component/Notfound/NotFound"
import { io } from "socket.io-client"
import BackgroundSide from "./BackgroundSide/BackgroundSide"
import { Helmet } from "react-helmet-async"
import { lazy, Suspense } from "react"
import Auth from "./Auth/Auth"
import VerifyEmail from "./VerifyEmail/VerifyEmail"
import LoginOauth2 from "./LoginOauth2/LoginOauth2"
import nProgress from "nprogress"
import CheckBalance from "./Api/CheckBalance"
import BuyService from "./Api/BuyService"
const CheckAccount= lazy(()=> import("./component/CheckAccount/CheckAccount"))
const NotificationAdmin= lazy(()=> import("./NotificationAdmin/NotificationAdmin"))
const Account= lazy(()=> import("./component/Account/Account"))
const History= lazy(()=> import("./component/History/History"))

export const SocketContext= createContext()
function App() {
  const [user, setUser]= useState(()=> {})
  const [options, setOptions]= useState(()=> {})
  const [socketState, setSocketState]= useState()
  const [callAgain, setCallAgain]= useState(()=> false)
  const [openLogin, setOpenLogin]= useState(()=> false)
  useEffect(()=> {
    const socket= io(`${SERVER_URL}/`, {transports: ["websocket"]})
    setSocketState(()=> socket)
    return ()=> {
      socket.close()
    }
  }, [])
  useEffect(()=> {
    (async()=> {
      nProgress.start()
      const res= await axios({
        url: `${SERVER_URL}/`,
        method: "post",
        data: {
          uid: Cookie.get("uid"),
          sid: Cookie.get("sid")
        },
        responseType: "json"
      })
      nProgress.done()
      const result= await res.data
      setUser(()=> result)
    })()
  }, [callAgain])
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
      <Helmet>
        <link rel="icon" type="image/x-icon" href={"https://res.cloudinary.com/cockbook/image/upload/v1664531959/single/308981729_672379257276086_557721228676906754_n_d5xykl.jpg"} />
        <title>{options?.title ? options?.title : "Loading...."}</title>
      </Helmet>
      <SocketContext.Provider value={{socketState, setCallAgain, openLogin, setOpenLogin, color_code: options?.color_code, user, lang: user?.lang, setUser, dataUser: user?.data}}>
        <Header {...user} {...options} />
        <Navigation {...options} />
        {
          options?.notification_admin?.length > 0 && <Suspense fallback={<></>}>
            <NotificationAdmin notification={options.notification_admin} /></Suspense>
        }
        {
          user?.login=== true &&
          <Menu />
        }
        <BackgroundSide background={options?.background_web} />
        <Routes>
          <Route path="/" element={<Home {...options} {...user?.data} />} />
          <Route path="/check_live_uid" element={<Suspense fallback={<></>}><CheckAccount title={"Check Live Uid"} is_fb={true} /></Suspense>} />
          <Route path="/check_mail" element={<Suspense fallback={<></>}><CheckAccount title={"Check Live HotMail - Gmail"} is_gmail={true} /></Suspense>} />
          <Route path="/get_code_mail" element={<Suspense fallback={<></>}><CheckAccount title={"Get Code Email"} is_get_mail={true} /></Suspense>} />
          <Route path="/*" element={<Suspense fallback={<></>}><NotFound /></Suspense>} />
          <Route path="/auth" element={<Auth socketState={socketState} {...user} />} />
          <Route path={"/2fa/login/auth"} element={<LoginOauth2 />} />
          <Route path={"/api/user/buy"} element={<BuyService />} />
          <Route path={"/api/user/balance"} element={<CheckBalance />} />
          {
            user?.login=== true &&
            <>
              <Route path="/account/*" element={<Suspense fallback={<></>}><Account is_account={true} {...user} /></Suspense>} />
              <Route path="/recharge/*" element={<Suspense fallback={<></>}><Account is_recharge={true} {...user} {...options} /></Suspense>} />
              <Route path="/history" element={<Suspense fallback={<></>}><History {...user} /></Suspense>} />
              <Route path="/authentication/auth/verify" element={<VerifyEmail />} />
            </>
          }
        </Routes>
        <Footer />
      </SocketContext.Provider>
    </Fragment>
  )
}

export default App