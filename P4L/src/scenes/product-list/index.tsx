import { useState, useEffect } from 'react';
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
import { ProductApi } from '../../api/api2/product';
import type { Product } from '../../api/types';
import {useLoginState} from "../../hooks/loginState";
import {TreeTypeIcon} from "../../icons";

const { Option } = Select;

function ProductList2() {
  let [productList, setProductList] = useState<Product[]>([]);
  let [loading, setLoading] = useState(false);
  let [_, __, token] = useLoginState();

  useEffect(() => {
    setLoading(true);
    let api = new ProductApi(token);
    api.list()
      .then(rs => {
        if (rs.success) {
          setProductList(rs.data);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [token])

  let formatter = new Intl.NumberFormat('vi-VN');
  let products = productList
    .map(product => {
      let thumbnail = product.productThumbnails?.[0];
      let type = product.productType?.name;
      return (
        <div key={product.id} className={"h-full relative"}>
          <div className={"absolute top-3"}>
            <div className={"text-sm -mb-7 z-10 px-2 py-0.5 bg-[#E8EFF0] w-fit flex flex-row gap-1"}>
              <TreeTypeIcon />
              <div>
                {type}
              </div>
            </div>
          </div>
          <div className={"flex flex-col h-full font-opensans"}>
            <img className={"h-full object-cover"} src={thumbnail?.url} alt={product.name} />
            <div className={"text-sm"}>
              {product.name}
            </div>
            <div>
              {formatter.format(product.price)} VND
            </div>
          </div>
          <div>

          </div>
        </div>
      )
    })

  return (
    <>
      <div className={"flex flex-row gap-2"}>
        <div className={"product-filter"}>

        </div>
        <div className={"product-list"}>
          <div className={"grid grid-cols-5 gap-6 p-6"}>
            {products}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList2;
