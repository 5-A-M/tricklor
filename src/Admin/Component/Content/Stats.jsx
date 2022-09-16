import React from 'react'
import SumofRecharge from '../Chart/SumofRecharge'

const Stats = (props) => {
  return (
    <div className="stats-all" style={{width: "100%"}}>
      <div className="brief-all-recharge"><A /></div>
      <div className={"wrap-all-recharge"}>
        <SumofRecharge />
      </div>
    </div>
  )
}

export default Stats

const A= (props)=> {
  return (
    <div className="stats-sum-of-recharge">
      Tổng số tiền mà các thành viên đã nạp: <strong>50000đ</strong>
    </div>
  )
}