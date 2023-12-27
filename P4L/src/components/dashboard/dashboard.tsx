import { Box } from "@mui/material";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from '../global/SideBar';
import { useState } from 'react';
import UserDashboard from "./user/index";
import ProductDashboard from "./product/index";
import OrderDashboard from "./order/index";
import {useMatch} from 'react-router';
import StockDashboard from "./stock";

const Dashboard = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    let m = useMatch('/admin/:subroute');

    let routes = [
      {
        path: 'user',
        component: <UserDashboard />
      },
      {
        path: 'product',
        component: <ProductDashboard />
      },
      {
        path: 'order',
        component: <OrderDashboard />
      },
      {
        path: 'stock',
        component: <StockDashboard />
      }
    ];

    let c : typeof routes[0]['component'] | null = null;
    for (let f of routes) {
      if (f.path.toLowerCase() === m.params['subroute']?.toLowerCase()) {
        c = f.component;
      }
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Box m="0.25rem">
                          {c}
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Dashboard;
