import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { SocketContext } from '../../App'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { v4 } from 'uuid'
import { SERVER_URL } from '../../config/config'
import CopyToClipboard from 'react-copy-to-clipboard'
import { AdminContext } from '../../Admin/Admin'

const DetailOrder = (props) => {
  const [data, setData]= useState(()=> {})
  const {lang}= useContext(SocketContext)
  useEffect(()=> {
    if(props?.id_order) {
        (async()=> {
            const res= await axios({
                url: `${SERVER_URL}/detail_order/history`,
                method: "get",
                params: {
                    code_receipt: props.id_order
                }
            })
            const result= await res.data
            return setData(()=> result)
        })()
    }
  }, [props.id_order])

  const toTextFile= async()=> {
    const element = document.createElement("a");
    const file = new Blob(
      
      data?.data?.map(item=> `${item.account.replaceAll(",", "")}|${item.password}`.replaceAll(",", "")),
      {
        type: "text/plain",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${data.code_receipt}.txt`;
    document.body.appendChild(element);
    element.click();
  } 
  const [copy, setCopy]= useState(()=> false)
  const copyE= ()=> {
    setCopy(()=> true)
    setTimeout(()=> {
        setCopy(()=> false)
    }, 1500)
  }
  return (
    <>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
            className="dialog-"
        >
            <DialogTitle>{lang=== "vn" ? "Chi tiết đơn hàng" : "Detail order"}</DialogTitle>
            <DialogContent style={{width: 600}}>
                <DialogContentText id="alert-dialog-slide-description">
                    {
                        data?.data?.[0]?.name && <div>{lang==="vn" ? "Tên mặt hàng" : "Name"}: <strong>{data?.data?.[0]?.name}</strong></div>
                    }
                    <br />
                    {
                        data?.cost && <div>{lang=== "vn" ? "Giá" : "Price"}: <strong>{data?.cost}</strong></div>
                    }
                    <br />
                    {
                        data?.time_created && <div>{lang=== "vn"? "Đã tạo" : "Time created"}: <strong>{moment(data?.time_created).format("YYYY-MM-DD HH:mm:ss")}</strong></div>
                    }
                    {
                       (data && Object?.values(data)?.length <= 0 && <div style={{textAlign: "center"}}>{lang=== "vn"? "Không có thông tin về đơn hàng này": "No any info about this order"}</div>)
                    }
                    <div style={{ color: "#000", margin: "8px 0", maxHeight: 300, overflow: "auto"}}>
                        {
                        data?.data?.map((item, key)=> <div className={"list-account-password"} key={key}>{item.account}|{item.password}</div>)
                        }
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    data &&
                    <div style={{display: "flex", justifyContent:" center", alignItems:" center", gap: 16}}>
                        <CopyToClipboard onCopy={()=> copyE()} text={data?.data?.map(item=> `${item.account.replaceAll(",", "")}|${item.password}`.replaceAll(",", ""))}>
                            <Button variant={"contained"}>
                                {
                                    copy=== false ? <ContentCopyIcon style={{color: "#fff"}} /> : (lang=== "vn" ? "Copy thành công " : "Copy success")
                                }
                            </Button>
                        </CopyToClipboard>
                        <Button variant={"contained"} onClick={()=> {toTextFile();props.handleClose()}}>{lang=== "vn" ? "Tải file text" : "Download file"}</Button>
                    </div>
                } 
                <Button onClick={props.handleClose}>{lang=== "vn"? "Đóng" : "Close"}</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default DetailOrder

const Transition = React.memo(React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
}));
//

export const DetailStats1= (props)=> {
    const { lang }= useContext(SocketContext)
    const toTextFile= async()=> {
      const element = document.createElement("a");
      const file = new Blob([`Tài khoản: ${props.account}\nMật khẩu: ${props.password}`], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = `${props.code_stats}.txt`;
      document.body.appendChild(element);
      element.click();
    }
    const [copy, setCopy]= useState(()=> false)
    const copyE= ()=> {
        setCopy(()=> true)
        setTimeout(()=> {
            setCopy(()=> false)
        }, 1500)
    }
    return (
      <>
          <Dialog
              open={props.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={props.handleClose}
              aria-describedby="alert-dialog-slide-description"
              className="dialog-"
          >
              <DialogTitle>{"Chi tiết đơn hàng"}</DialogTitle>
              <DialogContent style={{width: 600}}>
                  <DialogContentText id="alert-dialog-slide-description">
                    {
                        props.name && <div>{lang==="vn" ? "Tên mặt hàng" : "Name"}: <strong>{props.name}</strong></div>
                    }
                    {
                        props?.account && <div>{lang=== "vn" ? "Tài khoản" : "Account"}: <strong>{props?.account}</strong></div>
                    }
                    <br />
                    {
                        props?.password && <div>{lang=== "vn" ? "Mật khẩu:" : "Password:"} <strong>{props?.password}</strong></div>
                    }
                    <br />
                    {
                        props?.amount && <div>{lang=== "vn" ? "Giá" : "Price"}: <strong>{props?.amount}</strong></div>
                    }
                    <br />
                    {
                        props?.date && <div>{lang=== "vn" ? "Đã tạo" : "Time created"}: <strong>{props.date}</strong></div>
                    }
                    <div style={{ color: "#000", margin: "8px 0", maxHeight: 300, overflow: "auto"}}>
                        {
                        props?.info&& Array.isArray(props?.info) && props?.info?.map((item, key)=> <div className={"list-account-password"} key={key}>{item.account}|{item.password}</div>)
                        }
                    </div>
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  {
                    props?.account &&
                    <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
                        <CopyToClipboard onCopy={()=> copyE()} text={props?.data?.map(item=> `${item.account.replaceAll(",", "")}|${item.password}`.replaceAll(",", ""))?.toString()?.replaceAll(",", "")}>
                                <Button variant={"contained"}>
                                    {
                                        copy=== false ? <ContentCopyIcon style={{color: "#fff"}} /> : (lang=== "vn" ? "Copy thành công " : "Copy success")
                                    }
                                </Button>
                            </CopyToClipboard>
                        <Button variant={"contained"} onClick={()=> {toTextFile();props.handleClose()}}>{lang=== "vn" ? "Tải file text" : "Download file"}</Button>
                    </div>
                  } 
                  <Button onClick={props.handleClose}>{lang=== "vn" ? "Đóng": "Close"}</Button>
              </DialogActions>
          </Dialog>
      </>
    )
}

//
export const DetailStats2= (props)=> {
    const { lang }= useContext(AdminContext)
    const toTextFile= async()=> {
      const element = document.createElement("a");
      const file = new Blob([`Tài khoản: ${props.account}\nMật khẩu: ${props.password}`], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = `${props.code_stats}.txt`;
      document.body.appendChild(element);
      element.click();
    }
    const [copy, setCopy]= useState(()=> false)
    const copyE= ()=> {
        setCopy(()=> true)
        setTimeout(()=> {
            setCopy(()=> false)
        }, 1500)
    }
    return (
      <>
          <Dialog
              open={props.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={props.handleClose}
              aria-describedby="alert-dialog-slide-description"
              className="dialog-"
          >
              <DialogTitle>{"Chi tiết đơn hàng"}</DialogTitle>
              <DialogContent style={{width: 600}}>
                  <DialogContentText id="alert-dialog-slide-description">
                    {
                        props.name && <div>{lang==="vn" ? "Tên mặt hàng" : "Name"}: <strong>{props.name}</strong></div>
                    }
                    {
                        props?.account && <div>{lang=== "vn" ? "Tài khoản" : "Account"}: <strong>{props?.account}</strong></div>
                    }
                    <br />
                    {
                        props?.password && <div>{lang=== "vn" ? "Mật khẩu:" : "Password:"} <strong>{props?.password}</strong></div>
                    }
                    <br />
                    {
                        props?.amount && <div>{lang=== "vn" ? "Giá" : "Price"}: <strong>{props?.amount}</strong></div>
                    }
                    <br />
                    {
                        props?.date && <div>{lang=== "vn" ? "Đã tạo" : "Time created"}: <strong>{props.date}</strong></div>
                    }
                    <div style={{ color: "#000", margin: "8px 0", maxHeight: 300, overflow: "auto"}}>
                        {
                        props?.info&& Array.isArray(props?.info) && props?.info?.map((item, key)=> <div className={"list-account-password"} key={key}>{item.account}|{item.password}</div>)
                        }
                    </div>
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  {
                    props?.info &&
                    <div style={{display: "flex", justifyContent: 'center', alignItems: "center", gap: 16}}>
                        <CopyToClipboard onCopy={()=> copyE()} text={props?.data?.map(item=> `${item.account.replaceAll(",", "")}|${item.password}`.replaceAll(",", ""))?.toString()?.replaceAll(",", "")}>
                                <Button variant={"contained"}>
                                    {
                                        copy=== false ? <ContentCopyIcon style={{color: "#fff"}} /> : (lang=== "vn" ? "Copy thành công " : "Copy success")
                                    }
                                </Button>
                            </CopyToClipboard>
                        <Button variant={"contained"} onClick={()=> {toTextFile();props.handleClose()}}>{lang=== "vn" ? "Tải file text" : "Download file"}</Button>
                    </div>
                  } 
                  <Button onClick={props.handleClose}>{lang=== "vn" ? "Đóng": "Close"}</Button>
              </DialogActions>
          </Dialog>
      </>
    )
}