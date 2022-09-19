import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config/config'

const LoadNewService = (props) => {
  const [data, setData]= useState(()=> [])
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/get/service`,
            method: "get", 
            responseType: "json",
        })
        const result= await res.data.data
        return setData(()=> result)
    })()
  }, [])
  const [add, setAdd]= useState(()=> false)
  const [service, setService]= useState(()=> [])
  const addService= async()=> {

  }
  return (
    <div className={"load-new-service"} style={{width: "100%"}}>
        {
            data && data?.map((item, key)=> <div className={"wrap-load-new-service"} key={key}>
                <div style={{ fontSize: 20, margin: "16px 0" }}>{item.title}</div>
                <table
                    cellSpacing={0}
                    className="table-add-service"
                    style={{ width: "100%", border: "1px solid #fff" }}
                >
                    <thead className="thead-table-add-service" >
                        <tr
                            className="tr-table-add-service"
                            style={{ border: "1px solid #fff", position: "relative" }}
                        >
                            {
                                item?.menu?.map((item, key)=> <th key={key}>{item}</th>)
                            }
                        </tr>
                    </thead>
                    {/*  */}
                    {/* body */}
                   {/*  */}
                </table>
                <br />
                <button
                onClick={() => setAdd((prev) => !prev)}
                style={{
                background: "#2e89ff",
                color: "#fff",
                fontWeight: 600,
                padding: "16px 30px",
                fontSize: 18,
                border: "none",
                outline: "none",
                borderRadius: 80,
                cursor: "pointer",
                }}
                className="btn-add-server-hotmail-outlook"
            >
                {add === false ? "Thêm dịch vụ" : "Hủy"}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {add === true && (
                <button
                onClick={() => addService()}
                style={{
                    background: "#2e89ff",
                    color: "#fff",
                    fontWeight: 600,
                    padding: "16px 30px",
                    fontSize: 18,
                    border: "none",
                    outline: "none",
                    borderRadius: 80,
                    cursor: "pointer",
                }}
                className="btn-add-server-hotmail-outlook"
                >
                Lưu
                </button>)}
            </div>)
        }
    </div>
  )
}

export default LoadNewService