import  { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import Header from "./component/Header/Header"
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
      </Routes>
    </Router>
  )
}

export default App