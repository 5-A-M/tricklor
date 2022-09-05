import React, { useEffect, useMemo, useState } from 'react'
import axios from "axios"
import { SERVER_URL } from '../../../config/config'
import Alert from '../Alert/Alert'

const X = (props) => {
  const [data, setData]= useState(()=> {})
  useEffect(()=> {
    (async()=> {
        const res= await axios({
            url: `${SERVER_URL}/get_option/main`,
            method: "post", 
            responseType: "json"
        })
        const result= await res.data
        setData(()=> result.data)
    })()
  }, [])
  const [title, setTitle]= useState(()=> "")
  const [banner, setBanner]= useState(()=> "")
  const [logo, setLogo]= useState(()=> "")
  const [hotline, setHotline]= useState(()=> "")
  const [email, setEmail]= useState(()=> "")
  const [bankAccount, setBankAccount]= useState(()=> "")
  const [nameBankAccount, setNameBankAccount]= useState(()=> "")
  const [bank, setBank]= useState(()=> "")
  const [message, setMessage]= useState(()=> "")
  const [state, setState]= useState(()=> false)
  useEffect(()=> {
    setTitle(()=> data?.title)
    setBanner(()=> data?.banner)
    setLogo(()=> data?.logo)
    setHotline(()=> data?.hotline)
    setEmail(()=> data?.email)
    setBank(()=> data?.name_bank)
    setBankAccount(()=> data?.bank_account)
    setNameBankAccount(()=> data?.name_bank_account)
  }, [data])
  const update_admin_option= async ()=> {
    const res= await axios({
        url: `${SERVER_URL}/update/admin_option`,
        method: "post",
        data: {
            title, banner, logo, hotline, email, bank, nameBankAccount, bankAccount
        },
        responseType: "json"
    })
    const result= await res.data
    if(result.update=== true ) {
        setMessage(()=> "Cập nhật thành công")
        setState(()=> result.update)
        setOpen(()=> true)
        setTimeout(()=> {
            setOpen(()=> false)
            setMessage(()=> "")
        }, 3000)
    }
  }
  const [open, setOpen]= useState(()=> false)
  return (
    <div className="settings-admin" style={{width: "100%"}}>
        <CommonX title={"Tiêu đề trang web: "} content={title} onChange={setTitle} />
        <CommonX title={"Banner: "} content={banner} onChange={setBanner} />
        <CommonX title={"Logo: "} content={logo} onChange={setLogo} />
        <CommonX title={"Hotline: "} content={hotline} onChange={setHotline} />
        <CommonX title={"Email: "} content={email} onChange={setEmail} />
        <CommonX title={"Số tài khoản: "} content={bankAccount} onChange={setBankAccount} />
        <CommonX title={"Chủ tài khoản: "} content={nameBankAccount} onChange={setNameBankAccount} />
        <CommonX title={"Ngân hàng: "} content={bank} onChange={setBank} is_bank={true} />
        <div className="message-update-success" style={{margin: "16px 0", fontSize: 14, color: state=== true ? "green" : "red"}}>{message}</div>
        <div className="settings-admin-button" style={{marginTop: 16, display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <button onClick={()=> update_admin_option()} className="settings-admin-button-main" style={{width: 200, height: 40, borderRadius: 80, fontSize: 18, fontWeight: 600, background: "#2e89ff", color: "#fff", border: "none", outline: "none", cursor: "pointer"}}>Cập nhật</button>
        </div>
        <Alert message={"Cập nhật thành công"} duration={2500} open={open} />
    </div>
  )
}

const CommonX= (props)=> {
    return (
        <div className="component-settings-admin" style={{marginBottom: 16}}>
            <Title1 {...props} />
            <Content1 {...props} />
        </div>
    )
}

const Title1= (props)=> {
    return (
        <div className="component-settings-admin-title" style={{fontSize: 16, marginBottom: 8}}>{props.title}</div>
    )
}

const Content1= (props)=> {
    const array_bank= useMemo(()=> [{
        id: 17,
        name: "Ng\xe2n h\xe0ng TMCP C\xf4ng th\u01b0\u01a1ng Vi\u1ec7t Nam",
        code: "ICB",
        bin: "970415",
        isTransfer: 1,
        short_name: "VietinBank",
        logo: "https://api.vietqr.io/img/ICB.3d4d6760.png",
        vietqr: 3
    }, {
        id: 43,
        name: "Ng\xe2n ha\u0300ng TMCP Ngoa\u0323i Th\u01b0\u01a1ng Vi\xea\u0323t Nam",
        code: "VCB",
        bin: "970436",
        isTransfer: 1,
        short_name: "Vietcombank",
        logo: "https://api.vietqr.io/img/VCB.237d4924.png",
        vietqr: 3
    }, {
        id: 21,
        name: "Ng\xe2n h\xe0ng TMCP Qu\xe2n \u0111\u1ed9i",
        code: "MB",
        bin: "970422",
        isTransfer: 1,
        short_name: "MBBank",
        logo: "https://api.vietqr.io/img/MB.f9740319.png",
        vietqr: 3
    }, {
        id: 2,
        name: "Ng\xe2n h\xe0ng TMCP \xc1 Ch\xe2u",
        code: "ACB",
        bin: "970416",
        isTransfer: 1,
        short_name: "ACB",
        logo: "https://api.vietqr.io/img/ACB.6e7fe025.png",
        vietqr: 3
    }, {
        id: 47,
        name: "Ng\xe2n h\xe0ng TMCP Vi\u1ec7t Nam Th\u1ecbnh V\u01b0\u1ee3ng",
        code: "VPB",
        bin: "970432",
        isTransfer: 1,
        short_name: "VPBank",
        logo: "https://api.vietqr.io/img/VPB.ca2e7350.png",
        vietqr: 3
    }, {
        id: 39,
        name: "Ng\xe2n h\xe0ng TMCP Ti\xean Phong",
        code: "TPB",
        bin: "970423",
        isTransfer: 1,
        short_name: "TPBank",
        logo: "https://api.vietqr.io/img/TPB.883b6135.png",
        vietqr: 3
    }, {
        id: 22,
        name: "Ng\xe2n ha\u0300ng TMCP Ha\u0300ng Ha\u0309i",
        code: "MSB",
        bin: "970426",
        isTransfer: 1,
        short_name: "MSB",
        logo: "https://api.vietqr.io/img/MSB.1b076e2a.png",
        vietqr: 3
    }, {
        id: 23,
        name: "Ng\xe2n h\xe0ng TMCP Nam \xc1",
        code: "NAB",
        bin: "970428",
        isTransfer: 1,
        short_name: "NamABank",
        logo: "https://api.vietqr.io/img/NAB.f74b0fa8.png",
        vietqr: 3
    }, {
        id: 20,
        name: "Ng\xe2n h\xe0ng TMCP B\u01b0u \u0110i\u1ec7n Li\xean Vi\u1ec7t",
        code: "LPB",
        bin: "970449",
        isTransfer: 1,
        short_name: "LienVietPostBank",
        logo: "https://api.vietqr.io/img/LPB.07a7c83b.png",
        vietqr: 3
    }, {
        id: 44,
        name: "Ng\xe2n ha\u0300ng TMCP Ba\u0309n Vi\xea\u0323t",
        code: "VCCB",
        bin: "970454",
        isTransfer: 1,
        short_name: "VietCapitalBank",
        logo: "https://api.vietqr.io/img/VCCB.654a3506.png",
        vietqr: 3
    }, {
        id: 4,
        name: "Ng\xe2n h\xe0ng TMCP \u0110\u1ea7u t\u01b0 v\xe0 Ph\xe1t tri\u1ec3n Vi\u1ec7t Nam",
        code: "BIDV",
        bin: "970418",
        isTransfer: 1,
        short_name: "BIDV",
        logo: "https://api.vietqr.io/img/BIDV.862fd58b.png",
        vietqr: 3
    }, {
        id: 36,
        name: "Ng\xe2n h\xe0ng TMCP S\xe0i G\xf2n Th\u01b0\u01a1ng T\xedn",
        code: "STB",
        bin: "970403",
        isTransfer: 1,
        short_name: "Sacombank",
        logo: "https://api.vietqr.io/img/STB.a03fef2c.png",
        vietqr: 3
    }, {
        id: 45,
        name: "Ng\xe2n ha\u0300ng TMCP Qu\u1ed1c t\u1ebf Vi\u1ec7t Nam",
        code: "VIB",
        bin: "970441",
        isTransfer: 1,
        short_name: "VIB",
        logo: "https://api.vietqr.io/img/VIB.4ecb28e6.png",
        vietqr: 3
    }, {
        id: 12,
        name: "Ng\xe2n h\xe0ng TMCP Ph\xe1t tri\u1ec3n Th\xe0nh ph\u1ed1 H\u1ed3 Ch\xed Minh",
        code: "HDB",
        bin: "970437",
        isTransfer: 1,
        short_name: "HDBank",
        logo: "https://api.vietqr.io/img/HDB.4256e826.png",
        vietqr: 3
    }, {
        id: 33,
        name: "Ng\xe2n ha\u0300ng TMCP \u0110\xf4ng Nam A\u0301",
        code: "SEAB",
        bin: "970440",
        isTransfer: 1,
        short_name: "SeABank",
        logo: "https://api.vietqr.io/img/SEAB.1864a665.png",
        vietqr: 3
    }, {
        id: 11,
        name: "Ng\xe2n h\xe0ng Th\u01b0\u01a1ng m\u1ea1i TNHH MTV D\u1ea7u Kh\xed To\xe0n C\u1ea7u",
        code: "GPB",
        bin: "970408",
        isTransfer: 0,
        short_name: "GPBank",
        logo: "https://api.vietqr.io/img/GPB.29bd127d.png",
        vietqr: 1
    }, {
        id: 30,
        name: "Ng\xe2n ha\u0300ng TMCP \u0110a\u0323i Chu\u0301ng Vi\xea\u0323t Nam",
        code: "PVCB",
        bin: "970412",
        isTransfer: 1,
        short_name: "PVcomBank",
        logo: "https://api.vietqr.io/img/PVCB.6129f342.png",
        vietqr: 3
    }, {
        id: 24,
        name: "Ng\xe2n h\xe0ng TMCP Qu\u1ed1c D\xe2n",
        code: "NCB",
        bin: "970419",
        isTransfer: 1,
        short_name: "NCB",
        logo: "https://api.vietqr.io/img/NCB.7d8af057.png",
        vietqr: 3
    }, {
        id: 37,
        name: "Ng\xe2n h\xe0ng TNHH MTV Shinhan Vi\u1ec7t Nam",
        code: "SHBVN",
        bin: "970424",
        isTransfer: 1,
        short_name: "ShinhanBank",
        logo: "https://api.vietqr.io/img/SHBVN.b6c0e806.png",
        vietqr: 3
    }, {
        id: 31,
        name: "Ng\xe2n h\xe0ng TMCP S\xe0i G\xf2n",
        code: "SCB",
        bin: "970429",
        isTransfer: 1,
        short_name: "SCB",
        logo: "https://api.vietqr.io/img/SCB.5ca4bec4.png",
        vietqr: 3
    }, {
        id: 29,
        name: "Ng\xe2n h\xe0ng TMCP X\u0103ng d\u1ea7u Petrolimex",
        code: "PGB",
        bin: "970430",
        isTransfer: 1,
        short_name: "PGBank",
        logo: "https://api.vietqr.io/img/PGB.825cbbda.png",
        vietqr: 3
    }, {
        id: 42,
        name: "Ng\xe2n h\xe0ng N\xf4ng nghi\u1ec7p v\xe0 Ph\xe1t tri\u1ec3n N\xf4ng th\xf4n Vi\u1ec7t Nam",
        code: "VBA",
        bin: "970405",
        isTransfer: 0,
        short_name: "Agribank",
        logo: "https://api.vietqr.io/img/VBA.d72a0e06.png",
        vietqr: 0
    }, {
        id: 38,
        name: "Ng\xe2n h\xe0ng TMCP K\u1ef9 th\u01b0\u01a1ng Vi\u1ec7t Nam",
        code: "TCB",
        bin: "970407",
        isTransfer: 1,
        short_name: "Techcombank",
        logo: "https://api.vietqr.io/img/TCB.b2828982.png",
        vietqr: 3
    }, {
        id: 34,
        name: "Ng\xe2n h\xe0ng TMCP S\xe0i G\xf2n C\xf4ng Th\u01b0\u01a1ng",
        code: "SGICB",
        bin: "970400",
        isTransfer: 1,
        short_name: "SaigonBank",
        logo: "https://api.vietqr.io/img/SGICB.5886546f.png",
        vietqr: 3
    }, {
        id: 9,
        name: "Ng\xe2n h\xe0ng TMCP \u0110\xf4ng \xc1",
        code: "DOB",
        bin: "970406",
        isTransfer: 0,
        short_name: "DongABank",
        logo: "https://api.vietqr.io/img/DOB.92bbf6f4.png",
        vietqr: 0
    }, {
        id: 3,
        name: "Ng\xe2n h\xe0ng TMCP B\u1eafc \xc1",
        code: "BAB",
        bin: "970409",
        isTransfer: 0,
        short_name: "BacABank",
        logo: "https://api.vietqr.io/img/BAB.75c3a8c2.png",
        vietqr: 0
    }, {
        id: 32,
        name: "Ng\xe2n h\xe0ng TNHH MTV Standard Chartered Bank Vi\u1ec7t Nam",
        code: "SCVN",
        bin: "970410",
        isTransfer: 0,
        short_name: "StandardChartered",
        logo: "https://api.vietqr.io/img/SCVN.a53976be.png",
        vietqr: 0
    }, {
        id: 27,
        name: "Ng\xe2n h\xe0ng Th\u01b0\u01a1ng m\u1ea1i TNHH MTV \u0110\u1ea1i D\u01b0\u01a1ng",
        code: "Oceanbank",
        bin: "970414",
        isTransfer: 0,
        short_name: "Oceanbank",
        logo: "https://api.vietqr.io/img/OCEANBANK.f84c3119.png",
        vietqr: 0
    }, {
        id: 48,
        name: "Ng\xe2n h\xe0ng Li\xean doanh Vi\u1ec7t - Nga",
        code: "VRB",
        bin: "970421",
        isTransfer: 0,
        short_name: "VRB",
        logo: "https://api.vietqr.io/img/VRB.9d6d40f3.png",
        vietqr: 0
    }, {
        id: 1,
        name: "Ng\xe2n h\xe0ng TMCP An B\xecnh",
        code: "ABB",
        bin: "970425",
        isTransfer: 0,
        short_name: "ABBANK",
        logo: "https://api.vietqr.io/img/ABB.9defb03d.png",
        vietqr: 0
    }, {
        id: 41,
        name: "Ng\xe2n h\xe0ng TMCP Vi\u1ec7t \xc1",
        code: "VAB",
        bin: "970427",
        isTransfer: 0,
        short_name: "VietABank",
        logo: "https://api.vietqr.io/img/VAB.9bf85d8e.png",
        vietqr: 0
    }, {
        id: 10,
        name: "Ng\xe2n h\xe0ng TMCP Xu\u1ea5t Nh\u1eadp kh\u1ea9u Vi\u1ec7t Nam",
        code: "EIB",
        bin: "970431",
        isTransfer: 0,
        short_name: "Eximbank",
        logo: "https://api.vietqr.io/img/EIB.ae2f0252.png",
        vietqr: 0
    }, {
        id: 46,
        name: "Ng\xe2n h\xe0ng TMCP Vi\u1ec7t Nam Th\u01b0\u01a1ng T\xedn",
        code: "VIETBANK",
        bin: "970433",
        isTransfer: 1,
        short_name: "VietBank",
        logo: "https://api.vietqr.io/img/VIETBANK.bb702d50.png",
        vietqr: 3
    }, {
        id: 18,
        name: "Ng\xe2n h\xe0ng TNHH Indovina",
        code: "IVB",
        bin: "970434",
        isTransfer: 0,
        short_name: "IndovinaBank",
        logo: "https://api.vietqr.io/img/IVB.ee79782c.png",
        vietqr: 0
    }, {
        id: 5,
        name: "Ng\xe2n h\xe0ng TMCP B\u1ea3o Vi\u1ec7t",
        code: "BVB",
        bin: "970438",
        isTransfer: 1,
        short_name: "BaoVietBank",
        logo: "https://api.vietqr.io/img/BVB.2b7aab15.png",
        vietqr: 3
    }, {
        id: 28,
        name: "Ng\xe2n h\xe0ng TNHH MTV Public Vi\u1ec7t Nam",
        code: "PBVN",
        bin: "970439",
        isTransfer: 0,
        short_name: "PublicBank",
        logo: "https://api.vietqr.io/img/PBVN.67dbc9af.png",
        vietqr: 0
    }, {
        id: 35,
        name: "Ng\xe2n h\xe0ng TMCP S\xe0i G\xf2n - H\xe0 N\u1ed9i",
        code: "SHB",
        bin: "970443",
        isTransfer: 0,
        short_name: "SHB",
        logo: "https://api.vietqr.io/img/SHB.665daa27.png",
        vietqr: 0
    }, {
        id: 6,
        name: "Ng\xe2n h\xe0ng Th\u01b0\u01a1ng m\u1ea1i TNHH MTV X\xe2y d\u1ef1ng Vi\u1ec7t Nam",
        code: "CBB",
        bin: "970444",
        isTransfer: 0,
        short_name: "CBBank",
        logo: "https://api.vietqr.io/img/CBB.5b47e56f.png",
        vietqr: 0
    }, {
        id: 26,
        name: "Ng\xe2n h\xe0ng TMCP Ph\u01b0\u01a1ng \u0110\xf4ng",
        code: "OCB",
        bin: "970448",
        isTransfer: 1,
        short_name: "OCB",
        logo: "https://api.vietqr.io/img/OCB.84d922d1.png",
        vietqr: 3
    }, {
        id: 19,
        name: "Ng\xe2n h\xe0ng TMCP Ki\xean Long",
        code: "KLB",
        bin: "970452",
        isTransfer: 1,
        short_name: "KienLongBank",
        logo: "https://api.vietqr.io/img/KLB.23902895.png",
        vietqr: 3
    }, {
        id: 7,
        name: "Ng\xe2n h\xe0ng TNHH MTV CIMB Vi\u1ec7t Nam",
        code: "CIMB",
        bin: "422589",
        isTransfer: 0,
        short_name: "CIMB",
        logo: "https://api.vietqr.io/img/CIMB.70b35f80.png",
        vietqr: 0
    }, {
        id: 14,
        name: "Ng\xe2n h\xe0ng TNHH MTV HSBC (Vi\u1ec7t Nam)",
        code: "HSBC",
        bin: "458761",
        isTransfer: 0,
        short_name: "HSBC",
        logo: "https://api.vietqr.io/img/HSBC.6fa79196.png",
        vietqr: 0
    }, {
        id: 8,
        name: "DBS Bank Ltd - Chi nh\xe1nh Th\xe0nh ph\u1ed1 H\u1ed3 Ch\xed Minh",
        code: "DBS",
        bin: "796500",
        isTransfer: 0,
        short_name: "DBSBank",
        logo: "https://api.vietqr.io/img/DBS.83742b1e.png",
        vietqr: 0
    }, {
        id: 25,
        name: "Ng\xe2n h\xe0ng Nonghyup - Chi nh\xe1nh H\xe0 N\u1ed9i",
        code: "NHB HN",
        bin: "801011",
        isTransfer: 0,
        short_name: "Nonghyup",
        logo: "https://api.vietqr.io/img/NHB%20HN.6a3f7952.png",
        vietqr: 0
    }, {
        id: 13,
        name: "Ng\xe2n h\xe0ng TNHH MTV Hong Leong Vi\u1ec7t Nam",
        code: "HLBVN",
        bin: "970442",
        isTransfer: 0,
        short_name: "HongLeong",
        logo: "https://api.vietqr.io/img/HLBVN.4a284a9a.png",
        vietqr: 0
    }, {
        id: 15,
        name: "Ng\xe2n ha\u0300ng C\xf4ng nghi\xea\u0323p Ha\u0300n Qu\xf4\u0301c - Chi nha\u0301nh Ha\u0300 N\xf4\u0323i",
        code: "IBK - HN",
        bin: "970455",
        isTransfer: 0,
        short_name: "IBK Bank",
        logo: "https://api.vietqr.io/img/IBK%20-%20HN.eee4e569.png",
        vietqr: 0
    }, {
        id: 16,
        name: "Ng\xe2n ha\u0300ng C\xf4ng nghi\xea\u0323p Ha\u0300n Qu\xf4\u0301c - Chi nha\u0301nh TP. H\xf4\u0300 Chi\u0301 Minh",
        code: "IBK - HCM",
        bin: "970456",
        isTransfer: 0,
        short_name: "IBK Bank",
        logo: "https://api.vietqr.io/img/IBK%20-%20HN.eee4e569.png",
        vietqr: 0
    }, {
        id: 49,
        name: "Ng\xe2n h\xe0ng TNHH MTV Woori Vi\u1ec7t Nam",
        code: "WVN",
        bin: "970457",
        isTransfer: 0,
        short_name: "Woori",
        logo: "https://api.vietqr.io/img/WVN.45451999.png",
        vietqr: 0
    }, {
        id: 40,
        name: "Ng\xe2n h\xe0ng United Overseas - Chi nh\xe1nh TP. H\u1ed3 Ch\xed Minh",
        code: "UOB",
        bin: "970458",
        isTransfer: 0,
        short_name: "UnitedOverseas",
        logo: "https://api.vietqr.io/img/UOB.e6a847d2.png",
        vietqr: 0
    }, {
        id: 50,
        name: "Ng\xe2n h\xe0ng Kookmin - Chi nh\xe1nh H\xe0 N\u1ed9i",
        code: "KBHN",
        bin: "970462",
        isTransfer: 0,
        short_name: "KookminHN",
        logo: "https://api.vietqr.io/img/KBHN.5126abce.png",
        vietqr: 0
    }, {
        id: 51,
        name: "Ng\xe2n h\xe0ng Kookmin - Chi nh\xe1nh Th\xe0nh ph\u1ed1 H\u1ed3 Ch\xed Minh",
        code: "KBHCM",
        bin: "970463",
        isTransfer: 0,
        short_name: "KookminHCM",
        logo: "https://api.vietqr.io/img/KBHN.5126abce.png",
        vietqr: 0
    }, {
        id: 52,
        name: "Ng\xe2n h\xe0ng H\u1ee3p t\xe1c x\xe3 Vi\u1ec7t Nam",
        code: "COOPBANK",
        bin: "970446",
        isTransfer: 0,
        short_name: "COOPBANK",
        logo: "https://api.vietqr.io/img/COOPBANK.16fc2602.png",
        vietqr: 0
    }], [])
    return (
        <div className="component-settings-admin-content" style={{height: 50, maxWidth: "100%", width: "100%", textOverflow: "ellipsis", overflow: "hidden", border: "1px solid #e7e7e7", display: "flex", alignItems: 'center', padding: 5}}>
            {
                props.is_bank !== true && <input onChange={(e)=> props.onChange(e.target.value)} type="text" className="component-settings-admin-content-x" style={{width: "100%", height: "100%", border: "none", outline: "none", background: "transparent", color: "#fff", fontSize: 18}} value={props.content} />
            }
            {
                props.is_bank=== true && <select value={props.value} onChange={(e)=> props.onChange(e.target.value)} className="select-bank" style={{width: "100%", height: "100%", color: "#fff", background: "transparent", border: "none", outline: "none", fontSize: 18}}>
                    {
                        array_bank.map((item, key)=> <option key={item.id} className="option-bank" value={item.code} style={{color: "#000"}}>
                            <img src={item.logo} alt="open" className="option-bank-img" style={{width: 24, aspectRatio: "831 / 311"}} /><span style={{color: "#000"}}>{item.name}</span>
                        </option>)
                    }
                </select>

            }
        </div>
    )
}


export default X