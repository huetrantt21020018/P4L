import {useEffect, useState, Fragment} from "react";
import {Product, Stock} from "../../../api/types";
import {useLoginState} from "../../../hooks/loginState";
import {Input, InputNumber, Modal, notification, Select, Checkbox} from "antd";
import {ProductApi} from "../../../api/api2/product";
import {Tag} from '../../../api/types';
import {ProductTagApi} from "../../../api/api2/product_tag";

function ProductTagDialog({ open, onClose, id } : { open: boolean, onClose?: (hasChange: boolean) => void, id: number }) {
  let [loading, setLoading] = useState(false);
  let [product, setProduct] = useState<Product | null>(null);
  let [pt, setPt] = useState<number[]>([]);
  let [state, user, token] = useLoginState();
  let [noti, notiContextHolder] = notification.useNotification();
  let [tagList, setTagList] = useState<Tag[]>([]);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
    }

    setLoading(true);
    let api = new ProductApi('');
    api.getDetail(id)
      .then(r => {
        if (r.success) {
          setProduct(r.data);
          setPt(r.data.productTags.map(a => a.id));
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  useEffect(() => {
    let api = new ProductTagApi('');
    api.list()
      .then(r => {
        if (r.success) {
          setTagList(r.data);
        }
      })
  }, []);

  return (
    <>
      {notiContextHolder}
      <Modal
        title={"Chỉnh sửa thẻ của mặt hàng"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let s = new ProductApi(token);

          s.setTag(id, pt).then(rs => {
            if (rs.success) {
              noti.success({ message: `Chỉnh sửa thẻ của ${product?.name} thành công` });
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
        okButtonProps={{ loading: loading, disabled: loading }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          {tagList.map(r => {
            return (
              <Fragment key={r.id}>
                <div>
                  {r.name}
                </div>
                <div>
                  <Checkbox checked={pt.includes(r.id)} onChange={(v) => {
                    let s = new Set(pt);
                    if (v.target.checked) {
                      s.add(r.id);
                    } else {
                      s.delete(r.id);
                    }
                    // @ts-ignore
                    setPt([...s]);
                  }} />
                </div>
              </Fragment>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export default ProductTagDialog;
