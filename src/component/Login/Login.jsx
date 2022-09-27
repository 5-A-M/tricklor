import React, { Fragment, memo, useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Login.sass";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import Cookie from "js-cookie";
import { SocketContext } from "../../App";
import { useCallback } from "react";
import { Button, CircularProgress } from "@mui/material";

const LoginPopup = (props) => {
  const { lang}= useContext(SocketContext)
  const [convertSignup, setConvertSignup] = useState(() => false);
  const [account, setAccount] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  const [oauth2, setOauth2] = useState(() => false);
  const [forgotPassword, setForgotPassword] = useState(() => false);
  return (
    <div className="wrapper-login" style={{ zIndex: 99 }}>
      <div className="login-p">
        <CloseLoginComponent {...props} setOpen={props.setOpen} />
        {forgotPassword === false && convertSignup === true && (
          <Title
            title1={lang=== "vn" ? "Đăng ký": "Sign up"}
            title2={lang=== "vn"? "Bạn cần đăng ký để sử dụng dịch vụ" : "You need sign up to use our services"}
          />
        )}
        {forgotPassword === false && convertSignup === false && (
          <Title
            title1={lang=== "vn"? "Đăng nhập" : "Login"}
            title2={lang=== "vn"? "Bạn cần đăng nhập để sử dụng dịch vụ" : "You need login to use our services"}
          />
        )}
        {forgotPassword === true && (
          <Title
            title1={lang=== "vn"? "Quên mật khẩu" : "Forgot password"}
            title2={lang=== "vn"? "Bạn cần nhập tài khoản cần tìm" : "You need typing what account you find"}
          />
        )}
        <BodyLogin
          password={password}
          account={account}
          email={email}
          confirmPassword={confirmPassword}
          setAccount={setAccount}
          setPassword={setPassword}
          setEmail={setEmail}
          setConfirmPassword={setConfirmPassword}
          setConvertSignup={setConvertSignup}
          convertSignup={convertSignup}
          setOauth2={setOauth2}
          oauth2={oauth2}
          forgotPassword={forgotPassword}
          setForgotPassword={setForgotPassword}
        />
      </div>
    </div>
  );
};

export const CloseLoginComponent = memo((props) => {
  return (
    <div className="close-login-component">
      <div
        className="close-login-icon"
        onClick={() => props.setOpen(() => false)}
      >
        <CloseIcon
          titleAccess="Close"
          className="close-login-icon-icon"
          style={{ width: 36, height: 36, color: "#3a3b3c" }}
        />
      </div>
    </div>
  );
});

const Title = (props) => {
  return (
    <div className="title-component-login">
      <Title1 {...props} />
      <Title2 {...props} />
    </div>
  );
};

const Title1 = (props) => {
  const { color_code } = useContext(SocketContext);

  return (
    <div className="title-component-login-title-1">
      <h5
        className="title-component-login-title-1-heading"
        style={{ color: color_code }}
      >
        {props.title1}
      </h5>
    </div>
  );
};

const Title2 = (props) => {
  return <div className="title-component-login-title-2">{props.title2}</div>;
};

const BodyLogin = (props) => {
  const [twoFa, setTwoFa] = useState(() => "");
  const [uid, setUid] = useState(() => "");
  const [enterLogin, setEnterLogin] = useState(() => false);
  const [listUserEmail, setListUserEmail] = useState(() => []);
  const [loading, setLoading] = useState(() => undefined);
  const findUserByEmail = async () => {
    setLoading(() => true);
    const res = await axios({
      url: `${SERVER_URL}/find/c/email`,
      method: "get",
      params: {
        email: props?.email,
      },
      responseType: "json",
    });
    const result = await res.data;
    setLoading(() => false);
    return setListUserEmail(() => result.data);
  };
  const [chooseAccount, setChooseAccount] = useState(() => "");
  const isChooseAccount = chooseAccount?.length <= 0 ? true : false;
  const [codeVerify, setCodeVerify] = useState(() => "");
  const [messageVerify, setMessageVerify] = useState(() => "");
  const [loading2, setLoading2] = useState(() => false);
  const [resetPassword, setResetPassword] = useState(() => false);
  const [completePassword, setCompletePassword] = useState(() => false);
  const sendCodeForgot = async () => {
    setLoading2(() => true);
    const res = await axios({
      url: `${SERVER_URL}/get/code/c/forgot`,
      method: "post",
      data: {
        account: chooseAccount,
        email: props?.email
      },
      responseType: "json",
    });
    const result = await res.data;
    setLoading2(() => false);
    setCompletePassword(() => true);
    return result;
  };
  const checkCodeVerify = async () => {
    const res = await axios({
      url: `${SERVER_URL}/verify/c/code`,
      method: "post",
      data: {
        code: codeVerify,
        account: chooseAccount,
      },
      responseType: "json",
    });
    const result = await res.data;
    setMessageVerify(() => result.data.message);
    if (result.data.verify === true) {
      setResetPassword(() => true);
    }
    return result;
  };
  const [newPassword, setNewPassword]= useState(()=> "")
  const [confirmNewPassword, setConfirmNewPassword]= useState(()=> "")
  const [messageFinal, setMessageFinal]= useState(()=> "")
  const finalReset= async()=> {
    const res= await axios({
        url: `${SERVER_URL}/reset/c/password`,
        method: "post",
        data: {
            password: newPassword,
            account: chooseAccount,
            confirmPassword: confirmNewPassword
        },
        responseType: "json"
    })
    const result= await res.data
    setMessageFinal(()=> result.message)
    if(result.reset=== true) {
        setTimeout(()=> {
            window.location.reload()
        }, 300)        
    }
  }
  const { lang }= useContext(SocketContext)
  return (
    <div className="title-component-login-body-login">
      {props.oauth2 === false && (
        <>
            {
                resetPassword=== false && <>
                {
                  <>
                    {
                      <>
                        {completePassword === false && (
                          <>
                            {props.forgotPassword === false && (
                              <>
                                <Wrapper
                                  setEnterLogin={setEnterLogin}
                                  logo={<PersonIcon />}
                                  type={"text"}
                                  placeholder={lang=== "vn"? "Tài khoản...": "Account..."}
                                  value={props.account}
                                  onChange={props.setAccount}
                                />
                                {props.convertSignup === true && (
                                  <Wrapper
                                    logo={<EmailIcon />}
                                    type={"email"}
                                    placeholder={"Email..."}
                                    value={props.email}
                                    onChange={props.setEmail}
                                  />
                                )}
                                <Wrapper
                                  setEnterLogin={setEnterLogin}
                                  logo={<KeyIcon />}
                                  type={"password"}
                                  placeholder={lang=== "vn"? "Mật khẩu...": "Password..."}
                                  value={props.password}
                                  onChange={props.setPassword}
                                />
      
                                {props.convertSignup === true && (
                                  <Wrapper
                                    logo={<KeyIcon />}
                                    type={"password"}
                                    placeholder={lang=== "vn"? "Nhập lại mật khẩu...":"Confirm password..."}
                                    value={props.confirmPassword}
                                    onChange={props.setConfirmPassword}
                                  />
                                )}
                                {props.convertSignup === false && <Side {...props} />}
                                {props.convertSignup === false ? (
                                  <BtnExe
                                    enterLogin={enterLogin}
                                    {...props}
                                    setUid={setUid}
                                    setTwoFa={setTwoFa}
                                  />
                                ) : (
                                  <BtnExeS {...props} />
                                )}
                                <ToSignUp {...props} />
                              </>
                            )}
                            {/*  */}
                            {props.forgotPassword === true && (
                              <>
                                <Wrapper
                                  logo={<EmailIcon />}
                                  type={"email"}
                                  placeholder={lang=== "vn"? "Nhập email của bạn": "Type your email"}
                                  value={props.email}
                                  onChange={props.setEmail}
                                />
                                <br />
                                {loading === false && listUserEmail?.length > 0 && (
                                  <>
                                    <div
                                      style={{
                                        marginBottom: 16,
                                        fontSize: 18,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {
                                        lang=== "vn"? "Chọn một tài khoản để lấy lại mật khẩu" :"Choose a account to recover password"
                                      }
                                    </div>
                                    {listUserEmail?.map((item, key) => (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          margin: "8px 0",
                                        }}
                                        key={key}
                                        className={"list-user-f-email"}
                                      >
                                        <input
                                          onChange={(e) =>
                                            setChooseAccount(e.target.value)
                                          }
                                          type="radio"
                                          name={"account"}
                                          value={item.account}
                                        />{" "}
                                        <span>{item.account}</span>
                                      </div>
                                    ))}
                                  </>
                                )}
                                {loading === false && listUserEmail?.length <= 0 && (
                                  <div>
                                    {
                                      lang=== "vn" ? "Không tìm thấy tài khoản khớp với email này" : "Can't find out any account with this email"
                                    }
                                  </div>
                                )}
                                <br />
                                <div
                                  className={"wrapper-verify-forgot-password"}
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {listUserEmail?.length > 0 && (
                                    <Button
                                      onClick={sendCodeForgot}
                                      disabled={isChooseAccount}
                                      variant={"contained"}
                                    >
                                      {loading2 === false ? (
                                        "Gửi mã"
                                      ) : (
                                        <CircularProgress style={{ color: "#fff" }} />
                                      )}
                                    </Button>
                                  )}
                                  {listUserEmail?.length <= 0 &&
                                    loading === undefined && (
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Button
                                          onClick={findUserByEmail}
                                          variant={"contained"}
                                        >
                                          {
                                            lang=== "vn" ? "Xác nhận" :"Confirm"
                                          }
                                        </Button>
                                      </div>
                                    )}
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    }
                  </>
                }
                <Fragment>
                  {completePassword === true && (
                    <div>
                      <Title
                        title={
                          lang=== "vn"? "Chúng tôi vừa gửi một mã xác thực gồm 6 chữ số đến email của bạn" : "We've just sent a verify code include 6 digits to you email"
                        }
                        title2={
                          lang=== "vn" ? "Vui lòng điền mã vào form dưới đây để hoàn tất đặt lại mật khẩu": "Please type code into below form to complete reset your password"
                        }
                      />
                      <br />
                      <Wrapper
                        logo={<EmailIcon />}
                        type={"text"}
                        placeholder={lang=== "vn"? "Nhập mã xác thực": "Type verify code"}
                        value={codeVerify}
                        onChange={setCodeVerify}
                      />
                      <br />
                      {messageVerify}
                      <br />
                      <Button onClick={checkCodeVerify} variant={"contained"}>
                        {
                          lang=== "vn" ? "Xác nhận" : "Confirm"
                        }
                      </Button>
                    </div>
                  )}
                </Fragment>
              </>
            }
            {
                resetPassword=== true && <div>
                    <Title title={lang=== "vn"?"Đặt lại mật khẩu": "Reset password"} title2={lang=== true ? "Mật khẩu nên gồm chữ thường và chữ hoa để tăng tính bảo mật" : "Password should have lower letter and upper letter to enhance security"} />
                    <br />
                    <Wrapper
                        logo={<KeyIcon />}
                        type={"password"}
                        placeholder={lang==="vn"? "Nhập mật khẩu mới": "Type new password"}
                        onChange={setNewPassword}
                      />
                    <br />
                    <Wrapper
                        logo={<KeyIcon />}
                        type={"password"}
                        placeholder={lang==="vn"? "Nhập lại mật khẩu": "Confirm password"}
                        onChange={setConfirmNewPassword}
                      />
                    <br />
                        {messageFinal}
                    <br />
                    <div style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: "center"}}>
                        <Button onClick={finalReset} variants={"contained"}>{lang=== true ? "Xong" : "Done"}</Button>
                    </div>
                </div>
            }
        </>
      )}
      {props.oauth2 === true && (
        <VerifyOauth2 {...props} twoFa={twoFa} uid={uid} />
      )}
    </div>
  );
};

const VerifyOauth2 = (props) => {
  const [login, setLogin] = useState(() => false);
  const { socketState, lang } = useContext(SocketContext);
  const [check, setCheck] = useState(() => false);
  useEffect(() => {
    if (props?.twoFa) {
      socketState?.emit("login_auth2", { roomId: props?.twoFa });
    }
  }, [socketState, props?.twoFa]);
  useEffect(() => {
    socketState?.on("twoFa", (data) => {
      setLogin(() => data.is_verify);

      if (data.is_verify === true) {
        login2Fa(props?.uid);
      }
    });
  }, [socketState, props?.uid]);
  const login2Fa = async (uid) => {
    const res = await axios({
      url: `${SERVER_URL}/2fa/user`,
      method: "post",
      responseType: "json",
      data: {
        id_user: uid,
      },
    });
    const result = await res.data;
    setCheck(() => true);
    Cookie.set("uid", result.uid, { expires: 7 });
    Cookie.set("sid", result.sid, { expires: 7 });
    return setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <div
      className={"verify-oauth-2"}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {check === false && (
        <>
          <div style={{ textAlign: "center" }}>
            {
              lang=== true ? "Vui lòng quét mã đăng nhập qr của bạn để tiến hành đăng nhập" :"Please scan your secret qr code to perform login"
            }
          </div>
          <br />
          {login === false && (
            <div style={{ textAlign: "center" }}>{lang=== "vn" ? "Đang chờ xác thực" :"Pending"}</div>
          )}
        </>
      )}
      {login === true && (
        <div
          style={{
            textAlign: "center",
            color: "green",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {
            lang=== "vn" ? "Đăng nhập thành công" :"Login successfully"
          }
        </div>
      )}
    </div>
  );
};

const Logo = (props) => {
  return <div className="title-component-logo-container">{props.logo}</div>;
};

const Inp = (props) => {
  return (
    <div className="title-component-inp-container">
      <input
        onKeyUp={(e) => e.key === "enter" && props?.setEnterLogin(() => true)}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type}
        className="inp-title-component"
        placeholder={props.placeholder}
        autoComplete="off"
      />
    </div>
  );
};

const Wrapper = (props) => {
  return (
    <div className="wrapper-home-container-1">
      <Logo {...props} />
      <Inp {...props} />
    </div>
  );
};

const Side = (props) => {
  return (
    <div className="side-container">
      <SaveAccount {...props} />
      <ForgotPassword {...props} />
    </div>
  );
};

const SaveAccount = (props) => {
  const { lang }= useContext(SocketContext)
  const saveaccount = () => {
    localStorage.setItem("account", props.account);
    localStorage.setItem("password", props.password);
  };
  return (
    <div className="save-account">
      <input
        onClick={() => saveaccount()}
        type="checkbox"
        className="inp-save-account"
      />
      <span className="span-save-account">{lang=== "vn" ? "Lưu tài khoản" : "Save password"}</span>
    </div>
  );
};

const ForgotPassword = (props) => {
  const { color_code, lang } = useContext(SocketContext);
  return (
    <div
      className="forgot-password"
      onClick={() => props?.setForgotPassword(() => true)}
    >
      <span style={{ color: color_code }} className="span-forgot-password">
        {lang=== "vn" ? "Quên mật khẩu" :"Forgot password"}
      </span>
    </div>
  );
};

const BtnExe = (props) => {
  const [message, setMessage] = useState(() => "");
  const [state, setState] = useState(() => false);
  const [loading, setLoading] = useState(() => false);
  const login = useCallback(async () => {
    setLoading(() => true);
    const res = await axios({
      url: `${SERVER_URL}/login`,
      method: "post",
      data: {
        account: props.account,
        password: props.password,
      },
      responseType: "json",
    });
    setLoading(() => false);
    const result = await res.data;
    setMessage(() => result.message);
    setState(() => result.login);
    if (result.login === true) {
      Cookie.set("uid", result.uid, { expires: 7 });
      Cookie.set("sid", result.sid, { expires: 7 });
      window.location.reload();
    }
    if (result.login === "verify") {
      props.setTwoFa(() => result.twoFa);
      props.setUid(() => result.uid);
      props.setOauth2(() => true);
    }
  }, [props]);
  useEffect(() => {
    if (props?.enterLogin === true) {
      login();
      props?.setEnterLogin(() => false);
    }
  }, [login, props]);
  const { color_code, lang } = useContext(SocketContext);
  return (
    <>
      <div
        style={{
          margin: "8px",
          fontSize: 12,
          color: state === true ? "green" : "red",
        }}
      >
        {message}
      </div>
      <div className="btn-exe">
        <button
          disabled={loading === true ? true : false}
          onClick={() => login()}
          className="button-btn-exe"
          style={{
            cursor: loading === true ? "not-allowed" : "pointer",
            opacity: loading === true ? 0.5 : 1,
            background: color_code,
          }}
        >
          {loading === false ? (lang=== "vn"? "Đăng nhập": "Log in") : (lang=== "vn" ? "Đang đăng nhập": "Logging in")}
        </button>
      </div>
    </>
  );
};

const BtnExeS = (props) => {
  const [message, setMessage] = useState(() => "");
  const [state, setState] = useState(() => false);
  const signup = async () => {
    const res = await axios({
      url: `${SERVER_URL}/signup`,
      method: "post",
      data: {
        account: props.account,
        password: props.password,
        email: props.email,
      },
    });
    const result = await res.data;
    setMessage(() => result.message);
    setState(() => result.signup);
    setTimeout(() => {
      if (result.signup === true) {
        return props.setConvertSignup((prev) => !prev);
      }
    }, 1000);
  };
  const { color_code, lang } = useContext(SocketContext);
  return (
    <>
      <div
        style={{
          margin: "8px",
          fontSize: 12,
          color: state === true ? "green" : "red",
        }}
      >
        {message}
      </div>
      <div className="btn-exe">
        <button
          onClick={() => signup()}
          className="button-btn-exe"
          style={{ cursor: "pointer", background: color_code }}
        >
          {
            lang=== "vn" ? "Đăng ký": "Sign up"
          }
        </button>
      </div>
    </>
  );
};

const ToSignUp = (props) => {
  const { color_code, lang } = useContext(SocketContext);
  return (
    <div className="to-sign-up">
      {props.convertSignup === false && (
        <>
          <span className="span-to-sign-up">{lang=== "vn" ? "Chưa có tài khoản?" :"Haven't an account yet?"} ? </span>{" "}
          <strong
            onClick={() => {
              props.setConvertSignup((prev) => !prev);
              props.setAccount(() => "");
              props.setPassword(() => "");
              props.setEmail(() => "");
              props.setConfirmPassword(() => "");
            }}
            className="strong-to-sign-up"
            style={{ color: color_code }}
          >
            {
              lang=== "vn" ? "Đăng ký ngay" : "Sign up now"
            }
          </strong>
        </>
      )}
      {props.convertSignup === true && (
        <>
          <span className="span-to-sign-up">{lang=== "vn" ? "Đã có tài khoản" :"You already an account?"} ? </span>{" "}
          <strong
            onClick={() => {
              props.setConvertSignup((prev) => !prev);
              props.setAccount(() => "");
              props.setPassword(() => "");
              props.setEmail(() => "");
              props.setConfirmPassword(() => "");
            }}
            className="strong-to-sign-up"
            style={{ color: color_code }}
          >
           {
            lang==="vn" ? "Đăng nhập" : "Log in"
           }
          </strong>
        </>
      )}
    </div>
  );
};

export default LoginPopup;
