import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { SERVER_URL } from '../../../config/config';
import { useState } from 'react';

const Schedule = (props) => {
  const [isSchedule, setIsSchedule]= useState(()=> false)
  const scheduleE= async()=> {
    setIsSchedule(()=> true)
    const res= await axios({
        url: `${SERVER_URL}/delete/c/schedule`,
        method: "post",
        data: {
            second: props.value.$s,
            minute: props.value.$m,
            hour: props.value.$H,
        },
        responseType: "json"
    })
    const result= await res.data
    setTimeout(()=> {
        props.setOpen(()=> false)
    }, 1000)
    props.setDisabled(()=> true)
    return props.setTimeSchedule(()=> ({hour: result.hour, minute: result.minute, cron: result.cron}))
  }
  return (
    <div style={{background: "#fff", padding: "24px", width: "100%",maxWidth: 450, borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
        <div style={{width: "100%", display: "flex", flexDirection: "row-reverse", alignItems: "center", margin: "16px 0"}}>
            <CloseIcon onClick={()=> props?.setOpen(()=> false)} style={{width: 40, height: 40, background: "#f2f0f5", color: "#3a3b3c", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center"}} />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
            label="Chọn thời gian"
            value={props.value}
            onChange={(newValue) => {
                props.setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        
        <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center", margin: "16px 0"}}>
            <Button onClick={()=> scheduleE()} disabled={props?.value?.$y > 0 ? false : true} variant={"contained"}>
                {
                    isSchedule=== true ? "Đặt lịch thành công" : "Đặt lịch"
                }
            </Button>
        </div>
    </div>
  )
}

export default Schedule