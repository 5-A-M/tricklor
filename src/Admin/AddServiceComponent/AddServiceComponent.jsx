import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { SERVER_URL } from '../../config/config'

const AddServiceComponent = (props) => {
  const [nameService, setNameService]= useState(()=> "")
  const [continue1, setContinue1]= useState(()=> false)
  const [functionality, setFunctionality]= useState(()=> false)
  const [arrF, setArrF]= useState(()=> [])
  const [name, setName]= useState(()=> "")
  const [numberArray, setNumberArray]= useState(()=> 1)
  const createNewService= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/create/new_service`,
        method: "post",
        responseType: "json",
        data: {
            title: nameService,
            menu: arrF
        }
    })
    const result= await res.data
    window.location.reload()
    return console.log(result)
  }
  return (
    <div className="add-service-component">
        {
        props.open=== true && <div>
          <div>Nhập dịch vụ:&nbsp;&nbsp;<input onChange={(e)=> setNameService(e.target.value)} type="text" placeholder="Nhập dịch vụ VD: Clone Facebook" style={{height: 40, fontSize: 18, width: 400}}/></div>
          {
            nameService.length > 0 && <Button onClick={()=> setContinue1(()=> true)} variant={"contained"}>Tiếp tục</Button>
          }
          {
            continue1=== true && <div>Tên dịch vụ: <strong style={{fontSize: 20}}>{nameService}</strong></div>
          }
          {
            continue1=== true && <div>Điền các thông số trên menu</div>
            
          }
          {
            continue1=== true && Array.from(Array(numberArray).keys()).map(key=> <div style={{margin: "16px 0"}}><input placeholder={"Điền menu"} type="text" onChange={(e)=> setName(()=> e.target.value)} style={{height: 50, fontSize: 18}} /></div>)
          }
          {
            continue1=== true && <div style={{display: "flex", justifyContent: 'center', alignItems: "center", gap: 16}}>
                <Button disabled={name.length > 0 ? false : true} onClick={(e)=> {setNumberArray(prev=> parseInt(prev) + 1); setArrF(prev=> ([...prev, name])); setName(()=> "")}} variant={"contained"}>Thêm</Button>
                <Button onClick={()=> createNewService()} variant={"outlined"}>Xong</Button>
                <Button onClick={()=> {setContinue1(()=> false); setNameService(()=> "")}} style={{background: "red"}} variant={"contained"}>Hủy</Button>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default AddServiceComponent