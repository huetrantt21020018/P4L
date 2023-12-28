import {useEffect, useMemo, useState} from "react";
import {Stock, Product} from "../../../api/types";
import {useLoginState} from "../../../hooks/loginState";
import {Table, Button, Popconfirm, notification} from "antd";
import {StockApi} from "../../../api/api2/stock";
import {LoginState} from "../../../types/loginState";
import StockDialog from "./dialog";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

function StockDashboard() {
  let [stock, setStockList] = useState<Stock[]>([]);
  let [loading, setLoading] = useState(false);
  let [state, user, token] = useLoginState();
  let [dialog, setDialog] = useState(false);
  let [noti, notiContextHolder] = notification.useNotification();
  let [id, setId] = useState(0);

  let load = useMemo(() => {
    return () => {
      let stockApi = new StockApi(token);
      setLoading(true);
      stockApi.list()
        .then((rs) => {
          if (rs.success) {
            setStockList(rs.data);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [token]);

  let columns = [
    {
      title: 'Mặt hàng',
      key: 'product',
      dataIndex: 'product',
      render: (product?: Product) => <>{product?.name}</>
    },
    {
      title: 'Số lượng',
      key: 'count',
      dataIndex: 'count'
    },
    {
      title: 'Ghi chú',
      key: 'description',
      dataIndex: 'description'
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <div className={"flex flex-row gap-2"}>
            <Button onClick={() => {
              setDialog(true);
              setId(id);
            }}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={"Xóa lô hàng"}
              description={"Bạn muốn xóa lô hàng này?"}
              okText={"Xác nhận"}
              cancelText={"Hủy"}
              placement={"bottom"}
              showCancel={false}
              onConfirm={() => {
                let stockApi = new StockApi(token);
                setLoading(true);

                stockApi.delete(id)
                  .then(rs => {
                    if (rs.success) {
                      noti.success({ message: 'Xóa lô hàng thành công' });
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
        )
      }
    }
  ]

  useEffect(() => {
    if (state !== LoginState.LoggedIn)  {
      return;
    }

    load();

  }, [state, token]);

  return (
    <div className={"p-2 flex flex-col gap-1"}>
      {notiContextHolder}
      <div>
        <Button type={"primary"} onClick={() => {
          setDialog(true);
          setId(0);
        }}>
          Nhập lô mới
        </Button>
      </div>
      <Table dataSource={stock} columns={columns} loading={loading}>

      </Table>
      <StockDialog
        open={dialog}
        id={id}
        onClose={(change) => {
          setDialog(false);
          if (change) {
            load();
          }
        }} />
    </div>
  )
}

export default StockDashboard;
