import {useState, useEffect} from 'react';
import {Product} from '../../../api/types';
import {ProductApi} from '../../../api/api2/product';
import {useLoginState} from "../../../hooks/loginState";
import {Table} from 'antd';

let columns = [
  {
    title: 'Tên',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Khí hậu',
    key: 'climateDescription',
    dataIndex: 'climateDescription'
  },
  {
    title: 'Hàng tồn',
    key: 'stock',
    dataIndex: 'stock'
  },
  {
    title: '',
    key: 'id',
    dataIndex: 'id',
    render: (id) => <button>{id}</button>
  }
]

function ProductDashboard() {
  let [product, setProductList] = useState<Product[]>([]);
  let [loading, setLoading] = useState(false);
  let [state, user, token] = useLoginState();

  useEffect(() => {
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

  }, [])

  return (
    <>
      <Table dataSource={product} columns={columns}>

      </Table>
    </>
  )
}

export default ProductDashboard
