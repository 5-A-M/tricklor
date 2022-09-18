import React from 'react'
import { Title } from './Account'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MailIcon from '@mui/icons-material/Mail';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

const ApiDocument = (props) => {
  const array_link= [{text: "Check balance", icon: <AccountBalanceWalletIcon />, link: "/check_balance"},
    {text: "Buy mail", icon: <MailIcon />, link: "/buy_mail"}
    ]
  return (
    <div style={{width: "100%"}}>
        <Title info={"Tài liệu api"} />
        <WrapLink array_link={array_link} />
        <Routes>
            <Route path={"/"} element={<Navigate to={"/account/api_document/check_balance"} replace={true} />} />
            <Route path={`/check_balance`} element={<CheckBalance />} />
            <Route path={"/buy_mail"} element={<BuyMail />} />
        </Routes>
    </div>
  )
}

const WrapLink= (props)=> {
    return (
        <div style={{width: "100%", height: 50, display: "flex", alignItems: "center"}} className="wrap-link-api">
            {
                props.array_link.map((item, key)=> <NavLink to={`/account/api_document${item.link}`} key={key} style={{textDecoration: "none", color: "#49b66e"}} className={({isActive})=> isActive ? "active-link-api link-to-api" : "inactive-link-api link-to-api"}>
                    <div className="sub-api-to-link" style={{padding: "0 16px", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, cursor: "pointer", height: 50}}>
                        <div className="icon-sub-api-to-link" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{item.icon}</div>
                        <div className="text-sub-api-to-link" style={{fontSize: 16}}>{item.text}</div>
                    </div>
                </NavLink>)      
            }       
        </div>
    )
}

export default ApiDocument

const CheckBalance= (props)=> {
    return (
        <div className="link-to-check-balance" style={{padding: "10px 0"}}>
            <TitleApi title={"Check balance"} />
            <br />
            <ApiInstruction api={"GET https://626.vn/api/user/balance?apiKey=<Your_api_key>"} />
            <br />
            <ExampleApi request={<div style={{width: "100%", borderRadius: 10, padding: 10, background: "#f2f0f5"}}><div style={{margin: "8px 0"}}>Request</div><div>GET 'https://api.dongvanfb.com/user/account_type?apikey=36458879248967a36'</div></div>}
                response={<div style={{width: "100%", borderRadius: 10, padding: 10, background: "#f2f0f5"}}><div style={{margin: "8px 0"}}>Response</div><div>GET 'https://api.dongvanfb.com/user/account_type?apikey=36458879248967a36'</div></div>}
            />
        </div>
    )
}

const BuyMail= (props)=> {
    return (
        <div className="link-to-buy-mail" style={{padding: "10px 0"}}>
            <TitleApi title={"Buy mail"} />
            <br />
            <ApiInstruction api={"GET https://626.vn/api/user/account_type?apikey=<Your_api_key>"} />
            <br />
            <ExampleApi request={<div style={{width: "100%", borderRadius: 10, padding: 10, background: "#f2f0f5"}}><div style={{margin: "8px 0"}}>Request</div><div>GET 'https://api.dongvanfb.com/user/account_type?apikey=36458879248967a36'</div></div>}
                response={<div style={{width: "100%", borderRadius: 10, padding: 10, background: "#f2f0f5"}}><div style={{margin: "8px 0"}}>Response</div><div>GET 'https://api.dongvanfb.com/user/account_type?apikey=36458879248967a36'</div></div>} />
        </div>
    )
}

// Component common

const TitleApi= (props)=> {
    return (
        <div className={"title-api-common"} style={{fontSize: 24, fontWeight: 600}}>
            {props.title}
        </div>
    )
}

const ApiInstruction= (props)=> {
    return (
        <div className={"api-instruction"}>
            <div className={"text-api-instruction"} style={{fontSize: 20, fontWeight: 600}}>
                Api
            </div>
            <br />
            <div className={"main-api-instruction"}>
                {props.api}
            </div>
        </div>
    )
}

const ExampleApi= (props)=> {
    return (
        <div className={"example-api"}>
            <RequestExampleApi {...props} />
            <ResponseExampleApi {...props} />
        </div>
    )
}

const RequestExampleApi= (props)=> {
    return (
        <div className={"request-example-api"}>
            <div className={"title-request-example-api"} style={{margin: "16px 0"}}>Example</div>
            <div className={"main-request-example-api"}>{props.request}</div>
        </div>
    )
}

const ResponseExampleApi= (props)=> {
    return (
        <div className={"response-example-api"}>
            <div className={"title-response-example-api"} style={{margin: "16px 0"}}>Example</div>
            <div className={"main-response-example-api"}>{props.response}</div>
        </div>
    )
}