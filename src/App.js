import  { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckAccount from "./component/CheckAccount/CheckAccount"
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import Home from "./component/Home/Home"
import Navigation from "./component/Navigation/Navigation"
import "./style.sass"

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check_live_uid" element={<CheckAccount title={"Check Live Uid"} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App