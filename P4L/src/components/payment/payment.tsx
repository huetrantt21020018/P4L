import React, { useState } from 'react';
import Card from "./table"
import { Breadcrumb, Layout, Menu, theme } from 'antd';

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
    <div className="pt-20"><div className="bottom-200 bg-gray-800 p-10 fixed w-full z-10 top-0 left-0"></div><div className="md:flex">

      <div className="md:w-3/4">
        <Card></Card>
      </div>


      {/* khung thanh toán */}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <h1 className="text-2xl font-semibold capitalize">
          Thanh toán
        </h1>

        <div className="mt-6 mb-2 flex justify-between">
          <p className="text-gray-700">Họ tên khách hàng</p>
          <p className="text-gray-700 font-semibold">Nguyễn Văn A</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Địa chỉ</p>
          <p className="text-gray-700 font-semibold">144 Xuân Thuỷ, Cầu Giấy, Hà Nội</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Phương thức thanh toán</p>
          <p className="text-gray-700 font-semibold">Tiền mặt</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Tổng tiền hàng</p>
          <p className="text-gray-700 font-semibold">123.000</p>
        </div>

        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Giảm giá</p>
          <p className="text-gray-700 font-semibold">0</p>
        </div>

        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Tổng thanh toán</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">123.000</p>
            <p className="text-sm text-gray-700">(đã bao gồm VAT nếu có)</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Mua hàng</button>
      </div>

    </div></div>
  );
}