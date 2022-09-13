import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddService from './AddService'
import "./Content.sass"
import DangerZone from './DangerZone'
import Member from './Member'
import PassPayment from './PassPayment'
import Stats from './Stats'
import UploadProduct from './UploadProduct'
import X from './X'

const Content = (props) => {
  const array_route= [{path: "/pass_payment", element: <PassPayment />}, {path: "/members", element: <Member />}, {path: "/stats", element: <Stats />}, {path: "/settings", element: <X />}, {path: "/add_service", element: <AddService />}, {path: "/upload_product", element: <UploadProduct />}, {path: "/*", element: <Navigate replace={true} to={"/admin/settings"} />, }, {path: "/danger_zone", element: <DangerZone />}]
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