import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { ColorModeContext, useMode } from './theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Payment from './components/payment/payment';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile'
import Purchase from './components/purchase/purchase'


const Routess = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Payment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/purchase" element={<Purchase />} />
    </Routes>
  )
};

export default Routess;