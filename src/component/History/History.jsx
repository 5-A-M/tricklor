import React from 'react'
import "./History.sass"

const History = (props) => {
  return (
    <div className="wrapper-history-transfer">
        <div className="history-transfer">
            <table className="history-transfer-table" cellSpacing={0}   >
                <Header />
                <Body />
            </table>
        </div>
    </div>
  )
}

const Header= (props)=> {
    return (
        <thead className="wrapper-history-transfer-header">
            <tr>
                <th>mã hóa đơn</th>
                <th>số tiền</th>
                <th>trạng thái</th>
                <th>ghi chú</th>
                <th>ngày</th>
            </tr>
        </thead>
    )
}

const Body= (props)=> {
    return (
        <tbody className="wrapper-history-transfer-body">
            <tr>
                <td>AYAPZRDB5N</td>
                <td className="wrapper-history-transfer-header-td-2">1.000đ</td>
                <td className="wrapper-history-transfer-header-td-3">Thành công</td>
                <td>Nạp tiền qua VIETCOMBANK</td>
                <td>2022-09-03 21:14:08</td>
            </tr>
            <tr>
                <td>AYAPZRDB5N</td>
                <td className="wrapper-history-transfer-header-td-2">1.000đ</td>
                <td className="wrapper-history-transfer-header-td-3">Thành công</td>
                <td>Nạp tiền qua VIETCOMBANK</td>
                <td>2022-09-03 21:14:08</td>
            </tr>
            <tr>
                <td><section style={{float: "left", fontSize: 16, fontWeight: 600}}>Tổng: 2 Giao dịch</section></td>
                <td className="wrapper-history-transfer-header-td-2"></td>
                <td className="wrapper-history-transfer-header-td-3"></td>
                <td></td>
                <td><section style={{width: 32, height: 32, background: "#49b66e", display: "flex", justifyContent: 'center', alignItems: "center", color: "#fff", float: "right"}}>1</section></td>
            </tr>
        </tbody>
    )
}

export default History