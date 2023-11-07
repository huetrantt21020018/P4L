import React, { useState } from 'react';
import './index.css';
import {
  UnorderedListOutlined,
  UserOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Card, Rate, Button, Tag, Row, Col } from 'antd';
import { Input, Select, Typography } from 'antd';

import {
  useNavigate,
  useParams
} from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

const items = [
  {
    key: '1',
    label: 'P4L',
    icon: <HomeOutlined />
  },
  {
    key: 'sub1',
    label: 'User',
    icon: <UserOutlined />,
    children: [
      {
        key: '3',
        label: 'Stock Manager'
      },
      {
        key: '4',
        label: 'Thay đổi thông tin'
      }
    ]
  },
  {
    key: '2',
    label: 'Sản phẩm',
    icon: <UnorderedListOutlined />
  }
];

const product = {
  id: 1,
  name: 'Cây cam Vinh',
  image: '../public/Caycam.jpg',
  price: 10.99,
  rate: 4.5,
  description: '  Cam Vinh là đặc sản nổi tiếng của những người con xứ Nghệ. Giống cam đặc sản này có giá trị cao, được thị trường trong và ngoài nước ưa chuộng. Hiện nay, Cam Vinh không chỉ trồng được ở Nghệ An mà nếu thực hiện đúng kỹ thuật trồng cam Vinh, bà con ở các tỉnh phía Bắc và khu vực lân cận cũng có thể mở rộng diện tích trồng trọt, đem lại hiệu quả kinh tế cao.',
  tags: ['tag1', 'tag2', 'tag3']
};

const QlkCtsp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {productID} = useParams()

  const handleSearch = (value) => {
    // Implement your search logic here...
    console.log('Search:', value);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={300}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div className="header-container">
            <div className="logo" />
            <div className="search-bar-container">
              <Search
                placeholder="Tìm kiếm..."
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={handleSearch}
                className="search-bar"
              />
            </div>
            <Button type="link" icon={<ShoppingCartOutlined />} className="cart-button" />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>San pham</Breadcrumb.Item>
            <Breadcrumb.Item>{productID}</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{padding: '30px', backgroundColor: 'white'}}>
          <Row gutter={[16, 16]}>
            <Col span={9} style={{ padding: '25px' }}>
              <div className="image">
                <img src={product.image} alt={product.name} style={{ borderRadius: '10px' }} />
              </div>
            </Col>
            <Col span={12} style={{ padding: '80px' }}>
              <Title level={3}>{product.name}</Title>
              <Text strong>Giá bán: </Text>
              <Text>${product.price}</Text>
              <br />
              <Text strong>Đánh giá: </Text>
              <Rate disabled defaultValue={product.rate} />
              <br />
              <Text strong>Vận chuyển: </Text>
              <Text>Miễn phí</Text>
              <br />
              <Text strong>Tình trạng: </Text>
              <Text>Còn hàng</Text>
              <br />
              <div className="product-tags">
                {product.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Col>
          </Row>
            <Col span={21} style={{ padding: '25px'}}>
                <div className="product-description">
                  <Title level={4}>Mô tả sản phẩm {productID} </Title>
                  <Text>{product.description}</Text>
                </div>
              </Col>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default QlkCtsp;