import { Select, Input, Steps, Divider, Button } from "antd";
import "./index.css";
import FloatLabel from "../../components/float_lable/";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getCountryList, getProvinceList, getCityList, getDistrictList, getStreetList, getPaymentMethod, createPlantCards, 
  getCartData, getCartTotalValue, getCartShippingCost, getCartTotalValueAndShippingCost, UserDataForm} from "./get_data";

var userDataForm;

const CheckoutTimeLine = () => {
  return (
    <Steps className="time-line font-opensans"
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
      <label className="text-2xl font-bold" style={{padding: "10px", fontSize: "25px", fontWeight: "bold"}}>Liên hệ</label>
        <div style={{paddingBottom: "10px"}}></div>
        <FloatLabel label="Email" name="email" value={userDataForm.email}>
          <Input
            disabled={userDataForm.step == 2}
            className="text-box text-xl" 
            value={userDataForm.email} 
            onChange={e => userDataForm.setEmail(e.target.value)} />
        </FloatLabel>
      </div>
    </>
  )
}

const HalfSelectButton = (props) => {
  return (
    <div className="card2">
      <FloatLabel label={props.label} name={props.name} value={props.value}>
        <Select style={{height: "60px", width: "100%", fontSize: "50px"}}
          disabled={userDataForm.step == 2}
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

const AddressForm = (props) => {
  const handleClick = () => {
    if (userDataForm.step == 2) {
      props.routeChange()
    }
    userDataForm.nextStep();
  }

  return (
    <div className="space-y-px">
      <div style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
        <label style={{padding: "10px", paddingBottom: "20px", fontSize: "25px", fontWeight: "bold"}}>Địa chỉ giao hàng</label>
        <div style={{paddingBottom: "20px"}}></div>
        <FloatLabel label="Quốc gia" name="country" value={userDataForm.country}>
          <Select style={{height: "60px", width: "100%"}}
            size="medium"
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
          <Input
            disabled={userDataForm.step == 2} 
            className="text-box text-xl" 
            value={userDataForm.extraAddress} 
            onChange={e => userDataForm.setExtraAddress(e.target.value)} />
        </FloatLabel>
      </div>

      <div style={{display: "flex", paddingLeft: "40px", paddingRight: "40px"}}>
        <div className="card2">
          <div style={{height: "60px"}}>
            <FloatLabel label="Số điện thoại" name="phoneNumber" value={userDataForm.phoneNumber}>
              <Input 
                disabled={userDataForm.step == 2}
                className="text-box text-xl" 
                value={userDataForm.phoneNumber} 
                onChange={e => userDataForm.setPhoneNumber(e.target.value)} />
            </FloatLabel>
          </div>
        </div>
        <HalfSelectButton label="Phương thức thanh toán" name="paymentMethod" 
          value={userDataForm.paymentMethod} onChange={userDataForm.setPaymentMethod} getData={getPaymentMethod}/>
      </div>

      <div style={{paddingRight: "50px"}}>
        <Button 
          type="default"
          style={{float: "right", height: "60px", width: "180px", backgroundColor: "#B9E4D5", filter: "drop-shadow(100px 100px red)"}}
          onClick={() => handleClick()}
        >Xác nhận</Button>
      </div>
    </div>
  )
}

const RightHeader = () => {
  return (
    <div>
      <div>
        <label className="text-2xl font-bold">30 Day guarantee</label>
      </div>
      <div>
        <label className="text-xl">Cây trồng và hạt giống sẽ được bảo quản trong điều kiện tốt nhất khi đang giao. Nếu không, chúng tôi cam kết sẽ thay thế hoàn toàn miễn phí.</label>
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
        <label style={{fontSize: "20px", position: "relative", right:"-272px"}}>{totalCost}</label>
      </div>
      <div style={{paddingTop: "20px"}}>
        <label style={{fontSize: "22px"}}>Giá vận chuyển</label>
        <label style={{fontSize: "20px", position: "relative", right:"-265px"}}>{shippingCost}</label>
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
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/success`; 
    navigate(path);
  }
  return (
    <div className="app">
      <div className="card font-opensans"> 
        <CheckoutTimeLine/>
        <ContactForm/>
        <AddressForm routeChange={routeChange}/>
      </div>
      <div className="card font-opensans">
        <RightHeader/>
        <div style={{width: "550px"}}>
          {createPlantCards(data)}
          <Divider style={{ borderWidth: 3}}/>
          <Cost/>
          <Divider style={{ borderWidth: 3}}/>
          <div>
            <label style={{fontSize: "22px", fontWeight: "bold"}}>Tổng tiền</label>
            <label style={{fontSize: "20px", position: "relative", right:"-300px", fontWeight: "bold"}}>{totalCost}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;