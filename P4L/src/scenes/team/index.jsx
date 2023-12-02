import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  );
};

export default Team;