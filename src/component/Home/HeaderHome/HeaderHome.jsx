import React from 'react'
import "./HeaderHome.sass"

const HeaderHome = (props) => {
  return (
    <div className="header-home">
      <SubHeaderHome title={"Bảng giá dịch vụ"} />
    </div>
  )
}

const SubHeaderHome = (props) => {
    return (
    <div className="sub-header-home">
        <div className="sub-header-home__content">
            {props.title}
        </div>
    </div>
)
}

export default HeaderHome
