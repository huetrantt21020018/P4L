import {useEffect, useMemo, useState} from "react";
import {Stock, Product} from "../../../api/types";
import {useLoginState} from "../../../hooks/loginState";
import {Table, Button} from "antd";
import {StockApi} from "../../../api/api2/stock";
import {LoginState} from "../../../types/loginState";
import AddStockDialog from "../order/add_dialog";

function StockDashboard() {
  let [stock, setStockList] = useState<Stock[]>([]);
  let [loading, setLoading] = useState(false);
  let [state, user, token] = useLoginState();
  let [dialog, setDialog] = useState(false);

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
      title: 'Xóa',
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <Button/>
        )
      }
    }
  ]

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

  useEffect(() => {
    if (state !== LoginState.LoggedIn)  {
      return;
    }

    load();

  }, [state, token]);

  return (
    <div className={"p-2"}>
      <Button type={"primary"} onClick={() => setDialog(true)}>
        Nhập lô mới
      </Button>
      <Table dataSource={stock} columns={columns} loading={loading}>

      </Table>
      <AddStockDialog
        open={dialog}
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
