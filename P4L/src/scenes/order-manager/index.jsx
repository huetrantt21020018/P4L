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

function getItem(
  label,
  key,
  icon,
  children,
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('P4L', '1', <HomeOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Order Manager', '3'),
    getItem('Thay đổi thông tin', '4'),
  ]),
  getItem('Đơn hàng', '2', <UnorderedListOutlined/>),
];

const OrderManager = () => {

  const [collapsed, setCollapsed] = useState(false);

  const [data, setData] = useState([
    {
      key: '1',
      ID: 'abc12',
      name: 'Nguyễn Văn A',
      detail: '01 cây táo',
      address: '144 Xuân Thủy, Cầu Giấy',
      payment: 'Tiền mặt',
      sum: '100.000',
      status: 'Đang chuẩn bị',
    },
    {
      key: '2',
      ID: 'abc12',
      name: 'Trần Trọng B',
      detail: '05 gói hạt giống rau cải',
      address: '1 Phạm Văn Đồng, Cầu Giấy',
      payment: 'Momo',
      sum: '50.000',
      status: 'Đang giao',
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

export default OrderManager
;