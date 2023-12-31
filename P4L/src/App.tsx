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
import Checkout from "./scenes/checkout/index";
import SuccessOrder from "./scenes/success_order";
import LandingPage from "./scenes/landing-page";
import {useState} from 'react';
import {CartContext} from "./context/cartContext";

function App() {
  let [loginState, user, token] = useLoginState();
  let isLogin = useMatch("/login");
  let isRegister = useMatch("/register");

  let [cartState, setCartState] = useState(0);

  return (
    <LoginContext.Provider value={[loginState, user, token]}>
      <CartContext.Provider value={{
        state: cartState,
        onChange: () => setCartState(cartState + 1)
      }}>
        <div>
          {(!isLogin && !isRegister) && <Navbar/>}
          <Routes>
            <Route path={"/"} element={<LandingPage />} />
            <Route path={"/products"} element={<ProductList />} />
            <Route path={"/products/:id"} element={<ProductDetail />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            {!!user && (
              <>
                <Route path={"/admin/:subroute/*"} element={<Dashboard />} />
                <Route path={"/admin"} element={<Navigate to={"/admin/product"} replace />} />
                <Route path={"/checkout"} element={<Checkout />} />
                <Route path={"/success"} element={<SuccessOrder />} />
              </>
            )}
          </Routes>
        </div>
      </CartContext.Provider>
    </LoginContext.Provider>
  )
}

export default App;
