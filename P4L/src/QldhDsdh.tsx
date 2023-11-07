import React, { useState } from 'react';
import './index.css';
import {
  UnorderedListOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Table, Tag, Select } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('P4L', '1', <HomeOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Order Manager', '3'),
    getItem('Thay đổi thông tin', '4'),
  ]),
  getItem('Đơn hàng', '2', <UnorderedListOutlined/>),
];

const QldhDsdh: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    // Update the status value in the data array
    const updatedData = data.map((item) => {
      if (item.key === record.key) {
        return { ...item, status: value };
      }
      return item;
    });
  
    // Update the data array in the component state or trigger an API call to update the server-side data
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table dataSource={data} columns={columns} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default QldhDsdh;