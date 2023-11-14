import React, { useState } from 'react';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Input, Button } from 'antd';
import { Box, useTheme } from "@mui/material";
import { Row, Col, Rate, Tag, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";

const { Title, Text } = Typography;

const ProductB = ({ canEdit }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { productID } = useParams();

  const [product, setProduct] = useState({
    id: 1,
    name: 'Cây cam Vinh',
    image: '../public/Caycam.jpg',
    price: 10.99,
    rate: 4.5,
    description: 'Cam Vinh là đặc sản nổi tiếng của những người con xứ Nghệ. Giống cam đặc sản này có giá trị cao, được thị trường trong và ngoài nước ưa chuộng. Hiện nay, Cam Vinh không chỉ trồng được ở Nghệ An mà nếu thực hiện đúng kỹ thuật trồng cam Vinh, bà con ở các tỉnh phía Bắc và khu vực lân cận cũng có thể mở rộng diện tích trồng trọt, đem lại hiệu quả kinh tế cao.',
    tags: ['tag1', 'tag2', 'tag3'],
    type: 'Loại cây',
    status: 'Còn hàng',
    climateDescription: 'Mô tả khí hậu',
    season: 'Mùa vụ',
    yield: 'Năng suất',
    duration: 'Thời vụ',
    count: 50
  });

  const handleAddToCart = () => {
    // Ở đây, bạn có thể thực hiện các hành động cần thiết khi thêm sản phẩm vào giỏ hàng
  };

  return (
    <Box m="20px">
      <Header title="Product Detail" subtitle="Update order status" />
      <Box>
        <Content style={{ margin: '16px', color: 'white' }}>
          <Row gutter={[16, 16]}>
            <Col span={9} style={{ padding: '25px' }}>
              <div className="image">
                <img src={product.image} alt={product.name} style={{ borderRadius: '10px' }} />
              </div>
            </Col>
            <Col span={12} style={{ padding: '80px' }}>
              <Title level={3} style={{ display: 'inline-block' }}>
                <div style={{ border: 'none', fontSize: '24px', fontWeight: 'bold', outline: 'none', background: 'none', width: '100%' }}>
                  {product.name}
                </div>
              </Title>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                  <Text strong>Giá bán:</Text>
                </Title>
                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                  <div style={{ border: 'none', fontSize: '1em', outline: 'none', background: 'none', flex: '1' }}>
                    {product.price}
                  </div>
                </div>
              </div>

              <br />

              <Text strong>Đánh giá: </Text>
              <Rate disabled defaultValue={product.rate} />
              <br />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                  <Text strong>Loại cây:</Text>
                </Title>
                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                  <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                    {product.type}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                  <Text strong>Số lượng trong kho:</Text>
                </Title>
                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                  <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                    {product.count}
                  </div>
                </div>
              </div>

              <br />

              <Text strong>Tình trạng: </Text>
              <Text>Còn hàng</Text>
              <br />

              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <Tag key={index} style={{ marginRight: '10px' }}>
                    {tag}
                  </Tag>
                ))}
              </div>

              <Button type="primary" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>

            </Col>
            <Col span={21} style={{ padding: '25px' }}>
              <div className="product-description">
                <Title level={4}>Mô tả sản phẩm {productID} </Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.description}
                </div>
              </div>

              <div className="climate-description">
                <Title level={4}>Khí hậu </Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.climateDescription}
                </div>
              </div>

              <div className="yield">
                <Title level={4}>Năng suất</Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.yield}
                </div>
              </div>

              <div className="season">
                <Title level={4}>Mùa vụ</Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.season}
                </div>
              </div>

              <div className="duration">
                <Title level={4}>Thời vụ</Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.duration}
                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Box>
    </Box>
  );
};

export default ProductB;
