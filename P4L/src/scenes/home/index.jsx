import React, { useState } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import "./index.css"
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [filters, setFilters] = useState({
    price: null,
    type: null,
    season: null,
  });

  const products = [
    { name: 'Cây táo', price: 199.900, type: 'Cây ăn quả', season: 'Mùa xuấn', rating: 4, ID: "abc" },
    // Thêm các sản phẩm khác vào đây
    
  ];

  const navigate = useNavigate(); // Get the navigate function from useNavigate


  const handleItemClick = (itemID) => {
    console.log(itemID)
    navigate(`/detailb/${itemID}`); // Navigate to the "/detail" page with the item ID
  };

  const applyFilters = (product) => {
    return (
      (!filters.price || product.price <= filters.price) &&
      (!filters.type || product.type === filters.type) &&
      (!filters.season || product.season === filters.season)
    );
  };

  const filteredProducts = products.filter(applyFilters);

  console.log(products);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={"Dashboard"} subtitle={"Welcome to the Dashboard!"} />
      </Box>

      <Box className="filter-container">
        {/* Bộ lọc giá */}
        <Box>
          <label>Filter by Price:</label>
          <select className="filter-select" onChange={(e) => setFilters({ ...filters, price: parseFloat(e.target.value) })}>
            <option value={null}>All</option>
            <option value={20}>$20 and below</option>
            <option value={50}>$50 and below</option>
            {/* Thêm các tùy chọn giá khác nếu cần */}
          </select>
        </Box>

        {/* Bộ lọc loại */}
        <Box>
          <label>Filter by Type:</label>
          <select className="filter-select" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value={null}>All</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            {/* Thêm các tùy chọn loại khác nếu cần */}
          </select>
        </Box>

        {/* Bộ lọc mùa */}
        <Box>
          <label>Filter by Season:</label>
          <select className="filter-select" onChange={(e) => setFilters({ ...filters, season: e.target.value })}>
            <option value={null}>All</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            {/* Thêm các tùy chọn mùa khác nếu cần */}
          </select>
        </Box>
      </Box>

      <Box className="product-container" mt={3}>
        {filteredProducts.map((product, index) => (
          <div key={index} onClick={() => handleItemClick(product.ID)}>
            <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
