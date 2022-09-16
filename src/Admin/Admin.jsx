import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SERVER_URL } from "../config/config";
import "./Admin.sass";
import Content from "./Component/Content/Content";
import Menu from "./Component/Menu/Menu";
import "./responsive.sass"

const Admin = (props) => {
  return (
    <div className="admin-page">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      {sessionStorage.getItem("ld") === "true" ? (
        <>
          <Menu />
          <Content />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

const Login = (props) => {
  const [account, setAccount] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [message, setMessage] = useState(() => "");
  const loginAdmin = async () => {
    const res = await axios({
      url: `${SERVER_URL}/login/admin`,
      method: "post",
      data: {
        account,
        password,
      },
    });
    const result = await res.data;
    if (result.login === true) {
      sessionStorage.setItem("ld", true);
      return window.location.reload()
    } else {
      setMessage(() => result.message);
    }
  };
  return (
    <div
      className="login-admin-page"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          padding: 10,
          borderRadius: 10,
          border: "1px solid #e7e7e7",
        }}
      >
        <div style={{ margin: "8px 0" }}>Tên đăng nhập: </div>
        <TextField
          onChange={(e) => setAccount(e.target.value)}
          style={{ width: "100%", color: " #fff", borderColor: "#fff" }}
          placeholder={"Tên đăng nhập"}
          type={"text"}
        />
        <div style={{ margin: "16px 0" }}></div>
        <div style={{ margin: "8px 0" }}>Mật khẩu</div>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", color: " #fff", borderColor: "#fff" }}
          placeholder={"Mật khẩu"}
          type={"password"}
        />
        <div style={{ margin: "16px 0" }}></div>
        <div style={{ margin: "16px 0" }}></div>
        <div style={{ color: "red" }}>{message}</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => loginAdmin()} variant={"contained"}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
