import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/hotmail`,
        method: "get",
        responseType: "json",
      });
      const result = await res.data;
      return setData1(() => result.data);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await axios({
        url: `${SERVER_URL}/edit/get/gmail`,
        method: "get",
        responseType: "json",
      });
      const result2 = await res.data;
      return setData2(() => result2.data);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
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
      </div>
    </div>
  );
};

export default Home;
