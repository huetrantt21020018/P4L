import {useEffect, useState} from "react";
import {useLoginState} from "../../../hooks/loginState";
import {StockApi} from "../../../api/api2/stock";
import {OrderApi} from "../../../api/api2/order";
import {Order, Product} from "../../../api/types";
import {Input, InputNumber, Modal, Select, Table} from "antd";

function OrderDialog({ open, onClose, id } : { open: boolean, onClose?: (hasChange: boolean) => void, id: number }) {
  let [loading, setLoading] = useState(false);
  let [state, user, token] = useLoginState();
  let [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) {
      setOrder(null);
    } else {
      setLoading(true);
      let stock = new OrderApi(token);
      stock.getDetail(id)
        .then(rs => {
          if (rs.success) {
            let d = rs.data;
            setOrder(d);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [id, token])

  let columns = [
    {
      title: 'Mặt hàng',
      key: 'name',
      dataIndex: 'product',
      render(p?: Product) {
        return p?.name;
      }
    },
    {
      title: 'Số lượng',
      key: 'count',
      dataIndex: 'count',
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'product',
      render(p?: Product) {
        let f = new Intl.NumberFormat('vi-VN');
        return f.format(p?.price);
      }
    },
    {
      title: 'Thành tiền',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      render(t?: number) {
        let f = new Intl.NumberFormat('vi-VN');
        return f.format(t);
      }
    },
  ]

  let content = (
    <>
      <Table dataSource={order?.detail ?? []} columns={columns} loading={loading}>

      </Table>
    </>
  )

  return (
    <>
      <Modal
        title={"Thông tin đơn hàng"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        okButtonProps={{ className: "hidden" }}
        cancelButtonProps={{ className: "hidden" }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <b>Quốc gia</b>
          <div>{order?.country}</div>
          <b>Tỉnh</b>
          <div>{order?.province}</div>
          <b>Thành phố/Quận</b>
          <div>{order?.city}</div>
          <b>Phường</b>
          <div>{order?.ward}</div>
          <b>Đường</b>
          <div>{order?.street}</div>
          <b>Địa chỉ thêm</b>
          <div>{order?.extra}</div>
          <b>Số điện thoại</b>
          <div>{order?.phoneNumber}</div>
        </div>
        <div>
          {order && content}
        </div>
      </Modal>
    </>
  )
}

export default OrderDialog;
