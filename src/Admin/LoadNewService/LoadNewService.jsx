import { Button } from '@mui/material'
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
  
  return (
    <div className={"load-new-service"} style={{width: "100%"}}>
        {
            data && data?.map((item, key)=> <EachService key={key} {...item} />)
        }
    </div>
  )
}

export default LoadNewService

const EachService= (props)=> {
    const [data, setData]= useState(()=> [])
    const [add, setAdd]= useState(()=> false)
    // eslint-disable-next-line
    const [service, setService]= useState(()=> [])
    // array
    const [addS, setAddS]= useState(()=> [])
    const [addE, setAddE]= useState(()=> "")
    useEffect(()=> {
        if(props?.id_service) {
            (async()=> {
                const res= await axios({
                    url: `${SERVER_URL}/detail/c/service`,
                    method: "get",
                    params: {
                        id_service: props?.id_service
                    },
                    responseType: "json"
                })
                const result= await res.data
                return setData(()=> result.data)
            })()
        }
    }, [props?.id_service])
    // each
    const addService= async()=> {
        const res= await axios({
            url : `${SERVER_URL}/create/service`,
            method: "post",
            data: {
                menu: addS,
                id_service: props.id_service 
            },
            responseType: "json"
        })
        const result= await res.data
        window.location.reload()
        return console.log(result)
    }
    
    const deleteService= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/delete/a/service`,
            method: "post",
            responseType: "json",
            data: {
                id_delete: props.id_service
            }
        })
        const result= await res.data
        window.location.reload()
        return console.log(result)
    }
    const [dX, setDX]= useState(()=> false)
    const [addPrice, setAddPrice]= useState(()=> false)
    const [price, setPrice]= useState(()=> 0)

     const addPriceFunction= async ()=> {
        const res= await axios({
            url: `${SERVER_URL}/add/price/c/service`,
            method: "post",
            data: {
                price: price,
                id_service: props.id_service
            },
            responseType: "json"
        })
        const  result= await res.data
        window.location.reload()
        return console.log(result)
     }
    return (
        <div className={"wrap-load-new-service"}>
                <div style={{ fontSize: 20, margin: "16px 0" }}>{props?.title}</div>
                <table
                    cellSpacing={0}
                    className="table-add-service"
                    style={{ width: "100%", border: "1px solid #fff" }}
                >
                    <thead className="thead-table-add-service" >
                        <tr
                            onMouseEnter={()=> setDX(()=> true)}
                            onMouseLeave={()=> setDX(()=> false)}
                            className="tr-table-add-service"
                            style={{ border: "1px solid #fff", position: "relative" }}
                        >
                            {
                                props?.menu?.map((item, key)=> <th key={key}><div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><span>{item.name}</span><img alt={"open"} src={item.icon} style={{width: 24, height: 24, objectFit: "cover"}} /></div></th>)
                            }
                            {
                                dX=== true && <th><Button onClick={()=> deleteService()} variant={"contained"}>Xóa dịch vụ</Button></th>
                            }
                        </tr>
                    </thead>
                    {/*  */}
                    {/* body */}
                    <tbody className="tbody-table-add-service">
                        {
                            data && data?.map((item, key)=> <DetailTr key={key} {...item} />)
                        }
                        {
                            add=== true && <tr className="tr-table-add-service">
                                {
                                    Array.from(Array(props?.menu?.length).keys()).map((item, key)=> <td key={key}>
                                    <input
                                    // onChange={(e) =>
                                    //     setA((prev) => ({ ...prev, a1: e.target.value }))
                                    // }
                                    onChange={(e)=> setAddE(e.target.value)}
                                    onBlur={()=> {
                                        setAddS(prev=> ([...prev, addE]))
                                        setAddE(()=> "")
                                    }}
                                    type="text"
                                    style={{ fontSize: 16 }}
                                    />
                                </td>)
                                }
                            </tr>
                        }
                    </tbody>
                   {/*  */}
                </table>
                <br />
                <div>
                    <span><strong>Giá</strong>: {props?.price ? props?.price : "Chưa có"}</span>
                </div>
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
                <div style={{margin: "16px 0"}}>
                    <Button variant={"contained"} onClick={()=> setAddPrice(prev=> !prev)}>{addPrice=== false ? "Thêm giá" : "Hủy bỏ"}</Button>
                </div>
                {
                    addPrice=== true && <div style={{margin: "16px 0"}}><input onChange={(e)=> setPrice(parseInt(e.target.value))} type="number" style={{width: 300, height: 50}} placeholder={"Nhập giá vào đây"} /></div>
                }
                {
                    parseInt(price) > 0 && <Button onClick={()=> addPriceFunction()} variant={"contained"}>Thêm</Button>
                }
            </div>
    )
}

const DetailTr= (props)=> {
    const [deleteS, setDeleteS]= useState(()=> false)
    const deleteXXX= async()=> {
        const res= await axios({
            url: `${SERVER_URL}/delete/c/service`,
            method :"post",
            data: {
                id_delete: props.id_xxx
            },
            responseType: "json"
        })
        const result= await res.data
        window.location.reload()
        return console.log(result)
    }
    return (
        <tr onMouseEnter={()=> setDeleteS(()=> true)} onMouseLeave={()=> setDeleteS(()=> false)} className="tr-table-add-service">
            {
                props?.menu?.map((item, key)=> <td key={key}><div style={{display: "flex", justifyContent: "center", }}>{item}</div></td>)
            }
            {
                deleteS=== true && <td><Button onClick={()=> deleteXXX()} variant={"contained"}>Xóa</Button></td>
            }
        </tr>
    )
}