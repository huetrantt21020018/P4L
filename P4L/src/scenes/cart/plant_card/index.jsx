import React from "react";
import ReactDOM from "react-dom/client";
import {Image, Badge, Divider, Button} from "antd";

import "./index.css";

/**
 * props need the following properties:
 *
 * url: image url
 * name: name of the plant
 * price: price of the plant
 * quantity: the quantity of the plant
 * into_money: total cost
 *
 */

const PlantCard = (props) => {
  let f = new Intl.NumberFormat('vi-VN');
  return (
    <div style={{display: "flex", paddingTop: "15px"}}>
      <Image width={80} height={80} shape="square" src={props.url} />
      <div style={{width: "300px", paddingLeft: "22px", paddingTop: "5px"}}>
        <label style={{fontWeight: "bold"}} className={"text-xl"}>{props.name}</label>
        <div style={{width: "300px"}}>
          <label style={{color: "#808080"}} className={"text-sm"}>{f.format(props.price)} VND</label>
        </div>
        <Button
          type="default"
          size="small"
          shape="circle">
          -
        </Button>
        <label className="quantity-plant-card">{f.format(props.quantity)}</label>
        <Button type="default" size="small" shape="circle">
          +
        </Button>
        <div style={{position: "relative", bottom: "20px", textAlign: "right"}}
          onClick={e => {console.log(1);}}>
          Xóa
        </div>
      </div>

    </div>
  )
}

export default PlantCard;
