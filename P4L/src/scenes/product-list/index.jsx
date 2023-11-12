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
import { useNavigate } from 'react-router-dom';
import './index.css'

const ProductList = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Rest of the code...

  const handleRowHover = (rowIndex) => {
    console.log(rowIndex);
    setHoveredRow(rowIndex);
  };

  const [data, setData] = useState([
    {
      key: '1',
      ID: 'a01',
      image: '../public/Caytao.jpg',
      name: 'Cây táo ta',
      price: '100.000',
      rate: 5,
      count: 191
    },
    {
      key: '2',
      ID: 'b01',
      image: '../public/Caycam.jpg',
      name: 'Cây cam Vinh',
      price: '90.000',
      rate: 3,
      count: 100,
    },
    {
      key: '3',
      ID: 'a01',
      image: '../public/Caytao.jpg',
      name: 'Cây táo ta',
      price: '100.000',
      rate: 5,
      count: 105,
    },
    {
      key: '4',
      ID: 'b01',
      image: '../public/Caycam.jpg',
      name: 'Cây cam Vinh',
      price: '90.000',
      rate: 3,
      count: 10,
      status: "Còn hàng"
    },
  ]);

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleRowClick = (itemID) => {
    navigate(`/detail/${itemID}`); // Navigate to the "/detail" page with the item ID
  };

  const handleStatusChange = (value, record) => {
    const updatedData = data.map((item) => {
      if (item.key === record.key) {
        return { ...item, status: value };
      }
      return item;
    });

    setData(updatedData);
  };


  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá thành',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select defaultValue={text} onChange={(value) => handleStatusChange(value, record)}>
          <Option value="stock">Còn hàng</Option>
          <Option value="outof">Hết hàng</Option>
          <Option value="stop">Ngừng bán</Option>
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
          <Table 
            dataSource={data} 
            columns={columns} 
            rowClassName={(record, index) =>
              index === hoveredRow ? 'hovered-row' : ''
            }
            onRow={(record, index) => ({
              onMouseEnter: () => handleRowHover(index),
              onMouseLeave: () => handleRowHover(null),
              onClick: () => handleRowClick(record.key),
            })}
          />
        </Content>
      </Box>
    </Box>
  );
};

export default ProductList;