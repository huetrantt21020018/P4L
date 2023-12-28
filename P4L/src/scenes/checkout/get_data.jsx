import PlantCard from "../../components/plant_card";
import React, { useState } from "react";

export var getCountryList = function() {
  return [
    { value: 'VNM', label: 'Việt Nam' },
    { value: 'USA', label: 'Mỹ' },
    { value: 'JAN', label: 'Nhật Bản' },
    { value: 'KOR', label: 'Hàn Quốc' },
  ];
};

export var getProvinceList = function() {
  return [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'ĐN', label: 'Đà Nẵng' },
  ];
};

export var getCityList = function() {
  return [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'ĐN', label: 'Đà Nẵng' },
  ];
}

export var getDistrictList = function() {
  return [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'ĐN', label: 'Đà Nẵng' },
  ];
};

export var getStreetList = function() {
  return [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'ĐN', label: 'Đà Nẵng' },
  ];
};

export var getPaymentMethod = function() {
  return [
    { value: 'HN', label: 'Hà Nội' },
  ];
};

function createPlantCard(data) {
  return <PlantCard url={data.url} name={data.name} price={data.price} quantity={data.quantity} into_money={data.into_money}/>
};

export var createPlantCards = function(data) {
  return data.map(createPlantCard);
};

export var getCartData = function(props) {
  return [
    {
      url: '',
      name: 'Large Peace Lily',
      price: '6.500.000 VND',
      quantity: 2,
      into_money: '13.000.000 VND'
    },
    {
      url: '',
      name: 'Pallasplanter cỡ lớn',
      price: '4.500.000 VND',
      quantity: 1,
      into_money: '4.500.000 VND'
    },
    {
      url: '',
      name: 'Large Peace Lily',
      price: '6.500.000 VND',
      quantity: 1,
      into_money: '6.500.000 VND'
    },
  ]
};

export var getCartTotalValue = function(props) {
  return "24.000.000 VND";
};

export var getCartShippingCost = function(props) {
  return "Bước tiếp theo";
};

export var getCartTotalValueAndShippingCost = function(props) {
  return "26.400.000 VND";
};

export class UserDataForm {
  constructor() {
    this.step = 1;
    [this.email, this.setEmail] = useState("");
    [this.country, this.setCountry] = useState("");
    [this.province, this.setProvince] = useState("");
    [this.city, this.setCity] = useState("");
    [this.district, this.setDistrict] = useState("");
    [this.street, this.setStreet] = useState("");
    [this.extraAddress, this.setExtraAddress] = useState("");
    [this.phoneNumber, this.setPhoneNumber] = useState("");
    [this.paymentMethod, this.setPaymentMethod] = useState("");
  }

  nextStep() {
    console.log("aaaa");
    if (this.step == 2) {
      return;
    }
    this.step = 2;
  }
}