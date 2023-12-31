import {useLoginState} from "../../hooks/loginState";
import {useEffect, useState} from "react";
import {CartApi} from "../../api/api2/cart";
import {Cart} from '../../api/types';
import {Drawer, Button, Image, Popconfirm} from "antd";
import { useNavigate } from "react-router-dom";
import PlantCard from './plant_card';

function CartView({ open, onClose } : { open: boolean, onClose?: () => void }) {
  let [loginState, user, token] = useLoginState();
  let [cart, setCart] = useState<Cart[]>([]);
  let f = new Intl.NumberFormat('vi-VN');

  let load = () => {
    let c = new CartApi(token);
    c.list()
      .then(rs => {
        if (rs.success) {
          setCart(rs.data);
        }
      });
  };

  useEffect(() => {
    load();
  }, [token])

  let navigate = useNavigate();

  let totalCost = cart.reduce((prev, curr) => prev + (curr.count * (curr.product?.price)) || 0, 0);
  let totalShipping = 727000;

  let footer = (
    <div className={"flex flex-col gap-8 font-opensans px-6"}>
      <div className={"grid grid-cols-2 pt-4 text-xl gap-y-8"}>
        <div className={"text-xl"}>
          Giá sản phẩm
        </div>
        <b className={"text-right"}>
          {f.format(totalCost)}
        </b>
        <div className={"text-xl"}>
          Vận chuyển
        </div>
        <div className={"text-right"}>
          {f.format(totalShipping)}
        </div>
      </div>
      <div className={"pb-6 text-center"}>
        <button
          className={"font-bold bg-[#B9E4D5] border-0 rounded-md text-lg py-4 px-40 cursor-pointer"}
          onClick={() => {
            onClose?.();
            navigate(`/checkout`);
          }}>
          Đặt hàng
        </button>
      </div>
    </div>
  )

  return (
    <div className={"font-opensans"}>
      <Drawer
        style={{
          backgroundColor: '#F4F4F4'
        }}
        placement="right"
        width={600}
        open={open}
        onClose={onClose}
        footer={footer}
        title={`Giỏ hàng (${cart.length})`}>

        <div className={"font-opensans px-6"}>
          <p className={"opacity-70"}>
            Chính tay đội ngũ chúng tôi tỉ mỉ chuẩn bị và đóng gói, trân trọng từng loại cây để đem cho bạn giá trị tốt nhất.
          </p>

          <div className={"flex flex-col gap-4"}>
            {cart.map(c => {
              return <PlantCard key={c.id}
                                cart={c}
                                onReload={() => {
                                  load();
                                }}
                                onDelete={() => {
                                  let cc = new CartApi(token);
                                  cc.delete(c.id)
                                    .then(rs => {
                                      if (rs.success) {
                                        load();
                                      }
                                    })
                                }}/>
            })}
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default CartView;
