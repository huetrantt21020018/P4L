import { Select, Input, Steps, Divider, Button } from "antd";
import "./index.css";
import FloatLabel from "../../components/float_lable/";
import PlantCard from "../../components/plant_card"

import React, { useState } from "react";
import {getCountryList, getProvinceList, getCityList, getDistrictList, getStreetList, getPaymentMethod} from "./get_data";

const CheckoutTimeLine = () => {
  return (
    <Steps className="time-line"
      progressDot
      current={1}
      size="small"
      items={[
        {
          title: 'Mua sắm',
        },
        {
          title: 'Đặt hàng',
        },
        {
          title: 'Xác nhận',
        },
      ]}
    />
  )
}

const ContactForm = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <div style={{paddingTop: "30px", paddingLeft: "50px", paddingRight: "50px"}}>
      <label style={{padding: "10px", fontSize: "25px", fontWeight: "bold"}}>Liên hệ</label>
        <FloatLabel label="Email" name="email" value={email}>
          <Input className="text-box" value={email} onChange={e => setEmail(e.target.value)} />
        </FloatLabel>
      </div>
    </>
  )
}

const HalfSelectButton = (props) => {
  return (
    <div className="card2">
      <FloatLabel label={props.label} name={props.name} value={props.value}>
        <Select style={{height: "60px", width: "100%"}}
          defaultValue=""
          onChange={e => props.onChange(e)}
          options={
            props.getData()
          }
        />
      </FloatLabel>
    </div>
  )
}

const AddressForm = () => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  
  return (
    <div className="space-y-px">
      <div style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
        <label style={{padding: "10px", paddingBottom: "20px", fontSize: "25px", fontWeight: "bold"}}>Địa chỉ giao hàng</label>
        <FloatLabel label="Quốc gia" name="country" value={country}>
          <Select style={{height: "60px", width: "100%"}}
            defaultValue=""
            onChange={e => setCountry(e)}
            options={
              getCountryList()
            }
          />
        </FloatLabel>
      </div>
      
      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px", height: "fit-content"}}>
        <HalfSelectButton label="Tỉnh" name="province"
          value={province} onChange={setProvince} getData={getProvinceList}/>
        <HalfSelectButton label="Thành phố" name="city" 
          value={city} onChange={setCity} getData={getCityList}/>
      </div>

      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px"}}>
        <HalfSelectButton label="Quận" name="district" 
          value={district} onChange={setDistrict} getData={getDistrictList}/>
        <HalfSelectButton label="Đường" name="city" 
          value={street} onChange={setStreet} getData={getStreetList}/>
      </div>
      
      <div style={{paddingLeft: "50px", paddingRight: "50px"}}>
        <FloatLabel label="Địa chỉ khác" name="extraAddress" value={extraAddress}>
          <Input className="text-box" value={extraAddress} onChange={e => setExtraAddress(e.target.value)} />
        </FloatLabel>
      </div>

      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px"}}>
        <div className="card2">
          <div style={{height: "60px"}}>
            <FloatLabel label="Số điện thoại" name="phoneNumber" value={phoneNumber}>
              <Input className="text-box" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </FloatLabel>
          </div>
        </div>
        <HalfSelectButton label="Phương thức thanh toán" name="paymentMethod" 
          value={paymentMethod} onChange={setPaymentMethod} getData={getPaymentMethod}/>
      </div>

      <div style={{paddingRight: "50px"}}>
        <Button style={{float: "right", height: "60px", width: "180px", 
                        backgroundColor: "#B9E4D5"}}>Xác nhận</Button>
      </div>
    </div>
  )
}

const RightHeader = () => {
  return (
    <div>
      <div>
        <label style={{fontWeight: "bold", fontSize: "25px"}}>30 Day guarantee</label>
      </div>
      <div>
        <label style={{fontSize: "22px"}}>Cây trồng và hạt giống sẽ được bảo quản trong điều kiện tốt nhất khi đang giao. Nếu không, chúng tôi cam kết sẽ thay thế hoàn toàn miễn phí.</label>
      </div>
    </div>
  )
}

const Cost = (props) => {
  return (
    <div>
      <div>
        <label style={{fontSize: "22px"}}>Giá sản phẩm</label>
        <label style={{fontSize: "20px", position: "absolute", right:"220px"}}>24.000.000 VND</label>
      </div>
      <div style={{paddingTop: "20px"}}>
        <label style={{fontSize: "22px"}}>Giá vận chuyển</label>
        <label style={{fontSize: "20px", position: "absolute", right:"220px"}}>Bước tiếp theo</label>
      </div>
    </div>
  )
}

const Checkout = () => {
  return (
    <div className="app">
      <div className="card"> 
        <CheckoutTimeLine/>
        <ContactForm/>
        <AddressForm/>
      </div>
      <div className="card">
        <RightHeader/>
        <div style={{width: "550px"}}>
          <div>
            <PlantCard/>
          </div>
          <div>
            <PlantCard/>
          </div>
          <div>
            <PlantCard/>
          </div>
          <Divider style={{ borderWidth: 3}}/>
          <Cost/>
          <Divider style={{ borderWidth: 3}}/>
          <div>
            <label style={{fontSize: "22px", fontWeight: "bold"}}>Tổng tiền</label>
            <label style={{fontSize: "20px", position: "absolute", right:"220px", fontWeight: "bold"}}>24.000.000 VND</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;