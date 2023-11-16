import React, { useState, useEffect } from 'react';
import { Menu, Breadcrumb, Layout, Select } from 'antd';
import { Input, Button } from 'antd';
import { Box, useTheme } from "@mui/material";
const { Content, Footer, Sider } = Layout;
import Header from "../../components/Header";
const { Option } = Select;
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
import { Row, Col, Rate, Tag, Typography } from 'antd'
import { getProductById, putProductByID } from '../../api/api';


const { Title, Text } = Typography;

const Product = ({ canEdit }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const { productID } = useParams()

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


    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setProduct(prevProduct => ({
            ...prevProduct,
            [field]: value
        }));
    };


    const handleAddTag = () => {
        const newTag = {
            id: Math.random(), // Tạm thời sử dụng Math.random() làm id, bạn có thể thay đổi theo nhu cầu thực tế
            status: 1, // Giá trị mặc định cho status, bạn có thể thay đổi theo nhu cầu thực tế
            name: 'New Tag'
        };

        setProduct(prevProduct => ({
            ...prevProduct,
            productTags: [...prevProduct.productTags, newTag]
        }));
    };

    const handleDeleteTag = (tagId) => {
        setProduct(prevProduct => {
            const newTags = prevProduct.productTags.filter(tag => tag.id !== tagId);
            return {
                ...prevProduct,
                productTags: newTags
            };
        });
    };


    const handleTagInputChange = (e, tagId) => {
        const { value } = e.target;
        setProduct(prevProduct => {
            const newTags = prevProduct.productTags.map(tag =>
                tag.id === tagId ? { ...tag, name: value } : tag
            );
            return {
                ...prevProduct,
                productTags: newTags
            };
        });
    };

    const handleUpdate = async () => {
        try {
            // Gọi hàm postProductByID để gửi dữ liệu đã cập nhật lên server
            await putProductByID(productID, product);

            // Log thông báo hoặc thực hiện các hành động cần thiết khi cập nhật thành công
            console.log('Product updated successfully!');
        } catch (error) {
            // Xử lý lỗi khi gửi request
            console.error('Error updating product:', error);
        }
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
                            <br />
                            <Text strong>Đánh giá: </Text>
                            <Rate disabled defaultValue={product.rate} />
                            <br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Title level={3} style={{ marginRight: '10px', flex: '0 0 auto' }}>
                                    <Text strong>Loại cây:</Text>
                                </Title>
                                <div style={{ flex: 'auto', display: 'flex', marginTop: '15px' }}>
                                    <input
                                        value={product.product_type.name}
                                        onChange={(e) => handleInputChange(e, 'product_type.name')}
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
                            <br />
                            <Text strong>Tình trạng: </Text>
                            <Text>Còn hàng</Text>
                            <br />
                            <div className="product-tags">
                                {product.productTags.map((tag) => (
                                    <Tag
                                        key={tag.id}
                                        closable
                                        onClose={() => handleDeleteTag(tag.id)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        <Input
                                            value={tag.name}
                                            onChange={(e) => handleTagInputChange(e, tag.id)}
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
                                <input
                                    value={product.description}
                                    onChange={(e) => handleInputChange(e, 'description')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none', flex: '1',
                                    }}
                                />
                            </div>
                            <div className="climate-description">
                                <Title level={4}>Khí hậu </Title>
                                <input
                                    value={product.climateDescription}
                                    onChange={(e) => handleInputChange(e, 'climateDescription')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none', flex: '1',
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
                                        background: 'none', flex: '1',
                                    }}
                                />
                            </div>
                            <div className="season">
                                <Title level={4}>Mùa vụ</Title>
                                <input
                                    value={product.growingSeason}
                                    onChange={(e) => handleInputChange(e, 'growingSeason')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none', flex: '1',
                                    }}
                                />
                            </div>
                            <div className="growingSeason">
                                <Title level={4}>Thời vụ</Title>
                                <input
                                    value={product.duration}
                                    onChange={(e) => handleInputChange(e, 'growingSeason')}
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        background: 'none', flex: '1',
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