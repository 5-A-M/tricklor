import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { SERVER_URL } from "../../../config/config";
import Alert from "../Alert/Alert";

const AddService = (props) => {
  const [alert, setAlert] = useState(() => false);
  const [data1, setData1] = useState(() => []);
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

  const [add1, setAdd1] = useState(() => false);
  const [add2, setAdd2] = useState(() => false);
  const [{ a1, a2, a3, a4, a5, a6 }, setA] = useState(() => ({
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
  }));
  const [{ b1, b2, b3, b4, b5, b6 }, setB] = useState(() => ({
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: "",
  }));
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
        a6,
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
        b6,
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
  const [addColumn1, setAddColumn1]= useState(()=> false)
  const [addColumn2, setAddColumn2]= useState(()=> false)

  return (
    <Fragment>
      <div style={{ width: "100% " }}>
        <div className="add-service" style={{ width: "100%" }}>
          <div style={{ fontSize: 20, margin: "16px 0" }}>
          </div>
            Dịch vụ Hotmail + Outlook
            {/* &nbsp;<span style={{padding: "10px 30px", borderRadius: 80, color: "#fff", background: "#2e89ff", cursor: "pointer"}}>Xóa</span> */}
          <table
            cellSpacing={0}
            className="table-add-service"
            style={{ width: "100%", border: "1px solid #fff" }}
          >
            <thead className="thead-table-add-service" onMouseEnter={()=> setAddColumn1(()=> true)} onMouseLeave={()=> setAddColumn1(()=> false)}>
              <tr
                className="tr-table-add-service"
                style={{ border: "1px solid #fff" }}

              >
                <th>Hotmail + Outlook</th>
                <th>Pop3</th>
                <th>Live</th>
                <th>Quốc gia</th>
                <th>Giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody className="tbody-table-add-service">
              {data1?.data?.map((item, key) => (
                <Tr1 key={key} {...item} />
              ))}
              {add1 === true && (
                <tr className="tr-table-add-service">
                  <td>
                    <input
                      onChange={(e) =>
                        setA((prev) => ({ ...prev, a1: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setA((prev) => ({ ...prev, a2: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setA((prev) => ({ ...prev, a3: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <select style={{width: '100%', height: '100%'}} onChange={(e) =>
                        setA((prev) => ({ ...prev, a4: e.target.value }))
                      }>
                        <option value="https://dongvanfb.com/_nuxt/vn.dfdf7f52.svg">Việt Nam</option>
                        <option value="https://dongvanfb.com/_nuxt/us.92d14a6a.svg">Mĩ</option>
                        <option value="https://dongvanfb.com/_nuxt/gb.245f5b3f.svg">Anh</option>
                      </select>
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setA((prev) => ({ ...prev, a5: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setA((prev) => ({ ...prev, a6: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <button
            onClick={() => setAdd1((prev) => !prev)}
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
            {add1 === false ? "Thêm dịch vụ Hotmail + Outlook" : "Hủy"}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {add1 === true && (
            <button
              onClick={() => addHotmail()}
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
            </button>
          )}
        </div>
        <br />
        <br />
        <br />
        {/*
         */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="add-service" style={{ width: "100%" }}>
          <div style={{ fontSize: 20, margin: "16px 0" }}>Dịch vụ Gmail</div>
          <table
            cellSpacing={0}
            className="table-add-service"
            style={{ width: "100%", border: "1px solid #fff" }}
          >
            <thead className="thead-table-add-service" onMouseEnter={()=> setAddColumn2(()=> true)} onMouseLeave={()=> setAddColumn2(()=> false)}>
              <tr
                className="tr-table-add-service"
                style={{ border: "1px solid #fff", position: "relative" }}
              >
                <th>Gmail</th>
                <th>Pop3</th>
                <th>Live</th>
                <th>Quốc gia</th>
                <th>Giá</th>
                <th>Số lượng</th>
                {
                  addColumn2=== true && <div style={{position: "absolute", right: "100%", top: 0, color: "#fff", background: "#2e89ff", padding: "0 10px", borderRadius: 80, cursor: "pointer", whiteSpace: "nowrap", height: "100%"}}>Thêm cột</div>
                }
              </tr>
            </thead>
            <tbody className="tbody-table-add-service">
              {data2?.data?.map((item, key) => (
                <Tr2 key={key} {...item} />
              ))}
              {add2 === true && (
                <tr className="tr-table-add-service">
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b1: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b2: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b3: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b4: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b5: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                  <td>
                    <input
                      onChange={(e) =>
                        setB((prev) => ({ ...prev, b6: e.target.value }))
                      }
                      type="text"
                      style={{ fontSize: 16 }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <button
            onClick={() => setAdd2((prev) => !prev)}
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
            {add2 === false ? "Thêm dịch vụ Hotmail + Outlook" : "Hủy"}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {add2 === true && (
            <button
              onClick={() => addGmail()}
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
            </button>
          )}
        </div>
        <br />
        <br />
        <br />

        <AddItem />
      </div>
      <Alert duration={3000} message={"Cập nhật thành công"} open={alert} />
    </Fragment>
  );
};

export default AddService;


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
      <td><NumberFormat thousandSeparator={true} value={props.amount} displayType={"text"} /></td>
      {
        openDelete1=== true && <div style={{height: "100%", position: 'absolute', top: 0, right: "100%", display: "flex", justifyContent: "center", alignItems: 'center', gap: 16}}>
          <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "red", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px"}}>Xóa</button>
          {/* <button onClick={()=> deleteService1()} style={{padding: "0 16px", color: "#fff", background: "#2e89ff", cursor: "pointer", height :"100%", border: 'none', outline: 'none', borderRadius: "80px", whiteSpace: 'nowrap'}}>Thêm cột</button> */}
        </div>
      }
    </tr>
  )
}

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
      <td><NumberFormat thousandSeparator={true} value={props.amount} displayType={"text"} /></td>
      
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
      {
        open=== true && <div>
          <div>Nhập dịch vụ:&nbsp;&nbsp;<input type="text" placeholder="Nhập dịch vụ VD: Clone Facebook" style={{height: 40, fontSize: 18, width: 400}}/></div>
        </div>
      }
    </div>
  )
}