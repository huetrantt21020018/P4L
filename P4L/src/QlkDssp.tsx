import React, { useState } from 'react';
import './index.css';
import {
  UnorderedListOutlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Input, Select, List, MenuProps } from 'antd';
import ProductCard from './ProductCard.jsx';
import { useNavigate } from 'react-router-dom'; 

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

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
    getItem('Stock Manager', '3'),
    getItem('Thay đổi thông tin', '4'),
  ]),
  getItem('Sản phẩm', '2', <UnorderedListOutlined/>),
];

const QlkDssp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const handleSearch = (value) => {
    // Implement your search logic here...
    console.log('Search:', value);
  };

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleItemClick = (itemID) => {
    navigate(`/detail/${itemID}`); // Navigate to the "/detail" page with the item ID
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={300}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="header-container">
            <div className="demo-logo-vertical" />
            <div className="search-bar-container">
              <Search
                placeholder="Tìm kiếm..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={handleSearch}
                className="search-bar"
              />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Stock Manager</Breadcrumb.Item>
            <Breadcrumb.Item>Danh sach san pham</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(product) => (
              <List.Item onClick={() => handleItemClick(product.ID)}> 
                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rate}
                />
              </List.Item>
            )}
          />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default QlkDssp;