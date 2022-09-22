import { useContext, useState } from "react";
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


const ListProduct = (props) => {
  return (
    <div className="list-product-container">
      <table className="list-product-table">
        {/*  */}
        {props.is_new === true ? (
          <THeadNew array_header={props.array_header} p={props.p} />
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
  const { color_code }= useContext(SocketContext)
  return (
    <thead className="thead-container">
      <tr className="thead-container-tr">
        {props.array_header.map((item, key) => (
          <Th key={key} text={item.name} iconImg={item.icon} is_img={true} />
          ))
        }
        {
          props?.p &&
        <Th text={"Giá"} icon={<SellIcon style={{color: color_code}} />} />
        }
        <Th text={"Số lượng"} icon={<ShoppingCartIcon style={{color: color_code}} />} />
        <Th />

      </tr>
    </thead>
  );
};

const Th = (props) => {
  return (
    <th className="th-container">
      <p className="th-container-p">{props.icon}</p>
      {
        props.is_img=== true &&
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
      return setData(() => result.data);
    })();
  }, [props.id_service]);
  return (
    <tbody className="tbody-container">
      {data &&
        data?.map((item, key) => (
          <>
            <Tr
              p={props?.price}
              is_new={true}
              promotion={props.promotion}
              balance={props.balance}
              key={key}
              {...item}
            />
          </>
          
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
  }, [props.is_new, array_body.title, props?.menu]);
  return (
    <tr className="tbody-container-tr">
      {/* 
       */}
      {!props.is_new === true && (
        <>
          <Td icon={array_body.icon} text={array_body.title} />
          <Td text={array_body.pop3} />
          <Td text={array_body.live} />
          <Td
            icon={array_body.nation}
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
              button={parseInt(amount) <= 0 ? "Đã hết" : "Mua"}
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
            <>
              <Td key={key} text={item} />
               
            </>
            
          ))}
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
              button={parseInt(amount) <= 0 ? "Đã hết" : "Mua"}
              price={parseInt(props?.p)}
              name={props?.menu?.[0]}
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
  const { color_code }= useContext(SocketContext)
  return (
    <td className="td-container">
      {props.icon && (
        <p className="td-container-p">
          <img src={props.icon} alt="Icon" className="td-container-img" />
        </p>
      )}
      {props.text && <span className="td-container-span">{props.text}</span>}
      {props.button && (
        <div className="td-container-button" style={{background: parseInt(props.amount) <= 0 ?"#555" : color_code, cursor: parseInt(props.amount) <= 0 ?"not-allowed" : "pointer", display: "flex", justifyContent: 'center', alignItems: "center", position: "relative", width: "100%", height: "100%"}}>
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
            />
          )}
          </WrapPopupPurchase>
        </div>
      )}
    </td>
  );
};

const WrapPopupPurchase= ({children, setAmount})=> {
  const { socketState } = useContext(SocketContext);
  useEffect(() => {
    socketState.on("update_amount_from_server", (data) => {
    setAmount(() => data.amount);
    });
  }, []);
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
  const { setCallAgain, socketState } = useContext(SocketContext);
  const [disabled, setDisabled] = useState(() => false);
 
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
        amountX: parseInt(props.amountX)
      },
    });
    const result = await res.data;
    if (result.purchase === true) {
      updateAmount();
      setOrder(() => result);
      setOpen(() => true);
      setMessage(() => "Mua tài khoản thành công");
      setSuccessBox(() => undefined);
      setCallAgain((prev) => !prev);
      setLoading(() => true);
      setTimeout(() => {
        setLoading(() => false);
        setMessage(() => "");
        setOpen(() => false);
        setSuccessBox(() => true);
      }, 1500);
    } else {
      setOpen(() => true);
      setMessage(() => "Mua tài khoản thất bại");
      setTimeout(() => {
        setMessage(() => "");
        setOpen(() => false);
      }, 1500);
    }
    return result;
  };
  const toTextFile = async () => {
    const element = document.createElement("a");
    const file = new Blob(
      
      order?.data?.map(item=> `${item.account.replace(",", "")}|${item.password}`.replace(",", "")),
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
    socketState.emit("update_amount", { amount: props.amount, number: parseInt(amount)});
  };
  
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
                    <Title title={"Sản phẩm: Hotmail NEW"} />
                    <DetailPurchase
                    left={"Số lượng"}
                    value={amount}
                    onChange={setAmount}
                    readOnly={false}
                    />
                    <DetailPurchase left={"Giá"} value={props.price} readOnly={true} />
                    <DetailPurchase
                    left={"Số tiền"}
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
                        Mua
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
                {successBox === true && (
                <div className="wrapper-purchase-popup" style={{ width: "100%" }}>
                  <div
                  style={{
                    textAlign: "center",
                    color: "#2e89ff",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                  >
                  Bạn đã mua thành công
                  </div>
                  <br />
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  Mã hóa đơn: {order.code_bill}
                  </div>
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  Số lượng: {amount}
                  </div>
                  <div
                  style={{ textAlign: "center", color: "#000", margin: "8px 0" }}
                  >
                  Số tiền: {parseInt(amount) * parseInt(props.price)}
                  </div>
                  <br />
                  <div style={{ color: "#000", margin: "8px 0", maxHeight: 200, overflow: "auto"}}>
                    {
                      order?.data?.map((item, key)=> <div className={"list-account-password"} key={key}>{item.account}|{item.password}</div>)
                    }
                  </div>
                  <br />
                  <div style={{ width: "100%", direction: "rtl" }}>
                  <Button onClick={() => toTextFile()} variant={"contained"}>
                      Tải file text
                  </Button>
                  </div>
                </div>
                )}
            </>
        }
      </div>
      <Alert open={open} duration={2500} message={message} />
    </div>
  );
};

const Title = (props) => {
  return <div className="title-purchase-popup">{props.title}</div>;
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
