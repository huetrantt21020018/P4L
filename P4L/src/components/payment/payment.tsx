import React, { useState } from 'react';
import Cart from "./table2"
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import "./index.css";
import { SearchOutlined } from '@ant-design/icons';

import { Button, Input, Select, Space } from 'antd';
import '../../../src/index2.css';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Header, Content, Footer, Sider } = Layout;

export default function Payment() {
  const [count, setCount] = useState(0);

const decreaseCount = () => {
  if (count > 1)
      setCount(count - 1);
};

const increaseCount = () => {
  setCount(count + 1);
};
  return (
    <div className="container">

      <div className="bottom-200 bg-gray-800 p-10 fixed w-full z-10 top-0 left-0 pb-0 pt-5 h-14">
          <div className="flex flex-row space-x-10 justify-center">   
              {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-12" placeholder="Tìm kiếm..." required></input>
              </div> */}
              {/* <div className="pl-10"> */}
                <Space.Compact style={{width: '1000px', height:"40px"}}>
                  <Input placeholder="Tìm đơn hàng theo Tên sản phẩm" />
                  <Button type="primary" style={{height:"40px"}}>Tìm đơn hàng</Button>
                </Space.Compact>
                <Link to="/" className="">
                  <svg className="h-10 w-10 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                </Link>
              {/* </div> */}
              {/* <div>
                <Link to="/">
                <svg className="text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
              </Link>
              </div> */}
              
          </div>
      </div>

      {/* <div className="blackRectangle">

      </div> */}

      <div className="absolute left-10 w-[96%]">
        <h1 className="mb-5 text-left text-2xl font-bold pt-20">Giỏ hàng</h1>

        <div className="md:flex w-full">
          <div className="md:w-3/4">
            <Cart></Cart>
          </div>


          {/* khung thanh toán */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/4">
            <h1 className="text-2xl font-semibold capitalize">
              Thanh toán
            </h1>

            <div className="mt-6 mb-2 flex justify-between">
              <p className="text-gray-700 text-base">Họ tên khách hàng</p>
              <p className="text-gray-700 font-semibold text-base">Nguyễn Văn A</p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 text-base">Địa chỉ</p>
              <p className="text-gray-700 font-semibold text-base">144 Xuân Thuỷ, Cầu Giấy, Hà Nội</p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 text-base">Phương thức thanh toán</p>
              <p className="text-gray-700 font-semibold text-base">Tiền mặt</p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 text-base">Tổng tiền hàng</p>
              <p className="text-gray-700 font-semibold text-base">123.000</p>
            </div>

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 text-base">Giảm giá</p>
              <p className="text-gray-700 font-semibold text-base">0</p>
            </div>

            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-bold text-lg">Tổng thanh toán</p>
              <div className="">
                <p className="mb-1 font-bold text-lg">123.000</p>
                <p className="text-sm text-gray-700">(đã bao gồm VAT nếu có)</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Mua hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}