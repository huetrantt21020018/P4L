import {DatePicker, Input, InputNumber, Modal, notification, Select} from "antd";
import {ProductApi} from "../../api/api2/product";
import {Product} from "../../api/types";
import {useState} from "react";
import {useLoginState} from "../../hooks/loginState";
import {PaymentMethodApi} from "../../api/api2/payment_method";
import * as dayjs from 'dayjs';

interface State {
  number: string;
  owner: string;
  expiry: Date;
  verification: string
}

function PaymentMethodDialog({ open, onClose } : { open: boolean, onClose?: (hasChange: boolean) => void }) {
  let [noti, notiContextHolder] = notification.useNotification();
  let [state, user, token] = useLoginState();
  let [loading, setLoading] = useState(false);

  let [s, setS] = useState<State>({
    number: '',
    owner: '',
    expiry: new Date(),
    verification: ''
  })

  return (
    <>
      {notiContextHolder}
      <Modal
        title={'Thêm phương thức thanh toán mới'}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let a = new PaymentMethodApi(token);

          a.post({
            cardNumber: s.number,
            cardOwner: s.owner,
            cardVerification: s.verification,
            expiry: s.expiry.toJSON(),
            id: 0,
            user_id: 0
          })
            .then(rs => {
            if (rs.success) {
              noti.success({ message: 'Thêm thành công' });
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
        okButtonProps={{ loading: loading, disabled: loading || !s.number || !s.owner || !s.verification }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <div>Số thẻ</div>
          <div>
            <Input placeholder={"Số thẻ"} value={s.number}
                   onChange={(e) => setS({
                    ...s,
                    number: e.target.value
                  })} />
          </div>
          <div>Chủ thẻ</div>
          <div>
            <Input placeholder={"Chủ thẻ"} value={s.owner}
                   onChange={(e) => setS({
                     ...s,
                     owner: e.target.value
                   })}/>
          </div>
          <div>Hết hạn</div>
          <div>
            <DatePicker value={dayjs(s.expiry)} picker={"month"} onChange={(e) => {
              setS({
                ...s,
                expiry: e.toDate()
              })
            }} />
          </div>
          <div>Mã CVV</div>
          <div>
            <Input placeholder={"Mã CVV"} value={s.verification}
                   onChange={(e) => setS({
                     ...s,
                     verification: e.target.value?.slice(0, 3) ?? ''
                   })}/>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PaymentMethodDialog;
