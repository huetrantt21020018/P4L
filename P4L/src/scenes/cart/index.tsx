import {useLoginState} from "../../hooks/loginState";
import {useEffect, useState} from "react";
import {CartApi} from "../../api/api2/cart";
import {Cart} from '../../api/types';
import { Divider, Drawer, Button } from "antd";
import PlantCard from "./plant_card";
import { useNavigate } from "react-router-dom";

function createPlantCard(data: Cart) {
  let c = data;
  return <PlantCard url={c.product?.productThumbnails?.[0]?.url}
                    name={c.product?.name}
                    price={c.product?.price}
                    quantity={c.count}
                    into_money={c.count * c.product?.price}/>
};

export var createPlantCards = function(data: Cart[]) {
  return data.map(createPlantCard);
};


function Cost({ totalValue, totalShipping } : { totalValue: number, totalShipping: number }) {
  let f = new Intl.NumberFormat('vi-VN');
  return (
    <div>
      <div>
        <label style={{fontSize: "22px"}}>Giá sản phẩm</label>
        <label style={{fontSize: "20px", position: "relative", right:"-132px"}}>
          {f.format(totalValue)} VND
        </label>
      </div>
      <div style={{paddingTop: "20px"}}>
        <label style={{fontSize: "22px"}}>Giá vận chuyển</label>
        <label style={{fontSize: "20px", position: "relative", right:"-130px"}}>
          {f.format(totalShipping)} VND
        </label>
      </div>
    </div>
  )
}

function CartView(props) {
  let [loginState, user, token] = useLoginState();
  let [cart, setCart] = useState<Cart[]>([]);
  useEffect(() => {
    let c = new CartApi(token);
    c.list()
      .then(rs => {
        if (rs.success) {
          setCart(rs.data);
        }
      });
  }, [token])

  let navigate = useNavigate();
  const gotoCheckout = () =>{
    let path = `/checkout`;
    navigate(path);
  }

  let totalCost = cart.reduce((prev, curr) => prev + (curr.count * (curr.product?.price)) || 0, 0);
  let totalShipping = 727000;

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
        {createPlantCards(cart)}
        <Divider style={{ borderWidth: 3}}/>
        <Cost totalValue={totalCost} totalShipping={totalShipping}/>
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
