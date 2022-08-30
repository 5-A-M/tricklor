import React from 'react'
import Banner from './Banner/Banner'
import HeaderHome from './HeaderHome/HeaderHome'
import "./Home.sass"
import ListProduct from './ListProduct/ListProduct'
import ToolCheck from './ToolCheck/ToolCheck'

const Home = (props) => {
  return (
    <div className="wrapper-home-container">
      <Banner />
      <div className={"home-container"}>
        <ToolCheck />
        <HeaderHome />
        <ListProduct />
      </div>
    </div>
  )
}

export default Home
