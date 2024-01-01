import {useEffect, useMemo, useState} from "react";
import User from "../../../types/user";
import {useLoginState} from "../../../hooks/loginState";
import { UserApi } from "../../../api/api2/user";
import {Button, notification, Popconfirm, Table, Tag} from "antd";
import {Role} from "../../../types/role";
import {DeleteOutlined, EditOutlined, ShoppingCartOutlined, TeamOutlined, UnlockOutlined} from "@ant-design/icons";
import UserDetailDialog from "./edit_detail_dialog";
import RoleDialog from "./role_dialog";
import EditDialog from "./edit_dialog";

function UserDashboard() {
  let [users, setUsers] = useState<User[]>()
  let [state, user, token] = useLoginState();
  let [noti, notiContextHolder] = notification.useNotification();
  let [loading, setLoading] = useState(false);
  let [id, setId] = useState(0);
  let [dialog, setDialog] = useState(0);

  let load = useMemo(() => {
    return () => {
      let api = new UserApi(token);

      setLoading(true);
      api.list()
        .then(rs => {
          if (rs.success) {
            setUsers(rs.data);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    };
  }, [token]);

  useEffect(() => {
    load();
  }, [token])

  let columns = [
    {
      title: 'Tên đăng nhập',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Thời gian tạo',
      key: 'creationTime',
      dataIndex: 'creationTime',
      render: (t: string) => <>{new Date(t).toLocaleString('vi-VN')}</>
    },
    {
      title: 'Vai trò',
      key: 'roles',
      dataIndex: 'roles',
      render: (r: Role[]) => (
        <div className={"flex flex-row gap-1"}>
          {r?.map((tag) => (
            <Tag key={tag.id} icon={
              tag.isAdmin
                ? <UnlockOutlined />
                : (tag.isStockManager ? <ShoppingCartOutlined /> : null)
            }>
              {tag.name}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <>
            <div className={"flex flex-row gap-2"}>
              <Popconfirm
                title={"Chỉnh sửa người dùng..."}
                okText={"Thông tin"}
                cancelText={"Đăng nhập/Mật khẩu"}
                placement={"bottom"}
                onConfirm={() => {
                  setDialog(2);
                  setId(id);
                }}
                onCancel={() => {
                  setDialog(3);
                  setId(id);
                }}>
                <Button>
                  <EditOutlined />
                </Button>
              </Popconfirm>

              <Button onClick={() => {
                setDialog(1);
                setId(id);
              }}>
                <TeamOutlined />
              </Button>
              <Popconfirm
                title={"Xóa người dùng"}
                description={"Bạn muốn xóa người dùng này?"}
                okText={"Xác nhận"}
                cancelText={"Hủy"}
                placement={"bottom"}
                showCancel={false}
                onConfirm={() => {
                  let stockApi = new UserApi(token);
                  setLoading(true);

                  stockApi.delete(id)
                    .then(rs => {
                      if (rs.success) {
                        noti.success({ message: 'Xóa người dùng thành công' });
                        load();
                      } else {
                        noti.error({ message: rs.error });
                        setLoading(false);
                      }
                    })
                    .catch(() => {
                      noti.error({ message: 'Có lỗi xảy ra' });
                      setLoading(false);
                    });
                }}>
                <Button>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </div>
          </>
        )
      }
    }
  ]

  return (
    <>
      {notiContextHolder}
      <div>
        <Button type={"primary"} onClick={() => {
          setDialog(3);
          setId(0);
        }}>
          Thêm người dùng mới
        </Button>
      </div>
      <Table dataSource={users} columns={columns} loading={loading} />
      <UserDetailDialog id={id} open={dialog === 2} onClose={(change) => {
        setDialog(0);
        setId(0);
        if (change) {
          load();
        }
      }} />
      <RoleDialog id={id} open={dialog === 1} onClose={(change) => {
        setDialog(0);
        setId(0);
        if (change) {
          load();
        }
      }} />

      <EditDialog id={id} open={dialog === 3} onClose={(change) => {
        setDialog(0);
        setId(0);
        if (change) {
          load();
        }
      }} />
    </>
  )
}

export default UserDashboard;
