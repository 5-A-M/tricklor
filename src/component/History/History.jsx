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
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

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
            <Notifi />
            <table className="history-transfer-table" cellSpacing={0}>
                <Header />
                <Body history={history} />
            </table>
        </div>
    </div>
  )
}
//

const Notifi= (props)=> {
    const { lang, color_code }= useContext(SocketContext)
    return (
        <div className={"notify-auto-delete-history"} style={{width: "100%", height: 50, padding: "0 10px", display: "flex", alignItems: "center", gap: 16, background: color_code, borderBottom: "1px solid #e7e7ee", color: "#fff"}}>
            <ManageHistoryIcon style={{color: "#fff", width: 24, height: 24}} />
            <div className={"dv-v-a"}>{lang=== "vn" ? "Lịch sử giao dịch sẽ được tự động xóa sau 6h sáng hàng ngày" : "Transaction history will be automatically deleted after 6am every day"}</div>
        </div>
    )
}

const Header= (props)=> {
    const { color_code, lang }= useContext(SocketContext)
    return (
        <thead className="wrapper-history-transfer-header" style={{background: color_code}}>
            <tr>
                <th>{lang=== "vn" ? "mã hóa đơn" : "receipt code"}</th>
                <th>{lang=== "vn" ? "số tiền" : "Amount"}</th>
                <th>{lang=== "vn" ? "trạng thái" : "Status"}</th>
                <th>{lang=== "vn" ? "ghi chú" : "Note"}</th>
                <th>{lang=== "vn" ? "ngày" : "Date"}</th>
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
    const { color_code, lang }= useContext(SocketContext)
    return (
        <tbody className="wrapper-history-transfer-body">
            {
                props?.history?.map((item, key)=> <tr key={item.code_receipt}>
                <td>{item.code_receipt}</td>
                <td className="wrapper-history-transfer-header-td-2" style={{color: parseInt(item.amount) < 0 ? "red" : "#1fa64d"}}><NumberFormat thousandSeparator={true} displayType={"text"} value={item.amount} suffix={"đ"} /></td>
                <td style={{color: item.state=== true ? "green" : "red"}} className="wrapper-history-transfer-header-td-3">{item.state=== true ? (lang=== "vn" ? "Thành công" : "Success") : (lang=== "vn" ? "Thất bại" : "Failed")}</td>
                <td>{item.note=== "Mua tài khoản thành công" && (lang=== "vn" ?"Mua tài khoản thành công": "Buy account successfully")}
                    {item.note=== "Mua tài khoản thất bại" && (lang=== "vn" ?"Mua tài khoản thất bại": "Buy account failed")}
                    {item.note=== "Nạp tiền từ hệ thống" && (lang=== "vn"? "Nạp tiền từ hệ thống" : "Recharge from system")}
                    {item.note!== "Mua tài khoản thành công" && item.note!== "Mua tài khoản thất bại" && item.note!== "Nạp tiền từ hệ thống" && (lang=== "vn" ? item.note : item.note.replace("Mua tài khoản", "Buy"))}
                </td>
                <td>{moment(item.time).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td><Button onClick={()=> {setOpen(()=> true);setCodeReceipt(()=> item.code_receipt)}} variant={"contained"}>{lang=== "vn" ? "Chi tiết" : "Detail"}</Button></td>
            </tr>)
            }
            <DetailOrder id_order={codeReceipt} open={open} handleClose={handleClose} />
            {/* footer */}
            <tr>
                <td><section style={{float: "left", fontSize: 16, fontWeight: 600}}>{lang=== "vn"? "Tổng" : "Sum"}: {props?.history?.length} {lang=== "vn" ? "Giao dịch" : "Transaction"}</section></td>
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

