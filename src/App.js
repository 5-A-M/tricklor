import  { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckAccount from "./component/CheckAccount/CheckAccount"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import Home from "./component/Home/Home"
import Navigation from "./component/Navigation/Navigation"
import "./style.sass"
import Menu from "./component/Menu/Menu"
import Account from "./component/Account/Account"
import History from "./component/History/History"

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check_live_uid" element={<CheckAccount title={"Check Live Uid"} is_fb={true} />} />
        <Route path="/check_mail" element={<CheckAccount title={"Check Live HotMail - Gmail"} is_gmail={true} />} />
        <Route path="/get_code_mail" element={<CheckAccount title={"Get Code Email"} is_get_mail={true} />} />
        <Route path="/account/*" element={<Account is_account={true} />} />
        <Route path="/recharge/*" element={<Account is_recharge={true} />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App