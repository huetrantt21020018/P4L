import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import "./index.css"
import { useNavigate } from 'react-router-dom';
import { getProductList } from '../../api/api';
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';


const Home = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [filters, setFilters] = useState({
    price: null,
    type: null,
    season: null,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productList = await getProductList();
      
      if (productList) {
        setProducts(productList.data);
      } else {
        console.log('Lỗi khi lấy danh sách sản phẩm');
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate(); // Get the navigate function from useNavigate

  console.log(products);

  const handleItemClick = (itemID) => {
    console.log(itemID)
    navigate(`/detailb/${itemID}`); // Navigate to the "/detail" page with the item ID
  };

  const applyFilters = (product) => {
    console.log("filter by type", filters.type);
    return (
      (!filters.price || product.price <= filters.price) &&
      (!filters.type || filters.type == 0 || (product.product_type && product.product_type.id == filters.type)) &&
      (!filters.season || filters.season == 0 || product.growingSeason == filters.season)
    );
  };

  const filteredProducts = products.filter(applyFilters);

  console.log(products);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={"stock-manager"} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"Dashboard"} subtitle={"Welcome to the Dashboard!"} />
              </Box>

              <Box className="filter-container">
                {/* Bộ lọc giá */}
                <Box>
                  <label>Filter by Price:</label>
                  <select className="filter-select" onChange={(e) => setFilters(prevFilters => ({ ...prevFilters, price: parseFloat(e.target.value) }))}>
                    <option value={null}>Tất cả</option>
                    <option value={50000}>Dưới 50.000</option>
                    <option value={100000}>Dưới 100.000</option>
                    <option value={500000}>Dưới 500.000</option>
                  </select>
                </Box>

                {/* Bộ lọc loại */}
                <Box>
                  <label>Filter by Type:</label>
                  <select className="filter-select" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                    <option value={0}>Tất cả</option>
                    <option value={1}>Cây ăn quả</option>
                    <option value={2}>Hạt giống</option>
                    <option value={3}>Cây rau/gia vị</option>
                  </select>
                </Box>

                {/* Bộ lọc mùa */}
                <Box>
                  <label>Filter by Season:</label>
                  <select className="filter-select" onChange={(e) => setFilters({ ...filters, season: e.target.value })}>
                    <option value={0}>Tất cả</option>
                    <option value={1}>Mùa hè</option>
                    <option value={2}>Mùa xuân</option>
                    <option value={3}>Mùa thu</option>
                    <option value={4}>Mùa đông</option>
                  </select>
                </Box>
              </Box>

              <Box className="product-container" mt={3}>
                {filteredProducts.map((product, index) => (
                  <div key={index} onClick={() => handleItemClick(product.id)}>
                    <ProductCard
                        key={index}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        rating={product.rate}
                    />
                  </div>
                ))}
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Home;
