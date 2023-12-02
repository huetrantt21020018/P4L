import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title={"Dashboard"} subtitle={"Welcome to the Dashboard!"} />
            <Box>
                <Button
                    sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
            </Box>
        </Box>

        {/* Grid and Chart */}

        {/* Row 1 */}
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            m={"20px 0 0 0"}
        >
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                title="125,500"
                subtitle="Total Sales"
                progress="0.75"
                increase="+14%"
                icon={
                    <MonetizationOnOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                title="123"
                subtitle="Total Orders"
                progress="0.50"
                increase="+21%"
                icon={
                    <LocalMallOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                title="578"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                    <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                title="1,325,134"
                subtitle="Stocks"
                progress="0.80"
                increase="+43%"
                icon={
                    <Inventory2OutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />
            </Box>
        </Box>
        
    </Box>
  );
};

export default Dashboard;
