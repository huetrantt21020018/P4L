import {Divider} from "antd";
import {Cart} from "../../api/types";

function Footer({ cart } : { cart: Cart[] }) {
  let f = new Intl.NumberFormat('vi-VN');
  let totalCost = cart.reduce((prev, curr) => prev + (curr.count * (curr.product?.price)) || 0, 0);
  let totalShipping = 727000;
  return (
    <div className={"flex flex-col gap-2 font-opensans"}>
      <Divider style={{ borderWidth: 3, marginTop: 0 }} />
      <div className={"grid grid-cols-2 text-xl gap-y-4"}>
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
      <Divider style={{ borderWidth: 3 }} />
      <div className={"pb-6"}>
        <div className={"grid grid-cols-2 text-xl gap-y-4"}>
          <div className={"text-xl"}>
            Tổng cộng
          </div>
          <b className={"text-right"}>
            {f.format(totalCost + totalShipping)}
          </b>
        </div>
      </div>
    </div>
  )
}
export default Footer;
