import { Space, Steps, Divider, Badge } from "antd";

const PlantCard = (props) => {
  return (<Space>
    <img src={props.url} style={{width: "4rem", height: "4rem", marginLeft: "3rem"}}></img>
    <Badge className="relative" count={props.quantity} style={{bottom: "1.5rem", right: "0.5rem", backgroundColor: "#A8C6BB", color: "black"}}>

    </Badge>
    <Space direction="vertical" style={{width: "25rem"}}>
      <div className="font-bold font-opensans text-xl">{props.name}</div>
      <div className="font-opensans" style={{color: "#808080"}}>{props.cost}</div>
    </Space>
    <div className="font-opensans" style={{color: "#808080", textAlign: "right", width: "5rem"}}>{props.totalCost}</div>
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

const Order = (props) => {
  let src = "/src/scenes/user-profile/faClock.png";
  let textColor = "red";
  let items = [
    {
      title: '21-02-2024',
      description: 'Đang giao hàng. Đơn hàng đang trên đường giao đến bạn'
    },
    {
      title: 'In Progress',
    },
    {
      title: 'Waiting',
    },
    {
      title: 'Waiting',
    },
  ]

  if (props.status === "GIAO HÀNG THÀNH CÔNG") {
    src = "/src/scenes/user-profile/faCheckCircle.png";
    textColor = "green";
  }
  
  let totalCost = 0;
  let shippingCost = 250000;

  return <div style={{width: "90%", height: "37.5rem", marginLeft: "5rem", marginTop: "3rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09)", borderRadius: "1rem"}}>
    <Space direction="vertical">
      <Space className="font-opensans text-xl" direction="horizontial" style={{width: "30rem", marginLeft: "3rem", marginTop: "2rem"}}>
        <div className="font-bold">TRẠNG THÁI: </div>
        <div style={{color: textColor}}>{props.status}</div>
        <img src={src}></img>
      </Space>
      <div className="flex flex-col gap-4" style={{height: "15rem", overflow: "auto"}}>
        {props.cart.map(c => {
          return <PlantCard name={c.name} quantity={c.quantity} cost={c.cost} totalCost={c.quantity * c.cost} url={c.url}></PlantCard>
        })}
      </div>
      
      <Divider style={{borderLeft: "40rem solid black", marginLeft: "3rem"}}></Divider>
      <Space className="font-opensans text-xl" direction="horizontial" style={{marginLeft: "3rem"}}>
        <div style={{width: "16.5rem"}}>Giá sản phẩm</div>
        <div className="font-semibold" style={{width: "20rem", textAlign: "right"}}>{totalCost}</div>
      </Space>
      <Space className="font-opensans text-xl" direction="horizontial" style={{marginLeft: "3rem"}}>
        <div style={{width: "16.5rem"}}>Vận chuyển</div>
        <div style={{width: "20rem", textAlign: "right"}}>{shippingCost}</div>
      </Space>
      <Divider style={{borderLeft: "40rem solid black", marginLeft: "3rem"}}></Divider>
      <Space className="font-opensans text-xl" direction="horizontial" style={{marginLeft: "3rem"}}>
        <div className="font-bold" style={{width: "16.5rem"}}>Tổng tiền</div>
        <div className="font-bold" style={{width: "20rem", textAlign: "right"}}>{totalCost + shippingCost}</div>
      </Space>
    </Space>
    <Space className="font-opensans text-xl" direction="vertical" style={{marginLeft: "5rem"}}>
      <div className="text-sm" style={{textAlign: "right", width: "30rem", opacity: "0.5"}}>Donald Đức, cột mốc 108 biên giới Việt - Trung (núi Các Mác)</div>
      <Steps
        direction="vertical"
        current={1}
        progressDot={Dot}
        items={items}
      />
    </Space>
  </div>
}

const OrderView = (props) => {
  var cart = [{
    name: "pot",
    quantity: 100,
    cost: 1234567,
    url: "hmm"
  }]

  if (!props.show) {
    return <></>
  }

  return (<div>
    <Order cart={cart} status="ĐANG GIAO"></Order>
    <Order cart={cart} status="GIAO HÀNG THÀNH CÔNG"></Order>
  </div>);
}

export default OrderView;