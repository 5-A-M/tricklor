import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { SERVER_URL } from "../../../config/config";
import AddServiceComponent from "../../AddServiceComponent/AddServiceComponent";
import LoadNewService from "../../LoadNewService/LoadNewService";
import Alert from "../Alert/Alert";

const AddService = (props) => {
  const [alert, setAlert] = useState(() => false);
  // eslint-disable-next-line
  const [data1, setData1] = useState(() => []);
  // eslint-disable-next-line
  const [data2, setData2] = useState(() => []);
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/hotmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData1(() => result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/gmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData2(() => result);
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/hotmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData1(() => result);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/gmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData2(() => result);
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // eslint-disable-next-line
  const [add1, setAdd1] = useState(() => false);
  // eslint-disable-next-line
  const [add2, setAdd2] = useState(() => false);
  // eslint-disable-next-line
  const [{ a1, a2, a3, a4, a5 }, setA] = useState(() => ({
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
  }));
  // eslint-disable-next-line
  const [{ b1, b2, b3, b4, b5 }, setB] = useState(() => ({
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: "",
  }));
  // eslint-disable-next-line
  const addHotmail = async () => {
    const res = await axios({
      url: `${SERVER_URL}/edit/add/hotmail`,
      method: "post",
      responseType: "json",
      data: {
        a1,
        a2,
        a3,
        a4,
        a5,
      },
    });
    const result = await res.data;
    setAlert(() => true);
    setTimeout(() => {
      setAlert(() => false);
    }, 2500);
    setAdd1(() => false);
    return console.log(result);
  };
  // eslint-disable-next-line
  const addGmail = async () => {
    const res = await axios({
      url: `${SERVER_URL}/edit/add/gmail`,
      method: "post",
      responseType: "json",
      data: {
        b1,
        b2,
        b3,
        b4,
        b5,
      },
    });
    const result = await res.data;
    setAlert(() => true);
    setTimeout(() => {
      setAlert(() => false);
    }, 2500);
    setAdd2(() => false);
    return console.log(result);
  };
  // eslint-disable-next-line
  const [addColumn1, setAddColumn1]= useState(()=> false)
  // eslint-disable-next-line
  const [addColumn2, setAddColumn2]= useState(()=> false)

  return (
    <Fragment>
      <div style={{ width: "100% " }}>
        {/*  */}
        {/*  */}
        <LoadNewService />
        <br />
        <br />
        <AddItem />
      </div>
      <Alert duration={3000} message={"Cập nhật thành công"} open={alert} />
    </Fragment>
  );
};

export default AddService;

// eslint-disable-next-line
const Tr1= (props)=> {
  const [openDelete1, setOpenDelete1]= useState(()=> false)
  const deleteService1= async (id)=> {
    const res= await axios({
      url: `${SERVER_URL}/edit/delete/hotmail`,
      method: "post",
      responseType: "json",
      data: {
        id: props.id
      }
    })
    const result= await res.data
    return console.log(result)
  }
  return (
    <tr
      onMouseEnter={()=> setOpenDelete1(()=> true)}
      onMouseLeave={()=> setOpenDelete1(()=> false)}
      key={props._id}
      className="tr-table-add-service"
      style={{ border: "1px solid #fff", position: "relative" }}
    >
      <td>{props.title}</td>
      <td>{props.pop3}</td>
      <td>{props.live}</td>
      <td><img src={props.nation} alt="flag" style={{width: 32, height: 24, objectFit: "cover"}} /></td>
      <td><NumberFormat thousandSeparator={true} value={props.price} displayType={"text"} suffix={"đ"} /></td>
      {
        openDelete1=== true && <div style={{height: "100%", position: 'absolute', top: 0, right: "100%", display: "flex", justifyContent: "center", alignItems: 'center', gap: 16}}>
          <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "red", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px"}}>Xóa</button>
          {/* <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "#2e89ff", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px", whiteSpace: 'nowrap'}}>Thêm cột</button> */}
        </div>
      }
    </tr>
  )
}

// eslint-disable-next-line
const Tr2= (props)=> {
  const [openDelete1, setOpenDelete1]= useState(()=> false)
  const deleteService1= async (id)=> {
    const res= await axios({
      url: `${SERVER_URL}/edit/delete/gmail`,
      method: "post",
      responseType: "json",
      data: {
        id: props.id
      }
    })
    const result= await res.data
    return console.log(result)
  }
  return (
    <tr
      onMouseEnter={()=> setOpenDelete1(()=> true)}
      onMouseLeave={()=> setOpenDelete1(()=> false)}
      key={props._id}
      className="tr-table-add-service"
      style={{ border: "1px solid #fff", position: "relative" }}
    >
      <td>{props.title}</td>
      <td>{props.pop3}</td>
      <td>{props.live}</td>
      <td><img src={props.nation} alt="flag" style={{width: 32, height: 24, objectFit: "cover"}} /></td>
      <td><NumberFormat thousandSeparator={true} value={props.price} displayType={"text"} suffix={"đ"} /></td>
      
      {
        openDelete1=== true && <div style={{height: "100%", position: 'absolute', top: 0, right: "100%", display: "flex", justifyContent: "center", alignItems: 'center'}}>
          <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "red", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px"}}>Xóa</button>
          {/* <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "#2e89ff", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px", whiteSpace: 'nowrap'}}>Thêm cột</button> */}
        </div>
      }
    </tr>
  )
}

const AddItem= (props)=> {
  const [open, setOpen]= useState(()=> false)
  return (
    <div style={{width: "100%"}}>
      <button onClick={()=> setOpen((prev)=> !prev)} style={{padding: "10px 30px", backgroundColor: "#2e89ff", borderRadius: 80, fontWeight: 600, color: "#fff", cursor: "pointer"}}>{open=== false ? "Thêm dịch vụ" : "hủy"}</button>
      <br />
      <br />
      <br />
      <AddServiceComponent open={open} setOpen={setOpen} />
    </div>
  )
}