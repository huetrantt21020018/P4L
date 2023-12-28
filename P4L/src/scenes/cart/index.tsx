import {useLoginState} from "../../hooks/loginState";
import {useEffect, useState} from "react";
import {CartApi} from "../../api/api2/cart";
import {Cart} from '../../api/types';
import React from "react";

function CartView() {
  let [loginState, user, token] = useLoginState();
  let [cart, setCart] = useState<Cart[]>([]);
  useEffect(() => {
    let c = new CartApi(token);
    c.list();
  }, [token])
  return (
    <>
      <div className={"font-opensans"}>
        <div className={"text-lg font-semibold opacity-70"}>
          30-day Guarantee
        </div>
        <div className={"opacity-70"}>
          Cây trồng và hạt giống sẽ được bảo quản trong điều kiện tốt nhất khi đang giao.
          <br/>
          Nếu không, chúng tôi cam kết sẽ thay thế hoàn toàn miễn phí.
        </div>
      </div>
    </>
  )
}

export default CartView;
