import {useContext, useState} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import UserImage from "../../assets/user.jpg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import {LoginContext} from "../../context/loginContext";

const Item = ({ selected, to, icon, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected}
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = () => {
  let [loginState, user] = useContext(LoginContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  let links = [
    {
      title: 'Quản lý người dùng',
      link: '/admin/user',
      icon: <PeopleOutlinedIcon />,
      match: false,
    },
    {
      title: 'Quản lý hàng hóa',
      link: '/admin/product',
      icon: <WarehouseOutlinedIcon />,
      match: false,
    },
    {
      title: 'Quản lý đơn hàng',
      link: '/admin/order',
      icon: <LocalShippingOutlinedIcon />,
      match: false,
    },
    {
      title: 'Quản lý nguồn hàng',
      link: '/admin/stock',
      icon: <InventoryOutlinedIcon />,
      match: false,
    },
  ];

  for (let l of links) {
    l.match = !!useMatch(l.link);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-sidebar": {
          zIndex: 'unset'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed} rootStyles={{ zIndex: 50 }}>
        <Menu iconShape="square">
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={user?.detail?.avatarUrl}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user?.name}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {links.map(l => {
              return (
                <Item
                  title={l.title}
                  to={l.link}
                  icon={l.icon}
                  selected={l.match}
                />
              )
            })}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
