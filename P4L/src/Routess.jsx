import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { ColorModeContext, useMode } from './theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Payment from './components/payment/payment';
import Dashboard from './components/dashboard/dashboard.js';
import Dashboard from './scenes/dashboard';
import Profile_User from './components/profile/profile';
import Purchase from './components/purchase/purchase';
import Team from './scenes/team';
import Create from './scenes/create';
import Contacts from './scenes/contacts';
import Profile from './scenes/profile';
import OrderManager from './scenes/order-manager';
import ProductList from './scenes/product-list/index.js';
import Product from './scenes/product-detail-manager';
import ProductB from './scenes/product-detail-buyer';
import Home from './scenes/home'

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard/user" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Payment />} />
      <Route path="/profile/user" element={<Profile_User />} />
      <Route path="/purchase" element={<Purchase />} />

      <Route path="/team" element={<Team />} />
      <Route path='/create' element={<Create />}/>
      <Route path='/contacts' element={<Contacts />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/order-manager' element={<OrderManager />}/>
      <Route path='/stock-manager' element={<ProductList />}/>
      <Route path="/detail/:productID" element={<Product />} />
      <Route path="/detailb/:productID" element={<ProductB />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
};

export default Routess;
