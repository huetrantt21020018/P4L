import {useLoginState} from "../../hooks/loginState";
import {useEffect, useState} from "react";
import {CartApi} from "../../api/api2/cart";
import {Cart} from '../../api/types';
import {Divider, Drawer, Button, Image, Popconfirm} from "antd";
import { useNavigate } from "react-router-dom";

const PlantCard = (props : { url: string, name: string, price: number, quantity: number, onDelete?: () => void }) => {
  let f = new Intl.NumberFormat('vi-VN');
  return (
    <div className={"flex flex-row gap-8 font-opensans"}>
      <Image width={90} height={90} shape="square" src={props.url} />

      <div className={"flex flex-col gap-1.5 w-full"}>
        <label className={"text-2xl font-bold"}>
          {props.name}
        </label>
        <div>
          <label style={{color: "#808080"}} className={"text-base"}>
            {f.format(props.price)} VND
          </label>
        </div>
        <div className={"flex flex-row justify-between"}>
          <div className={"flex flex-row gap-3 w-full"}>
            <Button
              type="default"
              size="small"
              shape="circle">
              -
            </Button>
            <div className="quantity-plant-card min-w-6">
              {f.format(props.quantity)}
            </div>
            <Button type="default" size="small" shape="circle">
              +
            </Button>
          </div>
          <Popconfirm title={"Chắc chắn xóa khỏi giỏ?"} onConfirm={() => {
            props.onDelete?.();
          }}>
            <button className={"justify-self-end bg-transparent underline border-0"}>
              Xóa
            </button>
          </Popconfirm>
        </div>
      </div>

    </div>
  )
}

export var createPlantCards = function(data: Cart[]) {
  return data.map(c => {
    return <PlantCard url={c.product?.productThumbnails?.[0]?.url}
               name={c.product?.name}
               price={c.product?.price}
               quantity={c.count}
               into_money={c.count * c.product?.price}/>
  });
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
    setOpen(false);
  };

  return (
    <div className={"font-opensans"}>
      <Drawer
        style={{
          backgroundColor: '#F4F4F4'
        }}
        placement="right"
        width={600}
        onClose={onClose}
        open={open}
        title={`Giỏ hàng (${cart.length})`}>

        <div className={"font-opensans"}>
          <p className={"opacity-70"}>
            Chính tay đội ngũ chúng tôi tỉ mỉ chuẩn bị và đóng gói, trân trọng từng loại cây để đem cho bạn giá trị tốt nhất.
          </p>

          <div className={"flex flex-col gap-4"}>
            {cart.map(c => {
              return <PlantCard key={c.id}
                                url={c.product?.productThumbnails?.[0]?.url}
                                name={c.product?.name}
                                price={c.product?.price}
                                quantity={c.count}
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
          <Divider style={{ borderWidth: 3}}/>
          <Cost totalValue={totalCost} totalShipping={totalShipping}/>
          <div style={{paddingTop: "20px"}}/>
          <Button
            style={{width: "420px", height: "50px", backgroundColor: "#B9E4D5"}}
            onClick={() => gotoCheckout()}>
            Đặt hàng
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default CartView;
