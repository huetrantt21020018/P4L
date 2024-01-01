import {useEffect, useMemo, useState} from "react";
import {Order, StatusText} from "../../../api/types";
import {useLoginState} from "../../../hooks/loginState";
import {OrderApi} from "../../../api/api2/order";
import {Button, notification, Popconfirm, Table, Popover} from "antd";
import {LoginState} from "../../../types/loginState";
import OrderDialog from "./dialog";
import {DeleteOutlined, InfoOutlined, EditOutlined} from "@ant-design/icons";

function OrderDashboard() {
  let [list, setList] = useState<Order[]>();
  let [state, user, token] = useLoginState();
  let [noti, notiContextHolder] = notification.useNotification();
  let [loading, setLoading] = useState(false);
  let [dialog, setDialog] = useState(false);
  let [id, setId] = useState(0);

  let load = useMemo(() => {
    return () => {
      let api = new OrderApi(token);
      setLoading(true);
      api.list()
        .then((rs) => {
          if (rs.success) {
            setList(rs.data);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [token]);

  useEffect(() => {
    if (state !== LoginState.LoggedIn)  {
      return;
    }
    load();
  }, [state, token]);

  let columns = [
    {
      title: 'Thời gian',
      key: 'time',
      dataIndex: 'timestamp',
      render(r: string) {
        return new Date(r).toLocaleString('vi-VN')
      }
    },
    {
      title: 'Người dùng',
      key: 'user',
      dataIndex: 'user',
      render(u?: { name: string }) {
        return u.name;
      }
    },
    {
      title: 'Tổng số mặt hàng',
      key: 'detail',
      dataIndex: 'detail',
      render(t: any[]) {
        return new Intl.NumberFormat('vi-VN').format(t.length);
      }
    },
    {
      title: 'Tổng số lượng',
      key: 'detail_count',
      dataIndex: 'detail',
      render(t: { count: number }[]) {
        let total = t.reduce((p, c) => p + c.count, 0);
        return new Intl.NumberFormat('vi-VN').format(total);
      }
    },
    {
      title: 'Tổng số tiền',
      key: 'totalPrice',
      dataIndex: 'totalPrice',
      render(t: number) {
        return new Intl.NumberFormat('vi-VN').format(t);
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render(t: number) {
        return StatusText.find(f => f.status === t)?.text;
      }
    },
    {
      title: '',
      key: 'id',
      dataIndex: 'id',
      render(id: number) {
        let content = (
          <div className={"flex flex-row gap-2"}>
            {StatusText.map(p => {
              return (
                <Button key={p.status}
                      onClick={() => {
                        setLoading(true);
                        let api = new OrderApi(token);

                        let entity = list.find(f => f.id === id);

                        api.put(id, {
                          ...entity,
                        user: null,
                          status: p.status
                        })
                          .then(rs => {
                            if (rs.success) {
                              noti.success({
                                message: 'Thay đổi trạng thái đơn hàng thành công'
                              })
                              load();
                            }
                            else {
                              noti.error({
                                message: rs.error
                              });
                              setLoading(false);
                            }
                          })
                          .catch(() => {
                            noti.error({
                              message: 'Thay đổi trạng thái đơn hàng thất bại'
                            });
                            setLoading(false);
                          })
                      }}>
                  {p.text}
                </Button>
              )
            })}
          </div>
        )

        return (
          <>
            <div className={"flex flex-row gap-2"}>
              <Popover content={content} title={"Thay đổi trạng thái đơn hàng"}>
                <Button>
                  <EditOutlined />
                </Button>
              </Popover>
              <Button onClick={() => {
                setDialog(true);
                setId(id);
              }}>
                <InfoOutlined />
              </Button>
              <Popconfirm
                title={"Xóa đơn hàng"}
                description={"Bạn muốn xóa đơn hàng này?"}
                okText={"Xác nhận"}
                cancelText={"Hủy"}
                placement={"bottom"}
                showCancel={false}
                onConfirm={() => {
                  let api = new OrderApi(token);
                  setLoading(true);

                  api.delete(id)
                    .then(rs => {
                      if (rs.success) {
                        noti.success({ message: 'Xóa đơn hàng thành công' });
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
      <Table dataSource={list} columns={columns} loading={loading} />
      <OrderDialog open={dialog}
                   id={id}
                   onClose={(change) => {
                     setDialog(false);
                     if (change) {
                       load();
                     }
                   }} />
    </>
  )
}

export default OrderDashboard;
