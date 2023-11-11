import ReactDOM from "react-dom";
import { Table } from "antd";
import React, { useState } from 'react';

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    render: (text) => <a href="#">{text}</a>
  },
  {
    title: "Đơn giá",
    dataIndex: "price"
  },
  {
    title: "Số lượng",
    dataIndex: "quantity"
  },
  {
    title: "Thành tiền",
    dataIndex: "into_money"
  }
];

const data = [
  {
    key: "1",
    name: "Cây cam",
    price: 130000,
    quantity: 1,
    into_money: 130000
  },
  {
    key: "1",
    name: "Cây táo",
    price: 150000,
    quantity: 1,
    into_money: 150000
  },
  {
    key: "1",
    name: "Cây quýt",
    price: 140000,
    quantity: 1,
    into_money: 140000
  },
  {
    key: "1",
    name: "Cây bưởi",
    price: 120000,
    quantity: 1,
    into_money: 120000
  }
];

class Cart extends React.Component {
  state = {
    selectedRowKeys: []
  };
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  };
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };
    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            this.selectRow(record);
          }
        })}
      />
    );
  }
}

export default Cart;
// createRoot(document.getElementById('container')).render(<Card />);