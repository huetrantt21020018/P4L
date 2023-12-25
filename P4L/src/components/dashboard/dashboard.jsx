import { Box } from "@mui/material";
import Header from "../Header";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/TopBar';
import Sidebar from '../global/SideBar';
import { useState } from 'react';
import UserDashboard from "./user/index";
import ProductDashboard from "./product/index";
import OrderDashboard from "./order/index";

const Dashboard = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

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
      }
    ]

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Box m="20px">
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Header title={"Dashboard"} subtitle={"Welcome to the Dashboard!"} />
                            </Box>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default Dashboard;
