import {useEffect, useState} from "react";
import {Role, UserToRole} from "../../../api/types";
import {useLoginState} from "../../../hooks/loginState";
import {Checkbox, DatePicker, Input, InputNumber, Modal, notification, Select} from "antd";
import {LoginState} from "../../../types/loginState";
import {UserApi} from "../../../api/api2/user";
import {UserDetail} from "../../../types/userDetail";
import {UserDetailApi} from "../../../api/api2/user_detail";
import * as dayjs from 'dayjs';

function UserDetailDialog({ open, id, onClose } : { open: boolean, id: number, onClose?: (change: boolean) => void }) {
  let [roles, setRoles] = useState<Role[]>([]);
  let [loading, setLoading] = useState(false);
  let [s, u, token] = useLoginState();
  let [noti, notiContextHolder] = notification.useNotification();
  let [original, setOriginal] = useState<UserDetail | null>(null);

  let [email, setEmail] = useState('');
  let [dob, setDob] = useState(new Date());
  let [phone, setPhone] = useState('');
  let [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (s !== LoginState.LoggedIn) return;

    setLoading(true);
    let a = new UserApi(token);

    a.getDetail(id)
      .then(rs => {
        if (rs.success) {
          setOriginal(rs.data.detail);

          let d = rs.data.detail;
          setEmail(d?.email);
          setDob(new Date(d?.dateOfBirth));
          setPhone(d?.phoneNumber);
          setAvatar(d?.avatarUrl);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [token, id]);

  return (
    <>
      {notiContextHolder}
      <Modal
        title={"Chỉnh sửa thông tin người dùng"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let s = new UserDetailApi(token);

          let p = s.put(id, {
              ...original,
              email,
              dateOfBirth: dob.toJSON(),
              phoneNumber: phone,
              avatarUrl: avatar
            })

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
        okButtonProps={{ loading: loading, disabled: loading }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <div>Email</div>
          <div>
            <Input placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>Số điện thoại</div>
          <div>
            <Input placeholder={"SĐT"} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>Link đến avatar</div>
          <div>
            <Input placeholder={"Avatar"} value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>

          <div>Ngày sinh</div>
          <div>
            <DatePicker value={dayjs(dob)} onChange={e => setDob(e.toDate())} />
          </div>

        </div>
      </Modal>
    </>
  )
}

export default UserDetailDialog;
