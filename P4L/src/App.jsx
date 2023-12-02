import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Create from './scenes/create';
import Contacts from './scenes/contacts';
import Profile from './scenes/profile';
import OrderManager from './scenes/order-manager';
import ProductList from './scenes/product-list';
import Product from './scenes/product-detail-manager'
import ProductB from './scenes/product-detail-buyer'
import Home from './scenes/home'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={"stock-manager"} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App
