import React from 'react'
import { Route, Routes } from 'react-router-dom'
import "./Content.sass"
import Member from './Member'
import PassPayment from './PassPayment'
import Stats from './Stats'
import X from './X'

const Content = (props) => {
  const array_route= [{path: "/pass_payment", element: <PassPayment />}, {path: "/members", element: <Member />}, {path: "/stats", element: <Stats />}, {path: "/settings", element: <X />}]
  return (
    <div className="content-menu" style={{display: "flex", width: "calc(100% - 300px)", minHeight: "100%", padding: 10}}>
        <Routes>
            {
                array_route.map((item, key)=> <Route key={key} path={item.path} element={item.element} />)
            }
        </Routes>
    </div>
  )
}

export default Content