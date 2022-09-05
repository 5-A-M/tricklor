import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { SERVER_URL } from "../../../config/config";
import Alert from "../Alert/Alert";

const UploadProduct = (props) => {
    const [file, setFile]= useState()
    const [file2, setFile2]= useState()
  const [service, setService] = useState(() => "");
  const [service2, setService2]= useState(()=> "")
  const [message, setMessage]= useState(()=> "")
  const [open, setOpen]= useState(()=> false)
  const handleFile = async (e) => {
    setFile(e.target.files)
    const res = await axios({
      url: `${SERVER_URL}/upload_file/hotmail`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: { file: Object.values(e.target.files)[0], name: service },
    });
    const result = await res.data;
    setOpen(()=> true)
    setTimeout(()=> {
        setOpen(()=> false)
        setFile(()=> "")
        window.location.reload()
    }, 3000)
    
    return console.log(result);
  };
  
  const handleFile2 = async (e) => {
    setFile2(e.target.files)
    const res = await axios({
      url: `${SERVER_URL}/upload_file/gmail`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: { file: Object.values(e.target.files)[0], name: service2 },
    });
    const result = await res.data;
    setOpen(()=> true)
    setTimeout(()=> {
        setOpen(()=> false)
        setFile2(()=> "")
        window.location.reload()
    }, 3000)
    return console.log(result);
  };

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
          onChange={(e) => setService(e.target.value)}
        />
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <input
        
          onChange={(e) => handleFile(e)}
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
          onChange={(e) => setService2(e.target.value)}
        />
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <input
          onChange={(e) => handleFile2(e)}
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
      <Alert open={open} duration={2500} message={"Cập nhật thành công"} />
    </div>
  );
};

export default UploadProduct;
