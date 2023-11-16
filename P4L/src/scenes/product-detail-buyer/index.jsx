import React, { useState, useEffect } from 'react';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Input, Button } from 'antd';
import { Box, useTheme } from "@mui/material";
import { Row, Col, Rate, Tag, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";
import { getProductById } from '../../api/api';

const { Title, Text } = Typography;

const ProductB = ({ canEdit }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { productID } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductById(productID);
        setProduct(data.data);
        console.log(data.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu', error);
      }
    };

    fetchData();
  }, [productID]); // Thêm dependency là productId để useEffect chạy lại khi productId thay đổi

  useEffect(() => {
    console.log("Updated product:", product);
  }, [product]);
  

  const handleAddToCart = () => {
    // Ở đây, bạn có thể thực hiện các hành động cần thiết khi thêm sản phẩm vào giỏ hàng
  };


  if (!product) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
                    {product.product_type.name}
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
              <Text>{product.status}</Text>
              <br />

              <div className="product-tags">
                {product.productTags.map((tag) => (
                  <Tag key={tag.id} style={{ marginRight: '10px' }}>
                    {tag.name}
                  </Tag>
                ))}
              </div>

              <br/>

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
                  {product.growingSeason}
                </div>
              </div>

              <div className="duration">
                <Title level={4}>Thời vụ</Title>
                <div style={{ border: 'none', outline: 'none', background: 'none', flex: '1' }}>
                  {product.growingSeason}
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