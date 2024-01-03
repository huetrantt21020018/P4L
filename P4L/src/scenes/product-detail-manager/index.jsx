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
import { tokens } from "../../theme";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/TopBar';
import Sidebar from '../global/SideBar';


const { Title, Text } = Typography;

const Product = ({ canEdit }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const { productID } = useParams()
    const theme2 = useTheme();
    const colors = tokens(theme2.palette.mode);
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    const [product, setProduct] = useState(null);

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar userRole={"stock-manager"} isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Box m="20px">
                            <Box>
                                <Content style={{ margin: '16px', color: 'white' }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={9} style={{ padding: '25px' }}>
                                            <div className="image">
                                                <img src={product.image} alt={product.name} style={{ borderRadius: '10px' }} />
                                            </div>
                                        </Col>
                                        <Col span={12} style={{ padding: '80px' }}>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                <strong><pre>Tên sản phẩm: </pre></strong>
                                                <input
                                                    value={product.name}
                                                    onChange={(e) => handleInputChange(e, 'name')}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'inherit',
                                                        fontSize: '18px',
                                                    }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                <strong><pre>Giá bán: </pre></strong>
                                                <input
                                                    value={product.price}
                                                    onChange={(e) => handleInputChange(e, 'price')}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'inherit',
                                                        fontSize: '18px',
                                                        width: '90px'
                                                    }}
                                                />
                                                đồng
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                <strong><pre>Loại cây: </pre></strong>
                                                <input
                                                    value={product.product_type === null ? "" : product.product_type.name}
                                                    onChange={(e) => handleInputChange(e, 'product.product_type.name')}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'inherit',
                                                        fontSize: '18px',
                                                        width: '100px'
                                                    }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                <strong><pre>Số lượng trong kho: </pre></strong>
                                                <input
                                                    value={product.stock}
                                                    onChange={(e) => handleInputChange(e, 'stock')}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'inherit',
                                                        fontSize: '18px',
                                                    }}
                                                />
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
                                                <strong>Tình trạng:</strong>
                                                <select
                                                    value={product.stock === 0 ? 'out-of-stock' : product.status}
                                                    onChange={(e) => handleInputChange(e, 'status')}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        outline: 'none',
                                                        color: 'inherit',
                                                        fontSize: '18px',
                                                    }}
                                                >
                                                    {product.stock === 0 ? (
                                                        <option value="out-of-stock">Hết hàng</option>
                                                    ) : (
                                                        <>
                                                            <option value="in-stock">Còn hàng</option>
                                                            <option value="stop-selling">Ngừng bán</option>
                                                        </>
                                                    )}
                                                </select>
                                            </div>

                                            <div className="product-tags" style={{ gap: '15px' }}>
                                                {product.productTags.map((tag) => (
                                                    <Tag
                                                        key={tag.id}
                                                        closable
                                                        onClose={() => handleDeleteTag(tag.id)}
                                                        style={{
                                                            fontSize: '18px',
                                                            width: 'auto',
                                                            minWidth: 0,
                                                        }}
                                                    >
                                                        <Input
                                                            value={tag.name}
                                                            onChange={(e) => handleTagInputChange(e, tag.id)}
                                                            size="small"
                                                            style={{
                                                                paddingRight: '10px',
                                                                fontSize: '18px',
                                                                color: 'black',
                                                                width: 'auto',
                                                                minWidth: 0,
                                                            }}
                                                        />
                                                    </Tag>
                                                ))}
                                                <Button
                                                    type="primary"
                                                    onClick={handleAddTag}
                                                    style={{
                                                        backgroundColor: 'tránparent',
                                                        borderColor: '#1890ff',
                                                        color: '#fff',
                                                        borderRadius: '10px',
                                                        fontSize: '18px',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    Thêm tag mới
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center', fontSize: '18px' }}>
                                        <strong><pre>Mô tả sản phẩm: </pre></strong>
                                        <div style={{ flexGrow: 1 }}>
                                            <textarea
                                                value={product.description}
                                                onChange={(e) => handleInputChange(e, 'description')}
                                                onInput={autoResize}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    color: 'inherit',
                                                    fontSize: '18px',
                                                    width: '100%',
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                }}
                                            ></textarea>
                                        </div>

                                        <strong><pre>Khí hậu: </pre></strong>
                                        <div style={{ flexGrow: 1 }}>
                                            <textarea
                                                value={product.climateDescription}
                                                onChange={(e) => handleInputChange(e, 'climateDescription')}
                                                onInput={autoResize}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    color: 'inherit',
                                                    fontSize: '18px',
                                                    width: '100%',
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                }}
                                            ></textarea>
                                        </div>

                                        <strong><pre>Năng suất: </pre></strong>
                                        <div style={{ flexGrow: 1 }}>
                                            <textarea
                                                value={product.yield}
                                                onChange={(e) => handleInputChange(e, 'yield')}
                                                onInput={autoResize}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    color: 'inherit',
                                                    fontSize: '18px',
                                                    width: '100%',
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                }}
                                            ></textarea>
                                        </div>

                                        <strong><pre>Khí hậu: </pre></strong>
                                        <div style={{ flexGrow: 1 }}>
                                            <textarea
                                                value={product.growingSeason}
                                                onChange={(e) => handleInputChange(e, 'growingSeason')}
                                                onInput={autoResize}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    color: 'inherit',
                                                    fontSize: '18px',
                                                    width: '100%',
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                }}
                                            ></textarea>
                                        </div>

                                        <strong><pre>Khí hậu: </pre></strong>
                                        <div style={{ flexGrow: 1 }}>
                                            <textarea
                                                value={product.duration}
                                                onChange={(e) => handleInputChange(e, 'duration')}
                                                onInput={autoResize}
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    outline: 'none',
                                                    color: 'inherit',
                                                    fontSize: '18px',
                                                    width: '100%',
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                }}
                                            ></textarea>
                                        </div>

                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={handleUpdate}
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
                                        Cập nhật
                                    </Button>
                                </Content>
                            </Box>
                        </Box>
                    </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
};

export default Product;
