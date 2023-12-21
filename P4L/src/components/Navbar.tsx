import {Avatar, Badge, Box, IconButton} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import {MainIcon} from "../icons";
import {useContext, useState} from "react";
import {LoginContext} from "../context/loginContext";
import {LoginState} from "../types/loginState";
import {ShoppingCartIcon} from "lucide-react";
import {useMatch, Link} from 'react-router-dom';
import {Button} from 'antd';

function Navbar() {
  let [loginState, user] = useContext(LoginContext);
  let [search, setSearch] = useState('');

  let links = [
    { link: '/', title: 'Trang chủ', match: false },
    { link: '/products', title: 'Cây trồng', match: false },
  ];

  for (let link of links) {
    let match = useMatch(link.link);
    link.match = !!match;
  }

  return (
    <Box display="flex" justifyContent="space-between" className={"bg-[#D9E4E4] sticky top-0 z-10"} p={0}>
      <div className={"flex flex-row gap-8"}>
        <Box p={2}>
          <div className={"flex flex-row gap-5"}>
            <div className={"flex flex-col justify-center px-2 py-4"}>
              <div className={"flex flex-row gap-3"}>
                <MainIcon/>
                <span className={"font-poppins font-bold text-xl"}>
                Plant For Life
              </span>
              </div>
            </div>
            <form className={"flex flex-row border border-solid border-gray-300 pr-5 rounded-md bg-white shadow-md font-opensans py-2"}
                  onSubmit={e => {
                    e.preventDefault();
                    console.log(search);
                  }}>
              <InputBase sx={{ml: 2, flex: 1}} value={search}
                         onChange={e => setSearch(e.target.value)}
                         placeholder="Tìm kiểm sản phẩm..."/>
            </form>
          </div>
        </Box>
        <ul className={"flex flex-row list-none gap-5 p-0 font-opensans mb-0 mt-8"}>
          {links.map(e => {
            return (
              <li key={e.link} className={"text-lg " + (e.match ? 'border-solid border-t-0 border-x-0 border-b-4 border-[#7FC2D7]' : '')}>
                <Link to={e.link} className="no-underline text-black">
                  {e.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <Box display="flex" p={2}>
        <div className={"flex flex-row gap-2"}>
          {loginState === LoginState.LoggedIn && (
            <a href={"/cart"} className={"flex flex-col justify-center"}>
              <Badge badgeContent={3} color={"primary"}>
                <IconButton>
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </a>
          )}
          <div className={"flex flex-col justify-center"}>
            {loginState === LoginState.LoggedIn
              ? (
                <IconButton>
                  <Avatar src={user?.detail?.avatarUrl}></Avatar>
                </IconButton>
              )
              : (
                <Link to={"/login"}>
                  <Button size={"large"} type={"default"}>
                    Đăng nhập
                  </Button>
                </Link>
              )}
          </div>
        </div>
      </Box>
    </Box>
  )
}

export { Navbar };
