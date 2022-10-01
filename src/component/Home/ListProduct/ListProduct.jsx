import { Fragment, useContext, useState } from "react";
import LoginPopup, { CloseLoginComponent } from "../../Login/Login";
import validUrl from "valid-url";
import Cookie from "js-cookie";
import "./ListProduct.sass";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { SERVER_URL } from "../../../config/config";
import Alert from "../../../Admin/Component/Alert/Alert";
import { SocketContext } from "../../../App";
import { useEffect } from "react";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PublicIcon from "@mui/icons-material/Public";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { browserName, CustomView } from "react-device-detect";

const ListProduct = (props) => {
  return (
    <div className="list-product-container">
      <table className="list-product-table">
        {/*  */}
        {props.is_new === true ? (
          <THeadNew isNation={props.isNation} isPrice={props.isPrice} array_header={props.array_header} p={props.p} />
        ) 
        // 
        : (
          <THead array_header={props.array_header} />
        )}
        {/* 
        
        */}
        {props.is_new === true ? (
          <TBodyNew
            {...props}
            promotion={props.promotion}
            balance={props.balance}
            arr_product={props.arr_product}
          />
        ) : (
          <TBody
            promotion={props.promotion}
            balance={props.balance}
            arr_product={props.arr_product}
          />
        )}
      </table>
    </div>
  );
};

const THead = (props) => {
  return (
    <thead className="thead-container">
      <tr className="thead-container-tr">
        {props.array_header.map((item, key) => (
          <Th key={key} {...item} />
        ))}
      </tr>
    </thead>
  );
};

const THeadNew = (props) => {
  const { color_code, lang }= useContext(SocketContext)
  return (
    <thead className="thead-container">
      <tr className="thead-container-tr">
        {props.array_header.map((item, key) => (
          <Th className={`th-com-h-${key}`} key={key} text={item.name} iconImg={item.icon} is_img={true} />
          ))
        }
        {
          props.isNation=== true && <Th className={`th-com-h-expected`} text={lang=== "vn" ?"Quốc gia": "Nation"} icon={<PublicIcon style={{color: color_code}} />} />
        }
        {
          props?.p &&
        <Th text={lang=== "vn" ?"Giá": "Price"} icon={<SellIcon style={{color: color_code}} />} />
        }
        <Th text={lang==="vn" ?"Số lượng": "Amount"} icon={<ShoppingCartIcon style={{color: color_code}} />} />
        <Th />

      </tr>
    </thead>
  );
};

const Th = (props) => {
  
  return (
    <th className={`th-container ${props.className ? props.className : "no-active-h-class"}`}>
      <p className="th-container-p">{props.icon}</p>
      {
        props.is_img=== true && props.iconImg?.length > 0 &&
        <img src={props.iconImg} alt="open" style={{width: 24, height: 24, objectFit: "cover"}} />
      }
      <span className="th-container-span">{props.text}</span>
      {/* <span className="th-container-span">{props}</span> */}
    </th>
  );
};

export default ListProduct;

const TBody = (props) => {
  return (
    <tbody className="tbody-container">
      {props?.arr_product?.map((item, key) => (
        <Tr
          promotion={props.promotion}
          balance={props.balance}
          key={item.id}
          {...item}
        />
      ))}
    </tbody>
  );
};

const TBodyNew = (props) => {
  const [data, setData] = useState(() => []);
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${SERVER_URL}/get/c/service/detail`,
        method: "get",
        responseType: "json",
        params: {
          id_service: props.id_service,
        },
      });
      const result = await res.data;
      // console.log(result.data)
      return setData(() => result.data);
    })();
  }, [props.id_service]);
  return (
    <tbody className="tbody-container">
      {data &&
        data?.map((item, key) => (
          <Fragment key={key}>
            <Tr
              setIsNation={props.setIsNation}
              p={item?.price}
              nation={item?.nation}
              is_new={true}
              promotion={props.promotion}
              balance={props.balance}
              key={key}
              {...item}
            />
          </Fragment>
          
        ))}
    </tbody>
  );
};

const Tr = (props) => {
  const array_body = props;
  const [amount, setAmount] = useState(() => 0);
  useEffect(() => {
    if (!props?.is_new === true) {
      (async () => {
        if (array_body) {
          const res = await axios({
            url: `${SERVER_URL}/get/amount/product`,
            method: "get",
            params: {
              title: array_body.title,
            },
            responseType: "json",
          });
          const result = await res.data;
          return setAmount(() => result.amount);
        }
      })();
    }

    if (props?.is_new === true) {
      (async () => {
        if (array_body) {
          const res = await axios({
            url: `${SERVER_URL}/get/amount/product`,
            method: "get",
            params: {
              title: props?.menu?.[0],
            },
            responseType: "json",
          });
          const result = await res.data;
          return setAmount(() => result.amount);
        }
      })();
    }
  // eslint-disable-next-line
  }, [props.is_new, array_body.title, props?.menu]);
  useEffect(()=> {
    if(props?.nation?.length > 0) {
      props.setIsNation(()=> true)
    }
  }, [props])
  const {lang }= useContext(SocketContext)
  return (
    <tr className="tbody-container-tr">
      {/* 
       */}
      {!props.is_new === true && (
        <>
          <Td icon={array_body.icon} text={array_body.title} detail_product={array_body.detail_product} />
          <Td text={array_body.pop3} />
          <Td text={array_body.live} />
          <Td
            icon={array_body.nation?.length > 0 ? array_body.nation : (lang=== "vn" ? "Chưa có" : "Unset")}
            text={!validUrl.isUri(array_body.nation) ? true : false}
          />
          <Td text={array_body.price} />
         
          <Td text={amount} />
          <WrapTd>
            <Td
              amount={amount}
              setAmount={setAmount}
              balance={props?.balance}
              promotion={props?.promotion}
              button={parseInt(amount) <= 0 ? (lang=== "vn" ? "Đã hết" : "Ouf of stock") : (lang=== "vn" ?  "Mua" : "Buy")}
              price={parseInt(array_body?.price?.replace("đ", ""))}
              name={array_body?.title}
              amountX={amount}
            />
          </WrapTd>
        </>
      )}
      {/*  */}
      {/*  */}
      {props.is_new === true && (
        <>
          {props?.menu?.map((item, key) => (
            <Fragment key={key}>
              <Td className={`td-com-v-${key}`} text={item} index={key} detail_product={props.detail_product} />
            </Fragment>
            
          ))}
          {
            props?.nation?.length > 0 && <Td className={"th-com-d-expected"} icon={props.nation} />
          }
          {
            props?.p && <Td text={props.p} />
          }
          {
            <Td text={amount || 0} />
          }
          <WrapTd>
            <Td
              amount={amount}
              amountX={amount}
              setAmount={setAmount}
              balance={props?.balance}
              promotion={props?.promotion}
              button={parseInt(amount) <= 0 ? (lang=== "vn" ? "Đã hết" : "Ouf of stock") : (lang=== "vn" ?  "Mua" : "Buy")}
              price={parseInt(props?.p)}
              name={props?.menu?.[0]}
              className={props?.className}
            />
          </WrapTd>
        </>
      )}
    </tr>
  );
};

const WrapTd = ({ children }) => {
  return <>{children}</>;
};

const Td = (props) => {
  const [open, setOpen] = useState(() => false);
  const { color_code, lang }= useContext(SocketContext)
  const [translate1, setTranslate1]= useState(()=> {})
  const [translate2, setTranslate2]= useState(()=> "")
  useEffect(()=> {
    (async()=> {
      if(lang !== "vn" && props.text && parseInt(props?.index)=== 0 ) {
        const res= await axios({
          url: `${SERVER_URL}/api/t/translate`,
          method: "post",
          responseType: "json",
          data: {
            translate: props?.text
          }
        })
        const result= await res.data
        setTranslate1(()=> result.result)
        const res2= await axios({
          url: `${SERVER_URL}/api/t/translate`,
          method: "post",
          responseType: "json",
          data: {
            translate: props?.detail_product
          }
        })
        const result2= await res2.data
        setTranslate2(()=> result2.result)
      }
    })()
  }, [lang, translate1, props.text, props?.index, props?.detail_product])
  return (
    <td className={`td-container ${props?.className ? props?.className : "no-active-c-class"}`}>
      {props.icon && (
        <p className="td-container-p">
          <img src={props.icon} alt="Icon" className="td-container-img" />
        </p>
      )}
      {props.text && parseInt(props?.index) !== 0 && <div className="td-container-span">{props.text}</div>}
      {
        parseInt(props.index)===0 && <div style={{fontWeight: 600}}>
          <div style={{fontSize: 14, fontWeight: 600}}>{lang==="vn" ? props?.text : translate1}</div>
          {
            props?.detail_product && <div style={{fontSize: 12, fontWeight: 600, marginTop: 8, wordBreak: "break-word"}}>{lang=== "vn" ? props?.detail_product : translate2}</div>
          }
        </div>
      }
      {props.button && (
        <div className="td-container-button" style={{background: parseInt(props.amount) <= 0 ?"#555" : color_code, cursor: parseInt(props.amount) <= 0 ?"not-allowed" : "pointer", display: "flex", justifyContent: 'center', alignItems: "center", position: "relative", width: "100%", height: "100%", minWidth: 40}}>
          <button
            disabled={parseInt(props.amount) <= 0 ? true : false}
            className="td-container-button-btn"
            onClick={() => {setOpen(() => true)}}
            style={{
              position: "absolute",
              top: 0, 
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 18,
              background: "transparent",
              cursor: parseInt(props.amount) <= 0 ?"not-allowed" : "pointer",
            }}
          >
            {props.button}
          </button>
          <WrapPopupPurchase {...props}>
          {open === true && (
            <PopupPurchase
              setAmount={props.setAmount}
              amount={props.amount}
              balance={props.balance}
              promotion={props.promotion}
              price={props.price}
              open={open}
              setOpen={setOpen}
              amountX={props.amountX}
              name={props.name}
            />
          )}
          </WrapPopupPurchase>
        </div>
      )}
    </td>
  );
};

const WrapPopupPurchase= ({children, setAmount, name})=> {
  const { socketState } = useContext(SocketContext);
  useEffect(() => {
    socketState.on("update_amount_from_server", (data) => {
      if(data.name === name) {
        setAmount(() => data.amount);
      }
    });
    // eslint-disable-next-line
  }, [name, setAmount]);
  return (
    <>
      {children}
    </>
  )
}

const PopupPurchase = (props) => {
  const [open, setOpen] = useState(() => false);
  const [message, setMessage] = useState(() => "");
  const [amount, setAmount] = useState(() => 1);
  const [successBox, setSuccessBox] = useState(() => false);
  const [order, setOrder] = useState(() => {});
  const [loading, setLoading] = useState(() => false);
  const { setCallAgain, socketState, lang } = useContext(SocketContext);
  const [disabled, setDisabled] = useState(() => false);
  const [isBuy, setIsBuy]= useState(()=> undefined)
  const { user }= useContext(SocketContext)
  const purchaseAccount = async () => {
    setDisabled(() => true);
    const res = await axios({
      url: `${SERVER_URL}/buy/account`,
      method: "post",
      data: {
        balance: props.balance,
        promotion: props.promotion,
        price: parseInt(amount) * parseInt(props.price),
        name: props.name,
        id_user: Cookie.get("uid"),
        amount: parseInt(amount),
        amountX: parseInt(props.amountX),
        name_account: user?.data?.account
      },
    });
    const result = await res.data;
    if (result.purchase === true) {
      updateAmount();
      setOrder(() => result);
      setOpen(() => true);
      setMessage(() => (lang=== "vn" ?  "Mua tài khoản thành công" : "Buy account successfully"));
      setSuccessBox(() => undefined);
      setCallAgain((prev) => !prev);
      setLoading(() => true);
      setTimeout(() => {
        setLoading(() => false);
        setMessage(() => "");
        setOpen(() => false);
        setSuccessBox(() => true);
        setIsBuy(()=> true)
      }, 500);
    } else {
      setOpen(() => true);
      setMessage(() => (lang=== "vn" ? "Mua tài khoản thất bại" : "Buy account failed."));
      setSuccessBox(() => true);
      setTimeout(() => {
        setMessage(() => result.message);
        setOpen(() => false);
        setIsBuy(()=> false)
      }, 500);
    }
    return result;
  };
  const toTextFile = async () => {
    const element = document.createElement("a");
    const file = new Blob(
      
      order?.data?.map(item=> `${item.account}|${item.password}`),
      {
        type: "text/plain",
      }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${order.code_bill}.txt`;
    document.body.appendChild(element);
    element.click();
  };
  const updateAmount = () => {
    socketState.emit("update_amount", { amount: props.amount, number: parseInt(amount), name: props.name});
  };
  const [copy, setCopy]= useState(()=> false)
    const copyE= ()=> {
        setCopy(()=> true)
        setTimeout(()=> {
          setCopy(()=> false)
        }, 1500)
    }
  
  return (
    <div className="purchase-popup">
      <div className="sub-purchase-popup">
        {props?.balance === undefined && (

          <>
            <LoginPopup {...props} />
          </>
        )}
        {props?.balance !== undefined &&
            <>
                <div
                className="sub-close-purchase-popup"
                style={{ display: "flex", justifyContent: "flex-end" }}
                >
                <CloseLoginComponent {...props} />
                </div>
                {successBox === false && (
                <div className="wrapper-purchase-popup" style={{ width: "100%" }}>
                    <Title title={lang==="vn" ? `Sản phẩm: ${props?.name}` : `Product: ${props?.name}`} />
                    <DetailPurchase
                    left={lang==="vn"? "Số lượng": "Amount"}
                    value={amount}
                    onChange={setAmount}
                    readOnly={false}
                    />
                    <DetailPurchase left={lang==="vn"? "Giá": "Price"} value={props.price} readOnly={true} />
                    <DetailPurchase
                    left={lang=== "vn"? "Số tiền": "Price"}
                    value={parseInt(amount) * parseInt(props.price)}
                    readOnly={true}
                    />
                    <br />
                    <div
                    onClick={() => purchaseAccount()}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}
                    >
                    <Button disabled={disabled} variant="contained">
                      {
                        lang=== "vn" ? "Mua" : "Buy"
                      }
                    </Button>
                    </div>
                </div>
                )}
                {loading === true && (
                <div
                    style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </div>
                )}
                {successBox === true && isBuy=== true && (
                <div className="wrapper-purchase-popup" style={{ width: "100%" }}>
                  <div
                  style={{
                    textAlign: "center",
                    color: "#2e89ff",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                  >
                  {
                    lang=== "vn" ? "Bạn đã mua thành công" : "You buy sucessfully"
                  }
                  </div>
                  <br />
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  {lang=== "vn" ? "Mã hóa đơn" : "Code receipt"}: {order.code_bill}
                  </div>
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  {lang=== "vn" ? "Số lượng" : "Amount"}: {amount}
                  </div>
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  {lang=== "vn" ? "Số tiền": "Price"}: {parseInt(amount) * parseInt(props.price)}
                  </div>
                  <br />
                  <div style={{ color: "#000", margin: "8px 0", maxHeight: 200, overflow: "auto"}}>
                    {
                      order?.data?.map((item, key)=> <div className={"list-account-password"} key={key}>{item.account}|{item.password}</div>)
                    }
                  </div>
                  <br />
                  <div style={{ width: "100%", direction: "rtl" }}>
                  {
                    order?.data &&
                    <div style={{display: "flex", justifyContent: 'start', alignItems: "center", gap: 16}}>
                      <Button variant={"contained"} onClick={()=> {toTextFile()}}>{lang=== "vn" ? "Tải file text" : "Download file"}</Button>
                      <CopyToClipboard onCopy={()=> copyE()} text={order?.data?.map(item=> `${item.account.replaceAll(",", "")}|${item.password.replaceAll(",", "")}\n`.replaceAll(",", "zzz"))?.toString()?.replaceAll(",", "")}>
                        <Button variant={"contained"}>
                          {
                            copy=== false ? 
                            <>
                              <CustomView condition={browserName === "Safari"}>
                                  <img src={"https://res.cloudinary.com/cockbook/image/upload/v1664597750/single/308263838_636175607858385_7958392603720330332_n_eqcb1h.png"} alt={""} style={{width: 24, height: 24, }} />
                              </CustomView>
                              <CustomView className={"custom-view-wrap-copy-icon"} style={{display: "flex", justifyContent: 'center', alignItems: "center"}} condition={browserName !== "Safari"}>
                                  <ContentCopyIcon style={{color: "#fff"}} />
                              </CustomView>
                            </>
                            : (lang=== "vn" ? "Copy thành công " : "Copy success")
                          }
                        </Button>
                      </CopyToClipboard>
                    </div>
                  } 
                  {/* <Button onClick={() => toTextFile()} variant={"contained"}>
                    {
                      lang=== "vn" ? "Tải file text" : "Download file"
                    }
                  </Button> */}
                  </div>
                </div>
                )}
                {
                  successBox=== true && isBuy=== false &&
                  <div style={{padding: 16}}>
                    <span style={{textAlign: 'center', display: "flex", justifyContent: 'center', alignItems: "center"}}>
                      {message=== "Tài khoản không đủ tiền, vui lòng nạp thêm tiền vào tài khoản" && (lang=== "vn" ? "Tài khoản không đủ tiền, vui lòng nạp thêm tiền vào tài khoản" : "Your account don't enough money, please add more money to your account")}
                    </span>
                  </div>
                }
            </>
        }
      </div>
      <Alert open={open} duration={2500} message={message} />
    </div>
  );
};

const Title = (props) => {
  const { color_code }= useContext(SocketContext)
  return <div className="title-purchase-popup" style={{color: color_code}}>{props.title}</div>;
};

const DetailPurchase = (props) => {
  return (
    <div className="detail-purchase-detail">
      <div className="detail-purchase-detail-wrap" style={{ width: "100%" }}>
        <strong
          className="strong-detail-purchase-detail"
          style={{ color: "#000" }}
        >
          {props.left}
        </strong>
        <div className="div-detail-purchase-detail">
          <input
            onChange={(e) => props.onChange(e.target.value)}
            readOnly={props.readOnly}
            value={props.value}
            type="number"
            className="inp-div-detail-purchase-detail"
            style={{
              textAlign: "right",
              border: "none",
              outline: "none",
              fontSize: 18,
            }}
          />
        </div>
      </div>
    </div>
  );
};
