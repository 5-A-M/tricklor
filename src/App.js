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
  useEffect(()=> {
    const socket= io(`${SERVER_URL}/`, {transports: ["websocket"]})
    setSocketState(()=> socket)
    return ()=> {
      socket.close()
    }
  }, [])
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
        <link rel="icon" type="image/x-icon" href={options?.logo} />
        <title>{options?.title ? options?.title : "Loading...."}</title>
      </Helmet>
      <SocketContext.Provider value={{socketState, setCallAgain}}>
        <Header {...user} {...options} />
        <Navigation {...options} />
        {
          options?.notification_admin?.length > 0 && <Suspense fallback={<></>}><NotificationAdmin notification={options.notification_admin} /></Suspense>
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
          {
            user?.login=== true &&
            <>
              <Route path="/account/*" element={<Suspense fallback={<></>}><Account is_account={true} {...user} /></Suspense>} />
              <Route path="/recharge/*" element={<Suspense fallback={<></>}><Account is_recharge={true} {...user} {...options} /></Suspense>} />
              <Route path="/history" element={<Suspense fallback={<></>}><History {...user} /></Suspense>} />
              <Route path="/auth" element={<Auth {...user} />} />
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