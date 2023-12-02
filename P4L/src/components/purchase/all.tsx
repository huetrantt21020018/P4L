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

import { Button, Input, Select, Space } from 'antd';

const { Search } = Input;

const Purchase_All = () => {
    // const css = `
    // .navLink: {
    //   color: black;
    // }
    // `;
    return (
        <div>
          <Space.Compact style={{ width: '100%' }}>
            <Input addonBefore={<SearchOutlined />} placeholder="Tìm đơn hàng theo Tên sản phẩm" />
            <Button type="primary">Tìm đơn hàng</Button>
          </Space.Compact>
        </div> 
    );
};
  
export default Purchase_All;