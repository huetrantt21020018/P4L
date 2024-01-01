import {useEffect, useState} from "react";
import User from "../../../types/user";
import {useLoginState} from "../../../hooks/loginState";
import {StockApi} from "../../../api/api2/stock";
import {UserApi} from "../../../api/api2/user";
import {Input, InputNumber, Modal, notification, Select} from "antd";
import {AuthApi} from "../../../api/api2/auth";

function EditDialog({ open, id, onClose } : { open: boolean, id: number, onClose?: (change: boolean) => void }) {
  let [loading, setLoading] = useState(false);
  let [originalEntity, setOriginalEntity] = useState<User | null>(null);
  let [noti, notiContextHolder] = notification.useNotification();

  let [state, user, token] = useLoginState();

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [name, setName] = useState('');


  useEffect(() => {
    if (!id) {
      setOriginalEntity(null);
      setName('');
      setPassword('');
      setUsername('');
    } else {
      let api = new UserApi(token);
      api.getDetail(id)
        .then(rs => {
          if (rs.success) {
            let d = rs.data;
            setOriginalEntity(d);
            setUsername(d.username);
            setPassword('');
            setName(d.name);
          }
        })
    }
  }, [id, token])

  return (
    <>
      {notiContextHolder}
      <Modal
        title={id ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let user = new UserApi(token);
          let auth = new AuthApi();

          let p = id
            ? user.put(id, {
              ...originalEntity,
              username: username,
              password: password ? password : '',
              name: name
            })
            : auth.register(username, password, name);

          p.then(rs => {
            if (rs.success) {
              noti.success({ message: !id ? 'Thêm người dùng mới thành công' : 'Chỉnh sửa người dùng thành công' });
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
        okButtonProps={{ loading: loading, disabled: (id && (!username || !name)) || (!id && (!username || !password)) }}
        cancelButtonProps={{ disabled: loading }}>
        <div className={"grid grid-cols-2 gap-y-6"}>
          <div>Tên đăng nhập</div>
          <div>
            <Input placeholder={"Tên đăng nhập"} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div>Mật khẩu</div>
          <div>
            <Input placeholder={"Mật khẩu"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>Tên hiển thị</div>
          <div>
            <Input placeholder={"Tên hiển thị"} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditDialog;
