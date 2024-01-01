import {Role, UserToRole} from "../../../api/types";
import {Fragment, useEffect, useState} from "react";
import {useLoginState} from "../../../hooks/loginState";
import {LoginState} from "../../../types/loginState";
import {UserToRoleApi} from "../../../api/api2/user_to_role";
import {Checkbox, Modal, notification} from "antd";
import {ProductApi} from "../../../api/api2/product";
import {RoleApi} from "../../../api/api2/role";
import {UserApi} from "../../../api/api2/user";

function RoleDialog({ open, id, onClose } : { open: boolean, id: number, onClose?: (change: boolean) => void }) {
  let [roleMapping, setRoleMapping] = useState<UserToRole[]>([]);
  let [roles, setRoles] = useState<Role[]>([]);
  let [loading, setLoading] = useState(false);
  let [pt, setAssignedRoles] = useState<number[]>([]);
  let [s, u, token] = useLoginState();
  let [noti, notiContextHolder] = notification.useNotification();

  useEffect(() => {
    let r = new RoleApi(token);

    r.list()
      .then(rs => {
        if (rs.success) {
          setRoles(rs.data);
        }
      })
  }, [token]);

  useEffect(() => {
    if (s !== LoginState.LoggedIn) return;
    if (!id) return;

    setLoading(true);
    let a = new UserToRoleApi(token);

    a.listByUserId(id)
      .then(rs => {
        if (rs.success) {
          setRoleMapping(rs.data);
          setAssignedRoles(rs.data.map(r => r.roleId));
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
        title={"Chỉnh sửa vai trò người dùng"}
        open={open}
        onCancel={() => {
          onClose?.(false);
        }}
        onOk={() => {
          setLoading(true);
          let s = new UserApi(token);

          s.setRole(id, pt).then(rs => {
            if (rs.success) {
              noti.success({ message: `Chỉnh sửa vai trò thành công` });
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
          {roles.map(r => {
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
                    setAssignedRoles([...s]);
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

export default RoleDialog;
