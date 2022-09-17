import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SERVER_URL } from '../../../config/config'

const History = (props) => {
  const [history, setHistory]= useState(()=> [])
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/ad/history`,
            method: "post",
            responseType: "json"
        })
        const result= await res.data
        return setHistory(()=> result)
    })()
  }, [])
  return (
    <div>
        <div style={{margin: "16px 0", fontSize: 20, fontWeight: 600}}>Lịch sử nạp của thành viên</div>
        <div className="w-table-of-history-ad" style={{width: "100%", overflowX: "auto"}}>
            <table cellSpacing={0} className="table-of-history-ad" style={{width: "100%"}}>
                <thead className="thead-table-of-history-ad" >
                    <tr className="th-thead-table-of-history-ad">
                        <th>Mã hóa đơn</th>
                        <th>Tên tài khoản</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody className="tbody-table-of-history-ad">
                    <tr className="tr-tbody-table-of-history-ad">
                        <td style={{textAlign: "center"}}>Mã hóa đơn</td>
                        <td style={{textAlign: "center"}}>Tên tài khoản</td>
                        <td style={{textAlign: "center"}}>Số tiền</td>
                        <td style={{textAlign: "center"}}>tdời gian</td>
                        <td style={{textAlign: "center"}}>Trạng tdái</td>
                        <td style={{textAlign: "center"}}>Chi tiết</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default History