import React, { Fragment, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import HeaderHome from "./HeaderHome/HeaderHome";
import "./Home.sass";
import ListProduct from "./ListProduct/ListProduct";
import ToolCheck from "./ToolCheck/ToolCheck";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PublicIcon from "@mui/icons-material/Public";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { SERVER_URL } from "../../config/config";

const Home = (props) => {
  const [data1, setData1] = useState(() => []);
  const [data2, setData2] = useState(() => []);
  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/hotmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData1(() => result.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/gmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData2(() => result.data);
    })();
  }, []);

  return (
    <div className="wrapper-home-container">
      <Banner {...props} />
      <div className={"home-container"}>
        <ToolCheck />
        <HeaderHome {...props} />
        <ListProduct
          balance={props.balance}
          promotion={props.promotion}
          array_header={[
            {
              text: "Hotmail + Outlook (Để dễ mở khóa Hotmail Mọi người nên Download full info mail)",
              icon: false,
            },
            { text: "POP3", icon: <CheckBoxIcon /> },
            { text: "Live", icon: <HourglassBottomIcon /> },
            { text: "Quốc gia", icon: <PublicIcon /> },
            { text: "Giá", icon: <SellIcon /> },
            { text: "Số lượng", icon: <ShoppingCartIcon /> },
            { text: "" },
          ]}
          arr_product={data1}
        />
        <br />
        <ListProduct
          balance={props.balance}
          promotion={props.promotion}
          
          array_header={[
            { text: "Gmail", icon: false },
            { text: "POP3", icon: <CheckBoxIcon /> },
            { text: "Live", icon: <HourglassBottomIcon /> },
            { text: "Quốc gia", icon: <PublicIcon /> },
            { text: "Giá", icon: <SellIcon /> },
            { text: "Số lượng", icon: <ShoppingCartIcon /> },
            { text: "" },
          ]}
          arr_product={data2}
        />
        <br />
        <WrapX 
          balance={props.balance}
          promotion={props.promotion}
           />
      </div>
    </div>
  );
};

export default Home;


const WrapX= (props)=> {
  const [data1, setData1]= useState(()=> [])
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: `${SERVER_URL}/get/c/service`,
        method: "get",
        responseType: "json",
      })
      const result= await res.data
      return setData1(()=> result.data)
    })()
  }, [])
  return (
   <>
    <div style={{width: "100%"}}>
        {
          data1 && data1?.map((item, key)=> <Fragment key={key}>
            <ListProduct
            {...item}
            key={key} is_new={true}
            balance={props.balance}
            promotion={props.promotion}
            array_header={item.menu}
            />
            <br />
          </Fragment>)
        }
        
      </div>
      <br />
    </>
  )
}