import { Select, Input, Steps, Divider, Button } from "antd";
import "./index.css";
import FloatLabel from "../../components/float_lable/";

import React, { useState } from "react";
import {getCountryList, getProvinceList, getCityList, getDistrictList, getStreetList, getPaymentMethod, createPlantCards, 
  getCartData, getCartTotalValue, getCartShippingCost, getCartTotalValueAndShippingCost, UserDataForm} from "./get_data";

var userDataForm;

const CheckoutTimeLine = () => {
  return (
    <Steps className="time-line"
      progressDot
      current={userDataForm.step}
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
  return (
    <>
      <div style={{paddingTop: "30px", paddingLeft: "50px", paddingRight: "50px"}}>
      <label style={{padding: "10px", fontSize: "25px", fontWeight: "bold"}}>Liên hệ</label>
        <FloatLabel label="Email" name="email" value={userDataForm.email}>
          <Input className="text-box" value={userDataForm.email} onChange={e => userDataForm.setEmail(e.target.value)} />
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

  return (
    <div className="space-y-px">
      <div style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
        <label style={{padding: "10px", paddingBottom: "20px", fontSize: "25px", fontWeight: "bold"}}>Địa chỉ giao hàng</label>
        <FloatLabel label="Quốc gia" name="country" value={userDataForm.country}>
          <Select style={{height: "60px", width: "100%"}}
            defaultValue=""
            onChange={e => userDataForm.setCountry(e)}
            options={
              getCountryList()
            }
          />
        </FloatLabel>
      </div>
      
      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px", height: "fit-content"}}>
        <HalfSelectButton label="Tỉnh" name="province"
          value={userDataForm.province} onChange={userDataForm.setProvince} getData={getProvinceList}/>
        <HalfSelectButton label="Thành phố" name="city" 
          value={userDataForm.city} onChange={userDataForm.setCity} getData={getCityList}/>
      </div>

      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px"}}>
        <HalfSelectButton label="Quận" name="district" 
          value={userDataForm.district} onChange={userDataForm.setDistrict} getData={getDistrictList}/>
        <HalfSelectButton label="Đường" name="city" 
          value={userDataForm.street} onChange={userDataForm.setStreet} getData={getStreetList}/>
      </div>
      
      <div style={{paddingLeft: "50px", paddingRight: "50px"}}>
        <FloatLabel label="Địa chỉ khác" name="extraAddress" value={userDataForm.extraAddress}>
          <Input className="text-box" value={userDataForm.extraAddress} onChange={e => userDataForm.setExtraAddress(e.target.value)} />
        </FloatLabel>
      </div>

      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px"}}>
        <div className="card2">
          <div style={{height: "60px"}}>
            <FloatLabel label="Số điện thoại" name="phoneNumber" value={userDataForm.phoneNumber}>
              <Input className="text-box" value={userDataForm.phoneNumber} onChange={e => userDataForm.setPhoneNumber(e.target.value)} />
            </FloatLabel>
          </div>
        </div>
        <HalfSelectButton label="Phương thức thanh toán" name="paymentMethod" 
          value={userDataForm.paymentMethod} onChange={userDataForm.setPaymentMethod} getData={getPaymentMethod}/>
      </div>

      <div style={{paddingRight: "50px"}}>
        <Button style={{float: "right", height: "60px", width: "180px", 
                        backgroundColor: "#B9E4D5"}} onClick={() => userDataForm.nextStep()}>Xác nhận</Button>
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
  var totalCost = getCartTotalValue(props);
  var shippingCost = getCartShippingCost(props);

  return (
    <div>
      <div>
        <label style={{fontSize: "22px"}}>Giá sản phẩm</label>
        <label style={{fontSize: "20px", position: "absolute", right:"220px"}}>{totalCost}</label>
      </div>
      <div style={{paddingTop: "20px"}}>
        <label style={{fontSize: "22px"}}>Giá vận chuyển</label>
        <label style={{fontSize: "20px", position: "absolute", right:"220px"}}>{shippingCost}</label>
      </div>
    </div>
  )
}

/*
interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  into_money: number;
}
*/

/*
  Note: Sửa file get_data, ngoài ra cần làm nút xác nhận hoạt động.
*/
const Checkout = (props) => {
  userDataForm = new UserDataForm();
  var data = getCartData(props);
  var totalCost = getCartTotalValueAndShippingCost(props);
  console.log(1);
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
          {createPlantCards(data)}
          <Divider style={{ borderWidth: 3}}/>
          <Cost/>
          <Divider style={{ borderWidth: 3}}/>
          <div>
            <label style={{fontSize: "22px", fontWeight: "bold"}}>Tổng tiền</label>
            <label style={{fontSize: "20px", position: "absolute", right:"220px", fontWeight: "bold"}}>{totalCost}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;