import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
// import { v4 } from 'uuid'
import { SERVER_URL } from '../../config/config'

const DetailOrder = (props) => {
  const [data, setData]= useState(()=> {})
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
    const file = new Blob([`Tài khoản: ${data.account}\nMật khẩu: ${data.password}`], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = `${data.code_receipt}.txt`;
    document.body.appendChild(element);
    element.click();
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
                        data?.account && <div>Tài khoản: <strong>{data?.account}</strong></div>
                    }
                    <br />
                    {
                        data?.password && <div>Mật khẩu: <strong>{data?.password}</strong></div>
                    }
                    <br />
                    {
                        data?.cost && <div>Giá: <strong>{data?.cost}</strong></div>
                    }
                    <br />
                    {
                        data?.time_created && <div>Đã tạo: <strong>{moment(data?.time_created).format("YYYY-MM-DD HH:mm:ss")}</strong></div>
                    }
                    {
                       (data && Object?.values(data)?.length <= 0 && <div style={{textAlign: "center"}}>Không có thông tin về đơn hàng này</div>)
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    data?.account &&
                    <Button variant={"contained"} onClick={()=> {toTextFile();props.handleClose()}}>Tải file text</Button>
                } 
                <Button onClick={props.handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default DetailOrder

const Transition = React.memo(React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
}));