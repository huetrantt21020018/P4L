import React from "react";
import ReactDOM from "react-dom/client";
import {Image, Badge, Divider} from "antd";

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
  return (
    <div style={{display: "flex", paddingTop: "15px"}}>
      <Image width={80} height={80} shape="square" src={props.url} />
      <Badge className="count" count={props.quantity} showZero color='#A8C6BB'/>
      <div style={{width: "300px", paddingLeft: "12px", paddingTop: "5px"}}>
        <label style={{fontWeight: "bold", fontSize: "22px"}}>{props.name}</label>
        <div style={{width: "300px"}}>
          <label style={{color: "#808080", fontSize: "15px"}}>{props.price}</label>
        </div>
        
      </div>
      <label className="totalCost">{props.into_money}</label>
    </div>
  )
}

export default PlantCard;