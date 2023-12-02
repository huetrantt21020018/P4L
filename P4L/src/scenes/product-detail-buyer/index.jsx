import React, { useState, useEffect } from 'react';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Input, Button } from 'antd';
import { Box, useTheme } from "@mui/material";
import { Row, Col, Rate, Tag, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";
import { getProductById, postNewCart } from '../../api/api';
const { Title, Text } = Typography;
import { tokens } from "../../theme";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';

const ProductB = ({ canEdit }) => {
  const theme2 = useTheme();
  const colors = tokens(theme2.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
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
  

  const handleAddToCart = async () => {
    console.log("in handle");
    try {
      /* Check if access token exists
      if (!accessToken) {
        console.error('Error:', 'Access token does not exist');
        return;
      }*/
  
      console.log("before call API");

      // Call the API to create a new cart
      const createdCart = await postNewCart("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjkiLCJleHAiOjE3MDE0MTgyNjQsImlzcyI6Imlzc3VlciIsImF1ZCI6ImF1ZGllbmNlIn0.Kv9jrBmjrkVilgofaepI5UOUQHBbJbRz-cbn6k8iT5s")
  
      if (createdCart) {
        alert('Sản phẩm đã được thêm vào giỏ hàng');
        console.log('Product added to cart:', createdCart);
        // Perform necessary actions after adding the product to the cart
        // For example, update state, display notifications, etc.
        
      } else {
        console.error('Error:', 'Error adding product to cart 1');
      }
    } catch (error) {
      console.error('Error:', 'Error adding product to cart 2');
    }
  };


  if (!product) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={"stock-manager"} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Header title={product.name} />
              <Box>
                <Content style={{ margin: '16px', color: 'white' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={9} style={{ padding: '25px' }}>
                      <div className="image">
                        <img src={product.image} alt={product.name} style={{ borderRadius: '10px' }} />
                      </div>
                    </Col>
                    <Col span={12} style={{ padding: '80px' }}>
                    
                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Giá bán: </strong>{product.price} đồng </pre>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Đánh giá: </strong></pre>
                        <Rate disabled defaultValue={product.rate} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Loại cây: </strong></pre>
                        <div style={{ border: 'none', outline: 'none', background: 'none'}}>
                          {product.product_type ? product.product_type.name : 'Không có loại cây'}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Tình trạng: </strong>{product.status}</pre>
                      </div>

                      <div className="product-tags" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: '10px' }}>
                        {product.productTags.map((tag) => (
                          <Tag key={tag.id} style={{ backgroundColor: '#f2f2f2', color: '#333', padding: '5px 10px', borderRadius: '5px', marginRight: '10px', marginBottom: '10px', fontSize: '14px' }}>
                            {tag.name}
                          </Tag>
                        ))}
                      </div>

                      <br/>

                      <Button
                        type="primary"
                        onClick={handleAddToCart}
                        style={{
                          backgroundColor: '#1890ff',
                          borderColor: '#1890ff',
                          color: '#fff',
                          borderRadius: '10px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>

                    </Col>
                    <Col span={21} style={{ padding: '25px' }}>
                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Mô tả sản phẩm </strong>{productID} </pre>
                        {product.description}
                      </div>

                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Khí hậu </strong> </pre>
                        {product.climateDescription}
                      </div>

                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Năng suất </strong> </pre>
                        {product.yield}
                      </div>

                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Mùa vụ </strong> </pre>
                        {product.growingSeason}
                      </div>

                      <div style={{display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                        <pre><strong>Thời vụ </strong> </pre>
                        {product.growingDuration}
                      </div>
                  
                    </Col>
                  </Row>
                </Content>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ProductB;