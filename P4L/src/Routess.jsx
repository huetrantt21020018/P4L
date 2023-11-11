import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Payment from './components/payment/payment';
import Home from "./components/home.component";
import Profile from "./components/profile.component";

const Routess = () => {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Payment />} />
    </Routes>
  )
};

export default Routess;