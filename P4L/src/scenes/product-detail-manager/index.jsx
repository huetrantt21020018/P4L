import React, { useState } from 'react';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Input, Button } from 'antd';
import { Box, useTheme } from "@mui/material";
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";
const { Option } = Select;
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
import {Row, Col, Rate, Tag, Typography} from 'antd'

const { Title, Text } = Typography;

const Product = ({canEdit}) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const { productID } = useParams()

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

      const handleInputChange = (e, field) => {
        const value = e.target.value;
        setProduct(prevProduct => ({
            ...prevProduct,
            [field]: value
        }));
    };

    const handleAddTag = () => {
        setProduct(prevProduct => ({
          ...prevProduct,
          tags: [...prevProduct.tags, 'New Tag']
        }));
      };
    
      const handleDeleteTag = (index) => {
        setProduct(prevProduct => {
          const newTags = [...prevProduct.tags];
          newTags.splice(index, 1);
          return {
            ...prevProduct,
            tags: newTags
          };
        });
      };
    
      const handleTagInputChange = (e, index) => {
        const { value } = e.target;
        setProduct(prevProduct => {
          const newTags = [...prevProduct.tags];
          newTags[index] = value;
          return {
            ...prevProduct,
            tags: newTags
          };
        });
      };
    
      const handleUpdate = () => {
        // Send the updated product data to the database
        // Here, you can make an API call or perform any necessary actions
        console.log('Updated product:', product);
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
                                <input
                                    value={product.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    style={{
                                        border: 'none',
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        outline: 'none',
                                        background: 'none',
                                        width: '100%',
                                    }}
                                />
                            </Title>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                                    <Text strong>Giá bán:</Text>
                                </Title>
                                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                                    <input
                                        value={product.price}
                                        onChange={(e) => handleInputChange(e, 'price')}
                                        style={{
                                            border: 'none',
                                            fontSize: '1em',
                                            outline: 'none',
                                            background: 'none',
                                            flex: '1',
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <Text strong>Đánh giá: </Text>
                            <Rate disabled defaultValue={product.rate} />
                            <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                                    <Text strong>Loại cây:</Text>
                                </Title>
                                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                                    <input
                                        value={product.type}
                                        onChange={(e) => handleInputChange(e, 'type')}
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            background: 'none',
                                            flex: '1',
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                                    <Text strong>Số lượng trong kho:</Text>
                                </Title>
                                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                                    <input
                                        value={product.count}
                                        onChange={(e) => handleInputChange(e, 'count')}
                                        style={{
                                            border: 'none',
                                            outline: 'none',
                                            background: 'none',
                                            flex: '1',
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <Text strong>Tình trạng: </Text>
                            <Text>Còn hàng</Text>
                            <br />
                            <div className="product-tags">
                            {product.tags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => handleDeleteTag(index)}
                                    style={{ marginRight: '10px' }}
                                >
                                    <Input
                                    value={tag}
                                    onChange={(e) => handleTagInputChange(e, index)}
                                    size="small"
                                    style={{ width: '80px' }}
                                    />
                                </Tag>
                                ))}
                                <Button type="primary" onClick={handleAddTag}>Add Tag</Button>
                            </div>
                        </Col>
                        <Col span={21} style={{ padding: '25px' }}>
                            <div className="product-description">
                                <Title level={4}>Mô tả sản phẩm {productID} </Title>
                                <Text>{product.description}</Text>
                            </div>
                            <div className="climate-description">
                                <Title level={4}>Khí hậu </Title>
                                <input
                                    value={product.climateDescription}
                                    onChange={(e) => handleInputChange(e, 'climateDescription')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none',                                            flex: '1',
                                    }}
                                />
                            </div>
                            <div className="yield">
                                <Title level={4}>Năng suất</Title>
                                <input
                                    value={product.yield}
                                    onChange={(e) => handleInputChange(e, 'yield')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none',                                            flex: '1',
                                    }}
                                />
                            </div>
                            <div className="season">
                                <Title level={4}>Mùa vụ</Title>
                                <input
                                    value={product.season}
                                    onChange={(e) => handleInputChange(e, 'season')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none',                                            flex: '1',
                                    }}
                                />
                            </div>
                            <div className="duration">
                                <Title level={4}>Thời vụ</Title>
                                <input
                                    value={product.duration}
                                    onChange={(e) => handleInputChange(e, 'duration')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none',                                            flex: '1',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={handleUpdate}>Update</Button>
                </Content>
            </Box>
        </Box>
    )
};

export default Product;