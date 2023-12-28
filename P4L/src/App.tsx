import "./App.css";
import {useLoginState} from "./hooks/loginState";
import {Navbar} from "./components/Navbar";
import {LoginContext} from "./context/loginContext";
import {Route, Routes, useMatch, Navigate} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from './components/dashboard/dashboard';

import ProductList from './scenes/product-list/index';
import ProductDetail from "./scenes/product-detail/index";
import Cart from "./scenes/cart";
import Checkout from "./scenes/checkout";
import SuccessOrder from "./scenes/success_order"
import React from "react";

function App() {
  let [loginState, user, token] = useLoginState();
  let isLogin = useMatch("/login");
  let isRegister = useMatch("/register");

  return (
    <LoginContext.Provider value={[loginState, user, token]}>
      <div>
        {(!isLogin && !isRegister) && <Navbar/>}
        <Routes>
          <Route path={"/"} element={<></>} />
          <Route path={"/products"} element={<ProductList />} />
          <Route path={"/products/:id"} element={<ProductDetail />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/cart"} element={<Cart></Cart>} />
          <Route path={"/admin/:subroute/*"} element={<Dashboard />} />
          <Route path={"/admin"} element={<Navigate to={"/admin/product"} replace />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/successorder"} element={<SuccessOrder />}>
          </Route>
        </Routes>
      </div>
    </LoginContext.Provider>
  )
}

export default App;
