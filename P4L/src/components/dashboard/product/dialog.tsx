import {Form, Input, InputNumber, Modal, notification, Select} from 'antd';
import {Product, ProductType, Stock} from '../../../api/types';
import {useState, useEffect} from "react";
import {ProductApi} from "../../../api/api2/product";
import {useLoginState} from "../../../hooks/loginState";
import {StockApi} from "../../../api/api2/stock";
import {ProductTypeApi} from "../../../api/api2/product_type";

function ProductDialog({ open, onClose, id } : { open: boolean, onClose?: (hasChange: boolean) => void, id: number }) {
  let [types, setProductTypeList] = useState<ProductType[]>([]);
  let [state, user, token] = useLoginState();
  let [loading, setLoading] = useState(false);

  let [name, setName] = useState('');
  let [type, setType] = useState(null);
  let [desc, setDesc] = useState('');
  let [clim_desc, setClim] = useState('');
  let [_yield, setYield] = useState('');
  let [growing_season, setSeason] = useState(null);
  let [duration, setDuration] = useState(null);
  let [price, setPrice] = useState(0);


  let [noti, notiContextHolder] = notification.useNotification();
  let [originalEntity, setOriginalEntity] = useState<Product | null>(null);

  useEffect(() => {
    let api = new ProductTypeApi('');
    api.list()
      .then(r => {
        if (r.success) {
          setProductTypeList(r.data);
        }
      })
  }, [])

  useEffect(() => {
    if (!id) {
      setName('');
      setType(0);
      setDesc('');
      setClim('');
      setYield('');
      setSeason(0);
      setDuration(0);
      setPrice(0);
    } else {
      let stock = new ProductApi(token);
      stock.getDetail(id)
        .then(rs => {
          if (rs.success) {
            let d = rs.data;
            setOriginalEntity(d);
            setName(d.name);
            setType(d.productTypeId);
            setDesc(d.description);
            setClim(d.climateDescription);
            setYield(d.yield);
            setSeason(d.growingSeason);
            setDuration(d.plantingDuration);
            setPrice(d.price);
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
          let s = new ProductApi(token);

          let p = id
            ? s.put(id, {
              ...originalEntity,
              name, productTypeId: type, description: desc, climateDescription: clim_desc, yield: _yield,
              growingSeason: growing_season, plantingDuration: duration, price
            })
            : s.post({
              name, productTypeId: type, description: desc, climateDescription: clim_desc, yield: _yield,
              growingSeason: growing_season, plantingDuration: duration, price
            } as Product);

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
        okButtonProps={{ loading: loading, disabled: !price || !type || !growing_season || !duration || !name }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <div>Tên mặt hàng</div>
          <div>
            <Input placeholder={"Tên mặt hàng"} value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>Loại</div>
          <div>
            <Select
              className={"w-full"}
              options={types.map(r => ({ value: r.id,  label: r.name }))}
              value={type}
              onChange={setType}
            />
          </div>

          <div>Giá</div>
          <div>
            <InputNumber min={0} value={price} onChange={e => setPrice(+e)} />
          </div>

          <div>Mô tả</div>
          <div>
            <Input placeholder={"Ghi chú"} value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div>Mô tả khí hậu</div>
          <div>
            <Input placeholder={"Khí hậu"} value={clim_desc} onChange={(e) => setClim(e.target.value)} />
          </div>

          <div>Mô tả năng suất</div>
          <div>
            <Input placeholder={"Năng suất"} value={_yield} onChange={(e) => setYield(e.target.value)} />
          </div>

          <div>Thời vụ</div>
          <div>
            <Select
              className={"w-full"}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(a => ({ value: a, label: 'Tháng ' + a }))}
              value={growing_season}
              onChange={setSeason}
            />
          </div>

          <div>Thời gian trồng (tuần)</div>
          <div>
            <InputNumber min={0} value={duration} onChange={e => setDuration(+e)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductDialog;
