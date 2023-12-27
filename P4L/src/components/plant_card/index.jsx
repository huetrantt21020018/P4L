import React from "react";
import ReactDOM from "react-dom/client";
import {Image, Badge, Divider} from "antd";

import "./index.css";

const PlantCard = (props) => {
  return (
    <div style={{display: "flex", paddingTop: "15px"}}>
      <Image width={80} height={80} shape="square" src="https://imgur.com/a/7zN0NJF" />
      <Badge className="count" count={1} showZero color='#A8C6BB'/>
      <div style={{width: "300px", paddingLeft: "12px", paddingTop: "5px"}}>
        <label style={{fontWeight: "bold", fontSize: "22px"}}>Large Peace Lily</label>
        <div style={{width: "300px"}}>
          <label style={{color: "#808080", fontSize: "15px"}}>4.500.000 VND</label>
        </div>
        
      </div>
      <label className="totalCost">15.000.000 VND</label>
    </div>
  )
}

export default PlantCard;