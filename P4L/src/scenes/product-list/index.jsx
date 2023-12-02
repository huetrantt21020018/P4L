import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import { getProductList } from '../../api/api';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const { Content, Sider } = Layout;
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';

import './index.css';

const { Option } = Select;

const ProductList = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const theme2 = useTheme();
  const colors = tokens(theme2.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "New Product",
    price: 0,
    count: 0,
    status: "stock",
  });

  const handleCreateNewProduct = () => {
    // Tạo một bản sao của danh sách hiện tại và thêm sản phẩm mới vào đó
    const updatedData = [...data, { ...newProduct, key: data.length + 1 }];
    setData(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productList = await getProductList();
      
      if (productList) {
        setData(productList.data);
      } else {
        console.log('Lỗi khi lấy danh sách sản phẩm');
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const handleRowHover = (rowIndex) => {
    setHoveredRow(rowIndex);
  };

  const handleRowClick = (itemID) => {
    console.log("navigate to detail", itemID);
    navigate(`/detail/${itemID}`);
  };

  const statusOptions = [
    { value: 0, label: 'Ngừng bán' },
    { value: 1, label: 'Còn hàng' },
    { value: 2, label: 'Hết hàng' },
  ];

  const columns = [
    {
      field: 'id',
      flex: 1,
      headerName: 'Mã sản phẩm',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'name',
      flex: 1,
      headerName: 'Tên sản phẩm',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      flex: 1,
      field: 'product_type',
      headerName: 'Loại cây',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
      valueGetter: (params) => params.row.product_type ? params.row.product_type.name : '',
    },
    { 
      flex: 1,
      field: 'price',
      headerName: 'Giá thành',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      flex: 1,
      field: 'stock',
      headerName: 'Số lượng',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Trạng thái',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
      renderCell: (params) => {
        const { value } = params;
        const statusOption = statusOptions.find((option) => option.value === value);
        const statusLabel = statusOption ? statusOption.label : 'Unknown';
        return <div className="table-cell">{statusLabel}</div>;
      },
    },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={"stock-manager"} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Header title="Danh sách sản phẩm" />
              <Box >
                <Content style={{ margin: '16px' }}>
                  <div style={{ backgroundColor: colors.primary[400] }}>
                    <div style={{ color: colors.blueAccent[700], fontSize: '18px' }}>
                      <DataGrid
                        rows={data}
                        columns={columns}
                        autoHeight
                        rowStyle={{ backgroundColor: colors.primary[400] }}
                        components={{
                          footer: () => null,
                        }}
                        rowClassName={(params) =>
                          params.rowIndex === hoveredRow ? 'hovered-row' : ''
                        }
                        onRowHover={(params) => handleRowHover(params.rowIndex)}
                        onRowClick={(params) => handleRowClick(params.row.id)}
                      />
                    </div>
                  </div>
                </Content>
              </Box>
              <Button 
                type="primary" 
                onClick={handleCreateNewProduct} 
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
                  margin: '20px',
                }} >
                  Tạo SP mới
              </Button>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ProductList;
