import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SERVER_URL } from '../../config/config'
import Cookie from "js-cookie"
import "./History.sass"
import NumberFormat from 'react-number-format'
import moment from "moment"
import { Button } from '@mui/material'
import { lazy } from 'react'
import nProgress from 'nprogress'
import { SocketContext } from '../../App'

const DetailOrder= lazy(()=> import("./DetailOrder"))

const History = (props) => {
  const [history, setHistory]= useState(()=> [])
  useEffect(()=> {
    (async()=> {
        nProgress.start()
        const res= await axios({
            url: `${SERVER_URL}/history`,
            method: "get",
            responseType: "json",
            params: {
                id_user: Cookie.get("uid")
            }
        })
        const result= await res.data
        nProgress.done()
        setHistory(()=> result.data)
    })()
  }, [])
  return (
    <div className="wrapper-history-transfer">
        <div className="history-transfer">
            <table className="history-transfer-table" cellSpacing={0}   >
                <Header />
                <Body history={history} />
            </table>
        </div>
    </div>
  )
}

const Header= (props)=> {
    const { color_code }= useContext(SocketContext)
    return (
        <thead className="wrapper-history-transfer-header" style={{background: color_code}}>
            <tr>
                <th>mã hóa đơn</th>
                <th>số tiền</th>
                <th>trạng thái</th>
                <th>ghi chú</th>
                <th>ngày</th>
                <th></th>
            </tr>
        </thead>
    )
}

const Body= (props)=> {
    const [open, setOpen]= useState(()=> false)
    const [codeReceipt, setCodeReceipt]= useState(()=> "")
    const handleClose= ()=> {
        setOpen(()=> false)
        setCodeReceipt(()=> "")
    }
    const { color_code }= useContext(SocketContext)
    return (
        <tbody className="wrapper-history-transfer-body">
            {
                props?.history?.map((item, key)=> <tr key={item.code_receipt}>
                <td>{item.code_receipt}</td>
                <td className="wrapper-history-transfer-header-td-2" style={{color: parseInt(item.amount) < 0 ? "red" : "#1fa64d"}}><NumberFormat thousandSeparator={true} displayType={"text"} value={item.amount} suffix={"đ"} /></td>
                <td className="wrapper-history-transfer-header-td-3">{item.state=== true ? "Thành công" : "Thất bại"}</td>
                <td>{item.note}</td>
                <td>{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td><Button onClick={()=> {setOpen(()=> true);setCodeReceipt(()=> item.code_receipt)}} variant={"contained"}>Chi tiết</Button></td>
            </tr>)
            }
            <DetailOrder id_order={codeReceipt} open={open} handleClose={handleClose} />
            {/* footer */}
            <tr>
                <td><section style={{float: "left", fontSize: 16, fontWeight: 600}}>Tổng: {props?.history?.length} Giao dịch</section></td>
                <td className="wrapper-history-transfer-header-td-2"></td>
                <td className="wrapper-history-transfer-header-td-3"></td>
                <td></td>
                <td></td>
                <td><section style={{width: 32, height: 32, background: color_code, display: "flex", justifyContent: 'center', alignItems: "center", color: "#fff", float: "right"}}>1</section></td>
            </tr>
            
        </tbody>
    )
}



export default History

