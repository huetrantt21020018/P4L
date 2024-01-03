import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/TopBar';
import Sidebar from '../global/SideBar';
import { useState } from 'react';

const Team = () => {
  const theme2 = useTheme();
  const colors = tokens(theme2.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const columns = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        // align: "center",
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "center",
        align: "center",
    },
    {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        headerAlign: "center",
        // align: "center",
    },
    {
        field: "accessLevel",
        headerName: "Access Level",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { access } }) => {
            return (
            <Box
                width="70%"
                m="0 auto"
                p="7px 7px 5px 5px"
                display="flex"
                justifyContent="center"
                backgroundColor={
                access === "admin"
                    ? colors.greenAccent[600]
                    : access === "manager"
                    ? colors.greenAccent[700]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
            >
                <Box>
                    {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                    {access === "manager" && <SecurityOutlinedIcon />}
                    {access === "user" && <LockOpenOutlinedIcon />}
                </Box>

                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {access}
                </Typography>
            </Box>
            );
        },
    },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar userRole={""} isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Header title="Team" subtitle="Managing the Team Members" />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    fontSize: "14px"
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    // borderBottom: "none",
                    fontSize: "15px",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                }}
              >
                <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Team;
