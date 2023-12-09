import {
    Box,
    Typography,
    useTheme,
    Grid,
    TextField,
  } from "@mui/material";
import { tokens } from "../../theme";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { Tabs } from 'antd'; 
import React from "react";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import Purchase_All from "./all";
import Purchase_Processing from "./processing";
import Purchase_Transporting from "./transporting";
import Purchase_Completed from "./completed";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/TopBar';
import Sidebar from '../global/SideBar';
import { useState } from 'react';

import { Button, Input, Select, Space } from 'antd';

const { Search } = Input;

const Purchase = () => {
    // const css = `
    // .navLink: {
    //   color: black;
    // }
    // `;
    const onChange = (key) => {
      console.log(key);
    };
    const items = [
      {
        key: '1',
        label: "Tất cả",
        children: <Purchase_All/>,
      },
      {
        key: '2',
        label: "Chờ xác nhận",
        children: <Purchase_Processing/>,
      },
      {
        key: '3',
        label: "Đang vận chuyển",
        children: <Purchase_Transporting/>,
      },
      {
        key: '4',
        label: "Đã giao",
        children: <Purchase_Completed/>,
      },
    ];
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Box m="20px">
                <Header title={"Đơn hàng của tôi"} subtitle={""}/>
                <div style={{ display: 'block', width: 1000, padding: 30 }}>
                  {/* <style>
                      {css}
                  </style>  */}
                  <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
                </div> 
              </Box>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
};
  
export default Purchase;
