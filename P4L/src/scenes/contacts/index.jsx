import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../global/TopBar';
import Sidebar from '../global/SideBar';
import { useState } from 'react';

const Contacts = () => {
  const theme2 = useTheme();
  const colors = tokens(theme2.palette.mode);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const columns = [
    {
        field: "id",
        headerName: "ID",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "registrarId",
        headerName: "Registrar ID",
        headerAlign: "center",
        align: "center",
    },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
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
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
        headerAlign: "center",
    },
    {
        field: "city",
        headerName: "City",
        flex: 1,
        headerAlign: "center",
        align: "center",
    },
    {
        field: "zipCode",
        headerName: "Zip Code",
        flex: 1,
        headerAlign: "center",
        align: "center",
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
              <Header
                title="Contacts"
                subtitle="List of Contacts for Future Reference"
              />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    fontSize: "14px",
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
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                <DataGrid
                  rows={mockDataContacts}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Contacts;
