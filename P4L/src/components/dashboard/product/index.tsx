import {useState, useEffect} from 'react';
import {Product, Tag as PT} from '../../../api/types';
import {ProductApi} from '../../../api/api2/product';
import {useLoginState} from "../../../hooks/loginState";
import {Button, notification, Popconfirm, Table, Tag} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ProductDialog from "./dialog";

function ProductDashboard() {
  let [product, setProductList] = useState<Product[]>([]);
  let [loading, setLoading] = useState(false);
  let [dialog, setDialog] = useState(false);
  let [noti, notiContextHolder] = notification.useNotification();
  let [id, setId] = useState(0);
  let [state, user, token] = useLoginState();

  let load = () => {
    let product = new ProductApi('');
    setLoading(true);
    product.list()
      .then((rs) => {
        if (rs.success) {
          setProductList(rs.data);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    load();
  }, [])

  let columns = [
    {
      title: 'Tên',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Thẻ',
      key: 'productTags',
      dataIndex: 'productTags',
      render(pt?: PT[]) {
        return (
          <div className={"flex flex-row gap-1"}>
            {pt?.map((tag) => (
              <Tag key={tag.id}>
                {tag.name}
              </Tag>
            ))}
          </div>
        )
      }
    },
    {
      title: 'Hàng tồn',
      key: 'stock',
      dataIndex: 'stock',
      render(stock: number) {
        if (stock === 0) {
          return (
            <>
              <Tag color={"warning"}>Hết hàng</Tag>
            </>
          )
        }
        return (
          <>{new Intl.NumberFormat('vi-VN').format(stock)}</>
        )
      }
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      render(p: number) {
        return new Intl.NumberFormat('vi-VN').format(p)
      }
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
              title={"Xóa mặt hàng"}
              description={"Bạn muốn xóa mặt hàng này?"}
              okText={"Xác nhận"}
              cancelText={"Hủy"}
              placement={"bottom"}
              showCancel={false}
              onConfirm={() => {
                let productApi = new ProductApi(token);
                setLoading(true);

                productApi.delete(id)
                  .then(rs => {
                    if (rs.success) {
                      noti.success({ message: 'Xóa mặt hàng thành công' });
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

  return (
    <div className={"p-2 flex flex-col gap-1"}>
      {notiContextHolder}
      <div>
        <Button type={"primary"} onClick={() => {
          setDialog(true);
          setId(0);
        }}>
          Thêm mặt hàng mới
        </Button>
      </div>
      <Table dataSource={product} columns={columns} loading={loading}>
      </Table>
      <ProductDialog
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

export default ProductDashboard
