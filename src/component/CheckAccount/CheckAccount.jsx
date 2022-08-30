import React from 'react'
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
        <div className="banner-check-account-container-wrapper">
            <div className="banner-check-account-container">
                <div className="banner-check-account-text">
                    {props.title}
                </div>
            </div>
        </div>
    )
}

const MainCheckAccount = (props) => { 
    return (
        <div className="main-check-account-container-wrapper">
            <div className="main-check-account-container">
                { 
                    (props.is_gmail || props.is_get_mail) && 
                    <TypingCheckAccount className="check-account-container-1" classNameTex={"check-account-textarea-1"} type={"gmail"} amount={"0"} />
                }
                {
                    props.is_fb && 
                    <TypingCheckAccount className="check-account-container-1" classNameTex={"check-account-textarea-1"} type={"clone"} amount={"0"} />
                }
                <Filter />
                <div className="check-account-container-3">
                    <div className="check-account-container-sub-3-wrapper">
                        <div className='check-account-container-sub-3'>
                            <TypingCheckAccount className="check-account-container-1 check-account-container-sub-5" classNameTex={"check-account-textarea-1"} type={"Live"} amount={"0"} />
                        </div>
                    </div>
                    
                    <div className="check-account-container-sub-3-wrapper">
                        <div className='check-account-container-sub-3'>
                            <TypingCheckAccount className="check-account-container-1 check-account-container-sub-6" classNameTex={"check-account-textarea-1"} type={"Die"} amount={"0"} />
                        </div>
                    </div>

                    {
                        props.is_gmail && 
                        <div className="check-account-container-sub-3-wrapper">
                            <div className='check-account-container-sub-3'>
                                <TypingCheckAccount className="check-account-container-1 check-account-container-sub-7" classNameTex={"check-account-textarea-1"} type={"Unknown"} amount={"0"} />
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
            <div className="type-check-account-text">{props.type}</div> <div className="type-check-account-container-amount">{props.amount}</div>
        </div>
    )
}

const TextArea= (props) => {
    return (
        <div className="text-area-container">
            <textarea className={`text-area-text ${props.className}`}>{props.textarea}</textarea>
        </div>
    )
}