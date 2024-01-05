import {useEffect, useState} from 'react';
import { Menu, Avatar, Input, Button, DatePicker, Select } from 'antd';
import ProfileView from "./profile";
import OrderView from "./order.js";
import HistoryView from './history.jsx';
import {useLoginState} from "../../hooks/loginState";
import {Order} from "../../api/types";
import {OrderApi} from "../../api/api2/order";
import { useParams, useNavigate, useMatch } from 'react-router-dom';

const Banner = (props) => {
  let navigate = useNavigate();
  return (
    <div className="px-32 flex flex-row font-opensans" style={{height: "15rem", backgroundColor: "#E8F8FA"}}>
      <div className={"flex-grow"} style={{ paddingTop: "2rem"}}>
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
      <div className={"pr-10"} style={{textAlign: "right", paddingTop: "2rem"}}>
        <div className="text-sm" style={{color: "#106A7D"}}>
          Tổng số đơn hàng
        </div>
        <div className="text-3xl" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          {props.orderCount}
        </div>
        <Button className="bg-[#B9E4D5]" style={{width: "9rem", height: "3rem", border: "none"}} onClick={() => {
          navigate('/profile/order')
        }}>
          Lịch sử mua
        </Button>
      </div>
    </div>
  );
}

// need to pass data to Banner
const UserProfile = (props) => {
  let params = useParams();
  let navigate = useNavigate();
  let [state, user, token] = useLoginState();
  let [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;

    let api = new OrderApi(token);
    api.list()
      .then(rs => {
        if (rs.success) {
          setOrder(rs.data);
        }
      })
  }, [user, token])

  let key = params['subroute'];

  const items = [
    {
      key: "user",
      label: "Thông tin cá nhân",
      style: { width: '9rem', textAlign: "center", familyFont: "open-sans"},
      component: <ProfileView show={true} />
    },
    {
      key: "order",
      label: "Đơn hàng",
      style: { width: '9rem', textAlign: "center"},
      component: <OrderView order={order} />
    },
    {
      key: "history",
      label: "Lịch sử mua hàng",
      style: { width: '9rem', textAlign: "center"},
      component: <OrderView order={order} />
    }
  ];

  const onClickMenu = (e) => {
    navigate(`/profile/${e.key}`);
  }

  let component = items.find(f => f.key?.toLowerCase() === key?.toLowerCase())?.component;

  return (
    <div>
      <Banner username={user?.name} orderCount={order.length} creationYear={new Date(user?.creationTime).getFullYear()}/>
      <Menu selectedKeys={key ? [key] : []}
            onClick={onClickMenu} mode={"horizontal"} theme={"light"}
            // @ts-ignore
            items={items} style={{ borderWidth: 3, marginLeft: "4.5rem"}}>
      </Menu>
      {component}
    </div>
  )
}

export default UserProfile;
