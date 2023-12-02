import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import { getOrderListAll, putOrderById } from '../../api/api';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const { Content, Sider } = Layout;
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import './index.css';

const { Option } = Select;

const OrderManager = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const statusOptions = [
    { value: 0, label: 'Chờ xác nhận' },
    { value: 1, label: 'Đang chuẩn bị' },
    { value: 2, label: 'Đang giao' },
    { value: 3, label: 'Đã giao' },
  ];

  const getStatusLabel = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.label : '';
  };

  const getStatusCode = (label) => {
    const option = statusOptions.find((opt) => opt.label === label);
    return option ? option.value : '';
  };

  useEffect(() => {
    const fetchData = async () => {
      const getData = await getOrderListAll();
      
      if (getData) {
        setData(getData.data);
      } else {
        console.log('Lỗi khi lấy danh sách đơn hàng');
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const handleStatusChange = async (value, record) => {
    try {
      const updatedData = data.map((item) => {
        if (item.id === record.id) {
          return { ...item, status: value };
        }
        return item;
      });
      setData(updatedData);

      // Use await within an async function
      const updatedOrder = await putOrderById(record.id, value);

      if (!updatedOrder) {
        console.error('Error updating status in the database');
      }
    } catch (error) {
      console.error('Error handling status change', error);
    }
  };

  const columns = [
    {
      field: 'id',
      flex: 1,
      headerName: 'Mã đơn hàng',
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'userAddressId',
      headerName: 'User Address',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'userPaymentMethodId',
      headerName: 'Payment Method ',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
      renderCell: (params) => (
        <Select
          defaultValue={getStatusLabel(params.value)}
          onChange={(value) => handleStatusChange(getStatusCode(value), params.row)}
          style={{ width: '150px', fontSize: '18px' }}
        >
          {statusOptions.map((option) => (
            <Option key={option.value} value={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>
      ),
    },    
  ];

  return (
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
              />
            </div>
          </div>
        </Content>
      </Box>
    </Box>
  );
};

export default OrderManager;
