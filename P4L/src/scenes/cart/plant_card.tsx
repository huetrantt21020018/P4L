import {Button, Image, Popconfirm} from "antd";
import {useLoginState} from "../../hooks/loginState";
import {Cart} from "../../api/types";
import {useEffect, useMemo, useState} from "react";
import {CartApi} from "../../api/api2/cart";

const PlantCard = ({ cart, onReload, onDelete } : { cart: Cart, onDelete?: () => void, onReload?: () => void }) => {
  let f = new Intl.NumberFormat('vi-VN');
  let [state, user, token] = useLoginState();
  let [loading, setLoading] = useState(false);

  let [cartCount, setCartCount] = useState(0);
  let [cartEditCount, setCartEditCount] = useState(false);

  let product = cart?.product;
  let update = useMemo(() => {
    return () => {
      let old = {...cart};
      old.count = cartCount;
      let t = new CartApi(token);

      setLoading(true);
      t.put(old.id, old)
        .then(rs => {
          if (rs.success) {
            onReload?.();
            setCartEditCount(false);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [token, cartCount]);

  useEffect(() => {
    setCartCount(cart.count);
    setCartEditCount(false);
  }, [cart])

  return (
    <div className={"flex flex-row gap-8 font-opensans"}>
      <Image width={90} height={90} src={product?.productThumbnails?.[0]?.url} />

      <div className={"flex flex-col gap-1.5 w-full"}>
        <label className={"text-2xl font-bold"}>
          {product?.name}
        </label>
        <div>
          <label style={{color: "#808080"}} className={"text-base"}>
            {f.format(product?.price)} VND
          </label>
        </div>
        <div className={"flex flex-row justify-between"}>
          <div className={"flex flex-row gap-3 w-full"}>
            <Button type="default" size="small" shape="circle" disabled={!cart?.count || loading}
                    onClick={() => {
                      setCartCount(cartCount - 1);
                      setCartEditCount(true);
                    }}>
              -
            </Button>
            <div className="quantity-plant-card min-w-6">
              {f.format(cartCount)}
            </div>
            <Button type="default" size="small" shape="circle" disabled={loading}
                    onClick={() => {
                      setCartCount(cartCount + 1);
                      setCartEditCount(true);
                    }}>
              +
            </Button>
            {cartEditCount && <Button type="default" size="small" onClick={update} loading={loading}>
              Lưu
            </Button>}
          </div>
          <Popconfirm title={"Chắc chắn xóa khỏi giỏ?"} onConfirm={() => {
            onDelete?.();
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

export default PlantCard;
