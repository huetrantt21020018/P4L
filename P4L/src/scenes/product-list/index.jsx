import React, { useState } from 'react';
import {
  UnorderedListOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Table } from 'antd';
import { Box, Typography, useTheme } from "@mui/material";
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";
const { Option } = Select;


const ProductList = () => {

  const [collapsed, setCollapsed] = useState(false);

  const [data, setData] = useState([
    {
      key: '1',
      ID: 'a01',
      image: '../public/Caytao.jpg',
      name: 'Cây táo ta',
      price: '100.000',
      rate: 5,
    },
    {
      key: '2',
      ID: 'b01',
      image: '../public/Caycam.jpg',
      name: 'Cây cam Vinh',
      price: '90.000',
      rate: 3,
    },
    {
      key: '3',
      ID: 'a01',
      image: '../public/Caytao.jpg',
      name: 'Cây táo ta',
      price: '100.000',
      rate: 5,
    },
    {
      key: '4',
      ID: 'b01',
      image: '../public/Caycam.jpg',
      name: 'Cây cam Vinh',
      price: '90.000',
      rate: 3,
    },
  ]);

  const handleStatusChange = (value, record) => {
    const updatedData = data.map((item) => {
      if (item.key === record.key) {
        return { ...item, status: value };
      }
      return item;
    });

    setData(updatedData);
  };

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleItemClick = (itemID) => {
    navigate(`/detail/${itemID}`); // Navigate to the "/detail" page with the item ID
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Chi tiết',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Tổng',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select defaultValue={text} onChange={(value) => handleStatusChange(value, record)}>
          <Option value="preparing">Đang chuẩn bị</Option>         
          <Option value="delivering">Đang giao</Option>         
          <Option value="delivered">Đã giao</Option>         
          <Option value="cancel">Hủy đơn</Option>       
        </Select>
      ),
    },
  ];

  console.log("inside product-list page");

  return (
    <Box m="20px">
      <Header title="Order List" subtitle="Update order status" />
      <Box>
        <Content style={{ margin: '16px', color: 'white' }}>
          <Table dataSource={data} columns={columns} />
        </Content>
      </Box>
    </Box>
  );
};

export default ProductList;