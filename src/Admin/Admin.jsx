import React from 'react'
import "./Admin.sass"
import Content from './Component/Content/Content'
import Menu from './Component/Menu/Menu'

const Admin = (props) => {
  return (
    <div className="admin-page">
        <Menu />
        <Content />
    </div>
  )
}

export default Admin