import React, { useContext } from 'react'
import { SocketContext } from '../../../App'
import "./HeaderHome.sass"

const HeaderHome = (props) => {
  const { color_code, lang }= useContext(SocketContext)
  return (
    <div className="header-home" style={{background: color_code}} >
      <SubHeaderHome title={lang=== "vn" ? "Bảng giá dịch vụ" : "Service price list"} color_code={color_code} />
    </div>
  )
}

const SubHeaderHome = (props) => {
    return (
    <div className="sub-header-home">
        <div className="sub-header-home__content" style={{color: props.color_code}}>
            {props.title}
        </div>
    </div>
)
}

export default HeaderHome
