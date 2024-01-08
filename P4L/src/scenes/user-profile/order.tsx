import { Space, Steps, Divider, Badge } from "antd";
import {Order, Status, StatusText} from "../../api/types";
// @ts-ignore
import location from "../../assets/final.json";
import Clock from "../../assets/faClock.png";
import CheckCircle from "../../assets/faCheckCircle.png";

const PlantCard = (props) => {
  let f = new Intl.NumberFormat('vi-VN');
  return (<Space>
    <img src={props.url} style={{width: "4rem", height: "4rem", marginLeft: "3rem"}}></img>
    <Badge className="relative" count={props.quantity} style={{bottom: "1.5rem", right: "0.5rem", backgroundColor: "#A8C6BB", color: "black"}}>

    </Badge>
    <Space direction="vertical" style={{width: "25rem"}}>
      <div className="font-bold font-opensans text-xl">{props.name}</div>
      <div className="font-opensans" style={{color: "#808080"}}>
        {f.format(props.cost)}
      </div>
    </Space>
    <div className="font-opensans" style={{color: "#808080", textAlign: "right", width: "5rem"}}>{f.format(props.totalCost)}</div>
  </Space>);
}

const Dot = (dot, { status, index }) => {
  if (status === "finish") {
    return (<div style={{borderRadius: "50%", backgroundColor: "white", width: "0.5rem", height: "0.5rem", boxShadow: "0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 4px rgba(0, 0, 0, 0.3)"}}></div>);
  }

  if (status === "process") {
    return (<div style={{borderRadius: "50%", backgroundColor: "#72B4AC", width: "0.5rem", height: "0.5rem", boxShadow: "0 0 0 4px rgba(255, 255, 255, 1), 0 0 0 5px rgba(114,180,172, 0.2)"}}></div>);
  }
  return (<div style={{borderRadius: "50%", backgroundColor: "white", width: "0.5rem", height: "0.5rem", boxShadow: "0 0 0 0.5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.19)"}}></div>);
};

const Order1 = (props : { cart: Order }) => {
  let f = new Intl.NumberFormat('vi-VN');
  let { cart } = props;
  let src = Clock;
  let textColor = "red";
  let items = [
    {
      title: new Date(cart.timeShipped).toLocaleDateString('vi-VN'),
      description: 'Đã giao thành công'
    },
    {
      title: new Date(cart.timeShipping).toLocaleDateString('vi-VN'),
      description: 'Đang giao hàng. Đơn hàng đang trên đường giao đến bạn'
    },
    {
      title: new Date(cart.timeShipping).toLocaleDateString('vi-VN'),
      description: 'Đơn hàng đang trong quá trình vận chuyển tới kho'
    },
    {
      title: new Date(cart.timePreparing).toLocaleDateString('vi-VN'),
      description: 'Đơn hàng được xác nhận'
    },
    {
      title: new Date(cart.timestamp).toLocaleDateString('vi-VN'),
      description: 'Đơn hàng được đặt'
    },
  ];

  switch (cart.status) {
    case Status.Preparing: items = items.slice(3); break;
    case Status.Shipping: items = items.slice(1); break;
    case Status.Placed: items = items.slice(4); break;
    case Status.Cancelled: items = [
      {
        title: new Date(cart.timeCancelled).toLocaleDateString('vi-VN'),
        description: 'Đơn hàng bị hủy'
      },
      {
        title: new Date(cart.timestamp).toLocaleDateString('vi-VN'),
        description: 'Đơn hàng được đặt'
      },
    ]; break;
  }

  let statusText = StatusText.find(r => r.status === cart.status)?.text;
  if (cart.status === Status.Shipped) {
    src = CheckCircle;
    textColor = "green";
  }

  let totalCost = cart.detail.reduce((p, c) => p + c.totalPrice, 0);
  let shippingCost = 727000;

  return <div style={{width: "90%", height: "37.5rem", marginLeft: "5rem", marginTop: "3rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09)", borderRadius: "1rem"}}>
    <Space direction="vertical">
      <Space className="font-opensans text-xl" direction="horizontal" style={{width: "30rem", marginLeft: "3rem", marginTop: "2rem"}}>
        <div className="font-bold">TRẠNG THÁI: </div>
        <div style={{color: textColor}}>{statusText}</div>
        <img src={src}></img>
      </Space>
      <div className="flex flex-col gap-4" style={{height: "15rem", overflow: "auto"}}>
        {cart.detail.map(c => {
          return <PlantCard name={c.product?.name} quantity={c.count} cost={c.product?.price}
                            totalCost={c.totalPrice}
                            url={c?.product?.productThumbnails?.[0]?.url} />
        })}
      </div>

      <Divider style={{borderLeft: "40rem solid black", marginLeft: "3rem"}}></Divider>
      <Space className="font-opensans text-xl" direction="horizontal" style={{marginLeft: "3rem"}}>
        <div style={{width: "16.5rem"}}>Giá sản phẩm</div>
        <div className="font-semibold" style={{width: "20rem", textAlign: "right"}}>{f.format(totalCost)}</div>
      </Space>
      <Space className="font-opensans text-xl" direction="horizontal" style={{marginLeft: "3rem"}}>
        <div style={{width: "16.5rem"}}>Vận chuyển</div>
        <div style={{width: "20rem", textAlign: "right"}}>{f.format(shippingCost)}</div>
      </Space>
      <Divider style={{borderLeft: "40rem solid black", marginLeft: "3rem"}}></Divider>
      <Space className="font-opensans text-xl" direction="horizontal" style={{marginLeft: "3rem"}}>
        <div className="font-bold" style={{width: "16.5rem"}}>Tổng tiền</div>
        <div className="font-bold" style={{width: "20rem", textAlign: "right"}}>{f.format(totalCost + shippingCost)}</div>
      </Space>
    </Space>
    <Space className="font-opensans text-xl" direction="vertical" style={{marginLeft: "5rem"}}>
      <div className="text-sm" style={{textAlign: "right", opacity: "0.5"}}>
        {cart?.country} - {cart?.province}, {cart?.city}, {cart?.ward}, {cart?.street} {cart?.extra ? `[${cart.extra}]` : cart.extra}
      </div>
      <Steps
        direction="vertical"
        current={0}
        progressDot={Dot}
        items={items}
      />
    </Space>
  </div>
}

const OrderView = (props : { order: Order[] }) => {
  return (
    <div>
      {props.order.map(o => {
        return (
          <Order1 cart={o} ></Order1>
        )
      })}
    </div>
  );
}

export default OrderView;
