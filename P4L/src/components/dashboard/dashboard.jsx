import { Box } from "@mui/material";
import Header from "../Header";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';
import { useState } from 'react';

const Dashboard_User = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
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

export default Dashboard_User;