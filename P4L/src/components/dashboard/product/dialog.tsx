import {Form, Input, InputNumber, Modal, notification, Select} from 'antd';
import {Product, Stock} from '../../../api/types';
import {useState, useEffect} from "react";
import {ProductApi} from "../../../api/api2/product";
import {useLoginState} from "../../../hooks/loginState";
import {StockApi} from "../../../api/api2/stock";

function ProductDialog({ open, onClose, id } : { open: boolean, onClose?: (hasChange: boolean) => void, id: number }) {
  let [list, setProductList] = useState<Product[]>([]);
  let [loading, setLoading] = useState(false);

  let [productId, setProductId] = useState<number | null>(null);
  let [count, setCount] = useState(0);
  let [description, setDescription] = useState('');
  let [state, user, token] = useLoginState();

  let [noti, notiContextHolder] = notification.useNotification();
  let [originalEntity, setOriginalEntity] = useState<Stock | null>(null);

  useEffect(() => {
    let api = new ProductApi('');
    api.list()
      .then(r => {
        if (r.success) {
          setProductList(r.data);
        }
      })
  }, [])

  useEffect(() => {
    if (!id) {
      setCount(0);
      setDescription('');
      setProductId(null);
    } else {
      let stock = new StockApi(token);
      stock.getDetail(id)
        .then(rs => {
          if (rs.success) {
            let d = rs.data;
            setOriginalEntity(d);
            setCount(d.count);
            setDescription(d.description);
            setProductId(d.productId);
          }
        })
    }
  }, [id, token])

  return (
    <>
      {notiContextHolder}
      <Modal
        title={"Thêm lô hàng mới"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let s = new StockApi(token);

          let p = id
            ? s.put(id, {
              ...originalEntity,
              description,
              count,
              productId
            })
            : s.postStock({
              description, count, productId
            });

          p.then(rs => {
            if (rs.success) {
              noti.success({ message: 'Thêm lô hàng mới thành công' });
              onClose?.(true);
            } else {
              noti.error({ message: rs.error })
            }
          })
            .catch(() => {
              noti.error({ message: 'Có lỗi xảy ra' });
            })
            .finally(() => {
              setLoading(false);
            })
        }}
        okButtonProps={{ loading: loading, disabled: count < 1 || !productId }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <div>Mặt hàng</div>
          <div>
            <Select
              className={"w-full"}
              options={list.map(r => ({
                value: r.id,
                label: r.name
              }))}
              value={productId}
              onChange={setProductId}
            />
          </div>

          <div>Số lượng</div>
          <div>
            <InputNumber min={0} value={count} onChange={e => setCount(+e)} />
          </div>

          <div>Ghi chú</div>
          <div>
            <Input placeholder={"Ghi chú"} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

        </div>
      </Modal>
    </>
  )
}

export default ProductDialog;
