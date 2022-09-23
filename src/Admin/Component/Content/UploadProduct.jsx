import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../../config/config";
// import Alert from "../Alert/Alert";

const UploadProduct = (props) => {
  const [name1, setName1]= useState(()=> "")
  const [data1, setData1]= useState(()=> "")
  const [name2, setName2]= useState(()=> "")
  const [data2, setData2]= useState(()=> "")
  const showFile1 = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      setData1(()=> text)
      const res= await axios({
        url: `${SERVER_URL}/up/any/service`,
        method: "post",
        data: {
          name: name1,
          data: text
        },
        responseType: "json",
      })
      const result= await res.data
      console.log(result)
      return window.location.reload()
    };
    reader.readAsText(e.target.files[0])
  }
  const showFile2 = async (e) => {
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text = (e.target.result)
        setData2(()=> text)
        const res = await axios({
        url: `${SERVER_URL}/upload_file/hotmail`,
        method: "post",
        data: {
          name: name2,
          data: text
        },
      });
      const result = await res.data;
      console.log(result)
      return window.location.reload()
    };
    reader.readAsText(e.target.files[0])
  }


  
  return (
    <div className="upload-product" style={{ width: "100%" }}>
      <div>Upload file hotmail</div>
      <br />
      <div>
        Nhập tên dịch vụ{" "}
        <input
          style={{ width: 300, height: 40, fontSize: 18 }}
          placeholder="Vui lòng nhập đúng tên dịch vụ"
          type="text"
          onChange={(e) => setName1(e.target.value)}
        />
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <input
          onChange={(e) => showFile1(e)}
          type="file"
          title={""}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            cursor: "pointer",
            zIndex: 3,
          }}
        />
        <Button variant={"contained"}>Chọn file(chỉ chọn file text)</Button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>Upload file gmail</div>
      <br />
      <div>
        Nhập tên dịch vụ{" "}
        <input
          style={{ width: 300, height: 40, fontSize: 18 }}
          placeholder="Vui lòng nhập đúng tên dịch vụ"
          type="text"
          onChange={(e) => setName2(e.target.value)}
        />
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <input
          onChange={(e) => showFile2(e)}
          type="file"
          title={""}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            cursor: "pointer",
            zIndex: 3,
          }}
        />
        <Button variant={"contained"}>Chọn file(chỉ chọn file text)</Button>
      </div>
      {/* <Alert open={} duration={2500} message={"Cập nhật thành công"} /> */}
      <br />
      <App />
    </div>
  );
};

function App() {
  const [name, setName]= useState(()=> "")
  const [data, setData]= useState(()=> "")
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      setData(()=> text)
      const res= await axios({
        url: `${SERVER_URL}/up/any/service`,
        method: "post",
        data: {
          name: name,
          data: text
        },
        responseType: "json",
      })
      const result= await res.data
      console.log(result)
      return window.location.reload()
    };
    reader.readAsText(e.target.files[0])
  }
  return (<div>
    <br />
    <br />

    <div style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Upload dịch vụ bất kỳ</div>
    <div>
        Nhập tên dịch vụ{" "}
        <input
          style={{ width: 300, height: 40, fontSize: 18 }}
          placeholder="Vui lòng nhập đúng tên dịch vụ"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ position: "relative", margin: "16px 0"}}>
        <input
          onChange={(e) => showFile(e)}
          type="file"
          title={""}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            cursor: "pointer",
            zIndex: 3,
          }}
        />
        <Button variant={"contained"}>Chọn file(chỉ chọn file text)</Button>
      </div>
  </div>
  )
}

export default UploadProduct;
