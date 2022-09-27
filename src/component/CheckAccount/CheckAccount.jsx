import React, { useState } from 'react'
import "./CheckAccount.sass"
import Filter from './Filter/Filter'

const CheckAccount = (props) => {
  return (
    <div className="check-account-container">
        <BannerCheckAccount title={props.title} />
        <MainCheckAccount {...props} />
    </div>
  )
}

export default CheckAccount


const BannerCheckAccount = (props) => {
    return (
        <div className={"w-banner-check-account-container-wrapper"} style={{display: "flex", justifyContent: 'center', alignItems: "center", width: "100%"}}>
            <div className="banner-check-account-container-wrapper" style={{maxWidth: 1200}}>
                <div className="banner-check-account-container">
                    <div className="banner-check-account-text">
                        {props.title}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MainCheckAccount = (props) => { 
    const [idCheck, setIdCheck]= useState(()=> "")
    const [alive, setAlive]= useState()
    const [gmailCheck, setGmailCheck]= useState(()=> "")
    const [state, setState]= useState(()=> "")
    return (
        <div className="main-check-account-container-wrapper">
            <div className="main-check-account-container">
                { 
                    (props.is_gmail || props.is_get_mail) && 
                    <TypingCheckAccount onChange2={setState} onChange={setGmailCheck} value={gmailCheck} is_gmail={props.is_gmail} className="check-account-container-1" classNameText={"check-account-textarea-1"} type={"gmail"} amount={"0"} />
                }


                {
                    props.is_fb && 
                    <TypingCheckAccount onChange={setIdCheck} value={idCheck} className="check-account-container-1" classNameText={"check-account-textarea-1"} type={"clone"} amount={idCheck.trim().length> 0 ? idCheck?.split("\n")?.length : 0} />
                }


                <Filter idCheck={idCheck} setAlive={setAlive} />


                <div className="check-account-container-3">
                    
                    
                    <div className="check-account-container-sub-3-wrapper">
                        <div className='check-account-container-sub-3'>
                            <TypingCheckAccount is_result={true} alive={alive} value={alive=== true ? idCheck : ""} setIdCheck={setIdCheck} className="check-account-container-1 check-account-container-sub-5" classNameText={"check-account-textarea-1"} type={"Live"} amount={alive ===true ? 1 : 0} />
                        </div>
                    </div>


                    {/*  */}
                    <div className="check-account-container-sub-3-wrapper">
                        <div className='check-account-container-sub-3'>
                            <TypingCheckAccount is_result={true} alive={alive} value={alive=== false ? idCheck : ""} className="check-account-container-1 check-account-container-sub-6" classNameText={"check-account-textarea-1"} type={"Die"} amount={alive=== false ? 1 : 0} />
                        </div>
                    </div>


                    {/*  */}
                    {
                        props.is_gmail=== true && 
                        <div className="check-account-container-sub-3-wrapper">
                            <div className='check-account-container-sub-3'>
                                <TypingCheckAccount className="check-account-container-1 check-account-container-sub-7" classNameText={"check-account-textarea-1"} type={"Unknown"} amount={"0"} />
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

const TypingCheckAccount = (props) => {
    return (
        <div className={`typing-check-account-container-wrapper ${props.className}`}>
            <TypeCheckAccount {...props} className={props.classNameText} />
            <TextArea {...props} />
        </div>
    )
}

const TypeCheckAccount = (props) => {
    return (
        <div className="type-check-account-container">
            <div className="type-check-account-text">{props.type}</div><div className="type-check-account-container-amount">{props.amount}</div>
        </div>
    )
}

const TextArea= (props) => {
    return (
        <div className="text-area-container">
            <textarea style={{color: props.alive=== true ? "green" : props.alive=== false ? "red" : "#000"}} readOnly={props.readOnly} value={props.value} onChange={(e)=> props.onChange(e.target.value)} className={`text-area-text ${props.className}`}>{props.textarea}</textarea>
        </div>
    )
}