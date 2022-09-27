import React, { useContext, useState } from "react";
import "./Account.sass";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Payment } from "../Recharge/Recharge";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from "react-copy-to-clipboard";
import ApiIcon from '@mui/icons-material/Api';
import TwoFaAuthentication from "./TwoFa";
import ApiDocument from "./ApiDocument";
import { SocketContext } from "../../App";

const Account = (props) => {
  return (
    <div className="wrapper-account-page">
      <div className="account-page">
        <Left {...props} />
        <Right {...props} />
      </div>
    </div>
  );
};

const Left = (props) => {
  const { lang }= useContext(SocketContext)
  const array_link_account = [
    { text: lang=== "vn" ? "Thông tin cá nhân" : "Infomation", icon: <PersonIcon />, link: "/info" },
    {
      text: "Oauth2 (2FA)",
      icon: <LockIcon />,
      link: "/2fa",
    },
    { text: lang=== "vn" ? "Đổi mật khẩu" : "Change password", icon: <VpnKeyIcon />, link: "/change_password" },
    {text: lang=== "vn" ? "Tài liệu Api" : "Api documentation", icon: <ApiIcon />, link: "/api_document"}
  ];
  const array_link_recharge = [
    {
      text: props.name_bank,
      icon: props.logo_bank,
      link: "/channel_1",
      typeIcon: "img",
    },
  ];
  return (
    <div className="left-side-account">
      {
        <>
          {props.is_account === true &&
            array_link_account?.map((item, key) => (
              <ComponentLinkLeft type={"account"} key={key} {...item} />
            ))}
        </>
      }
      {
        <>
          {props.is_recharge === true &&
            array_link_recharge?.map((item, key) => (
              <ComponentLinkLeft type={"recharge"} key={key} {...item} />
            ))}
        </>
      }
    </div>
  );
};

const ComponentLinkLeft = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "wrapper-link-component-link-left-link wrapper-link-component-link-left-link-active"
          : "wrapper-link-component-link-left-link wrapper-link-component-link-left-link-inactive"
      }
      to={`/${props.type}${props.link}`}
    >
      <div className="component-link-left-link">
        {props.typeIcon === "img" ? (
          <div className="component-link-left-link-icon">
            <img
              alt="open"
              src={props.icon}
              className="img-component-link-left-link-icon"
              style={{ width: "auto", height: 20, objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="component-link-left-link-icon">{props.icon}</div>
        )}
        <div className="component-link-right-link-text">{props.text}</div>
      </div>
    </NavLink>
  );
};

const Right = (props) => {
  return (
    <div className="right-side-account">
      {props.is_account === true && (
        <Routes>
          <Route
            path="/"
            element={<Navigate replace={true} to={"/account/info"} />}
          />
          <Route path="/info" element={<Infomation {...props} />} />
          <Route path="/2fa" element={<TwoFa {...props} />} />
          <Route
            path="/change_password"
            element={<ChangePassword {...props} />}
          />
          <Route path={"/api_document/*"} element={<ApiDocument {...props} />} />
        </Routes>
      )}
      {props.is_recharge === true && (
        <Routes>
          <Route
            path="/"
            element={<Navigate replace={true} to={"/recharge/channel_1"} />}
          />
          <Route path="/channel_1" element={<Payment {...props} />} />
          {/* <Route path="/channel_2" element={<TwoFa />} />
          <Route path="/channel_3" element={<ChangePassword />} /> */}
        </Routes>
      )}
    </div>
  );
};

const Infomation = (props) => {
  const { lang }= useContext(SocketContext)
  return (
    <div className="infomation-account">
      <Title info={lang=== "vn" ? "Thông tin cá nhân" : "Infomation"} />
      <DetailInfo {...props} />
    </div>
  );
};

const DetailInfo = (props) => {
  const [openApiKey, setOpenApiKey]= useState(()=> false)
  const { lang }= useContext(SocketContext)
  const [copy, setCopy]= useState(()=> false)
  return (
    <div className="wrapper-detail-infomation-account">
      <div className="detail-infomation-account">
        <ComponentDetailInfo
          left={lang=== "vn" ? "Tài khoản: ": "Account: "}
          right={props.data.account}
          placeholder={props.data.account}
          readOnly={true}
        />
        <ComponentDetailInfo
          left={"Email: "}
          right={props.data.email}
          placeholder={props.data.email}
          readOnly={true}
        />
        <ComponentDetailInfo
          left={lang=== "vn" ? "Số tiền: " : "Balance: "}
          right={props.data.balance}
          placeholder={props.data.email}
          readOnly={true}
        />
        <ComponentDetailInfo
          left={lang=== "vn" ? "Tiền khuyến mại: " : "Promotion: "}
          placeholder={props.data.email}
          right={props.data.promotion}
          readOnly={true}
        />
        <ComponentDetailInfo
          left={"Api key: "}
          placeholder={openApiKey=== true ? props.data.api_key : "************"}
          right={openApiKey=== true ? props.data.api_key : "************"}
          readOnly={true}
          openButton={openApiKey=== false ? <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 8, cursor: "pointer"}} onClick={()=> setOpenApiKey(()=> true)}><VisibilityIcon /></div> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 8, cursor: "pointer"}} onClick={()=> setOpenApiKey(()=> false)}><VisibilityOffIcon /></div>}
          copyButton={openApiKey=== true && <CopyToClipboard onCopy={()=> {setCopy(()=> true);setTimeout(()=> setCopy(()=> false), 2500)}} text={props.data.api_key}><div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}><ContentCopyIcon /></div></CopyToClipboard>}
          copySuccessMessage={copy=== true && <span style={{color: "green", fontSize: 14}}>{lang=== "vn" ? "Copy api thành công" : "Api was copy succesfully"}</span>}
        />
      </div>
    </div>
  );
};

const ComponentDetailInfo = (props) => {
  return (
    <div className="component-detail-info-account">
      <LeftComponentDetailInfo {...props} />
      <RightComponentDetailInfo {...props} />
    </div>
  );
};

const LeftComponentDetailInfo = (props) => {
  return <div className="left-component-detail-info">{props.left}</div>;
};

const RightComponentDetailInfo = (props) => {
  return (
    <div className="right-component-detail-info" style={{display: "inline-flex", gap: 10}}>
      <input
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className="inp-right-component-detail-info"
        value={props.right}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
      />
      {props.openButton}
      {props.copyButton}
      {props.copySuccessMessage}
    </div>
  );
};

export const Title = (props) => {
  return <div className="title-common">{props.info}</div>;
};

const TwoFa = (props) => {
  const  { lang }= useContext(SocketContext)
  return (
    <div className="two-fa">
      <Title info={"Oauth2"} />
      {
        props?.oauth2=== false &&
        <TwoFaAuthentication {...props} />
      }
      {
        props?.oauth2=== true &&
        <div style={{textAlign: "center", margin: "16px 0"}}>{lang=== "vn" ? "Bạn đã xác thực oauth2" : "You was verified oauth2"}</div>
      }
    </div>
  );
};

const ChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState(() => "");
  const [newPassword, setNewPassword] = useState(() => "");
  const [confirmNewPassword, setConfirmNewPassword] = useState(() => "");
  const [state, setState] = useState(() => false);
  const [message, setMessage] = useState(() => "");
  const changePassword = async () => {
    const res = await axios({
      url: `${SERVER_URL}/change_password`,
      method: "post",
      data: {
        old_password: currentPassword,
        new_password: newPassword,
        confirmNewPassword,
        account: props.data.account,
      },
      responseType: "json",
    });
    const result = await res.data;
    setState(() => result.change);
    setMessage(() => result.message);
    setTimeout(() => {
      if (result.change === true) {
        return window.location.reload();
      }
    }, 1000);
  };
  const { lang }= useContext(SocketContext)
  return (
    <div className="change-password">
      <Title info={lang=== "vn" ? "Đổi mật khẩu" : "Change password"} />
      <MainChangePassword
        {...props}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
      />
      {
        <div
          style={{
            margin: "8px",
            fontSize: 12,
            color: state === true ? "green" : "red",
          }}
        >
          {message}
        </div>
      }
      {currentPassword.trim().length > 0 &&
        newPassword.trim().length > 0 &&
        confirmNewPassword.trim().length > 0 && (
          <div
            className="w-btn-change-password"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <button
              onClick={() => changePassword()}
              className="btn-change-password"
              style={{
                height: 40,
                width: 200,
                borderRadius: 80,
                background: "#2e89ff",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {lang=== "vn" ? "Cập nhật" : "Update"}
            </button>
          </div>
        )}
    </div>
  );
};

const MainChangePassword = (props) => {
  const { lang }= useContext(SocketContext)

  return (
    <div className="wrapper-main-change-password">
      <div className="main-change-password">
        <ComponentDetailInfo
          {...props}
          type={"password"}
          value={props.currentPassword}
          onChange={props.setCurrentPassword}
          left={lang=== "vn" ? "Mật khẩu hiện tại: " : "Current password: "}
          right={props.currentPassword}
          placeholder={lang=== "vn" ? "Mật khẩu hiện tại" : "Current password: "}
          readOnly={false}
        />
        <ComponentDetailInfo
          {...props}
          type={"password"}
          value={props.newPassword}
          onChange={props.setNewPassword}
          left={lang=== "vn" ? "Mật khẩu mới: " :"New password"}
          right={props.newPassword}
          placeholder={lang=== "vn" ? "Mật khẩu mới" : "New password"}
          readOnly={false}
        />
        <ComponentDetailInfo
          {...props}
          type={"password"}
          value={props.confirmNewPassword}
          onChange={props.setConfirmNewPassword}
          left={lang=== "vn" ? "Nhập lại mật khẩu mới: " : "Confirm new password"}
          right={props.confirmNewPassword}
          placeholder={lang=== "vn" ? "Nhập lại mật khẩu mới: " : "Confirm new password"}
          readOnly={false}
        />
      </div>
    </div>
  );
};

export default Account;
