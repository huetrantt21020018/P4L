import React, { useState } from 'react';
import { Menu, Avatar, Input, Button, DatePicker, Select } from 'antd';
import ProfileView from "./profile.jsx";
import OrderView from "./order.jsx";
import HistoryView from './history.jsx';

const Banner = (props) => {
  return (
    <div className="w-100% flex font-opensans" style={{height: "15rem", backgroundColor: "#E8F8FA"}}>
      <div style={{height: "400px", width: "12rem", paddingLeft: "7.5rem", paddingTop: "2rem"}}>
        <div className="font-opensans text-sm" style={{color: "#106A7D"}}>
          Khách hàng từ {props.creationYear}
        </div>
        <div className="font-poppins text-3xl" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          Xin chào,
        </div>
        <div className="font-poppins text-3xl">
          {props.username}
        </div>
      </div>
      <div className="relative" style={{height: "400px", width: "8rem", left: "60rem", textAlign: "right", paddingTop: "2rem"}}>
        <div className="text-sm" style={{color: "#106A7D"}}>
          Tổng số đơn hàng
        </div>
        <div className="text-3xl" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          {props.orderCount}
        </div>
        <Button className="bg-[#B9E4D5]" style={{width: "9rem", height: "3rem", border: "none"}}>
          Lịch sử mua
        </Button>
      </div>
    </div>
  );
}

// need to pass data to Banner
const UserProfile = (props) => {
  const [profileState, setProfileState] = useState("profile");
  const items = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      style: { width: '9rem', textAlign: "center", familyFont: "open-sans"},
    },
    {
      key: "order",
      label: "Đơn hàng",
      style: { width: '9rem', textAlign: "center"},
    },
    {
      key: "history",
      label: "Lịch sử mua hàng",
      style: { width: '9rem', textAlign: "center"},
    }
  ];

  const onClickMenu = (e) => {
    console.log(e);
    setProfileState(e.key);
  }

  return (
    <div>
      <Banner username="minhducsun2002" orderCount={10} creationYear={2019}/>
      <Menu selectedKeys={profileState} onClick={onClickMenu} mode={"horizontal"} theme={"light"} items={items}     style={{ borderWidth: 3, marginLeft: "4.5rem"}}>
      </Menu>
      <ProfileView show={profileState==="profile"}></ProfileView>
      <OrderView show={profileState==="order"}></OrderView>
      <HistoryView show={profileState==="history"}></HistoryView>
    </div>
  )
}

export default UserProfile;