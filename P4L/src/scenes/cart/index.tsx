import {useLoginState} from "../../hooks/loginState";
import {useEffect, useState} from "react";
import {CartApi} from "../../api/api2/cart";
import {Cart} from '../../api/types';
import React from "react";
import { Divider, Drawer, Button } from "antd";
import PlantCard from "./plant_card";
import {getCartData, getCartTotalValue, getCartShippingCost} from "../checkout/get_data";
import { useNavigate } from "react-router-dom";

function createPlantCard(data) {
  return <PlantCard url={data.url} name={data.name} price={data.price} quantity={data.quantity} into_money={data.into_money}/>
};

export var createPlantCards = function(data) {
  return data.map(createPlantCard);
};

const Cost = (props) => {
  var totalCost = getCartTotalValue(props);
  var shippingCost = getCartShippingCost(props);

  return (
    <div>
      <div>
        <label style={{fontSize: "22px"}}>Giá sản phẩm</label>
        <label style={{fontSize: "20px", position: "relative", right:"-132px"}}>{totalCost}</label>
      </div>
      <div style={{paddingTop: "20px"}}>
        <label style={{fontSize: "22px"}}>Giá vận chuyển</label>
        <label style={{fontSize: "20px", position: "relative", right:"-130px"}}>{shippingCost}</label>
      </div>
    </div>
  )
}

function CartView(props) {
  let [loginState, user, token] = useLoginState();
  let [cart, setCart] = useState<Cart[]>([]);
  useEffect(() => {
    let c = new CartApi(token);
    c.list();
  }, [token])

  let navigate = useNavigate(); 
  const gotoCheckout = () =>{ 
    let path = `/checkout`; 
    navigate(path);
  }

  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(true);
  };

  return (
    <>
      <Drawer 
        placement="right"
        width={550} 
        onClose={onClose} 
        open={open} >
        <p style={{fontSize: "30px"}}>Giỏ hàng</p>
        <p>Chính tay đội ngũ chúng tôi tỉ mỉ chuẩn bị và đóng gói, trân trọng từng loại cây để đem cho bạn giá trị tốt nhất.</p>
        {createPlantCards(getCartData(props))}
        <Divider style={{ borderWidth: 3}}/>
        <Cost/>
        <div style={{paddingTop: "20px"}}/>
        <Button
          style={{width: "420px", height: "50px", backgroundColor: "#B9E4D5"}}
          onClick={() => gotoCheckout()}>
          Đặt hàng
        </Button>
      </Drawer>
    </>
  )
}

export default CartView;
