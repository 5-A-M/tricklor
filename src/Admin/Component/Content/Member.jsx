import React from 'react'

const Member = (props) => {
  return (
    <div className="member-stat" style={{width: "100%"}}>
        <ComponentMember />
        <ComponentMember />
        <ComponentMember />
        <ComponentMember />
    </div>
  )
}

const ComponentMember= (props)=> {
    return (
        <div className="component-member" style={{width: "100%", marginBottom: 30, paddingBottom: 16, borderBottom: "1px solid #e7e7e7"}}>
            <div>Tài khoản: <strong><input type="text"value={"giangpt"} style={{fontSize: 18}} /></strong></div>
            <br />
            <div>Mật khẩu: <strong><input type="text"value={"giangpt"} style={{fontSize: 18}} /></strong></div>
        </div>
    )
}

export default Member