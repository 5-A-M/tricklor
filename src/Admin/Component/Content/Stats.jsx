import React from 'react'
import SumofRecharge from '../Chart/SumofRecharge'
import SumofSubscribe from '../Chart/SumofSubscribe'
import History from '../History/History'

const Stats = (props) => {
  return (
    <div className="stats-all" style={{width: "100%"}}>
      
      <div className={"wrap-all-recharge"}>
        <SumofRecharge />
      </div>
      <br />
      <br />
      <div className={"wrap-all-recharge"}>
        <SumofSubscribe />
      </div>
      <br />
      <br />
      <History />
    </div>
  )
}

export default Stats



