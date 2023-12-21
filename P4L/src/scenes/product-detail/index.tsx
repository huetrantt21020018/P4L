import { useParams } from 'react-router-dom'
import {useEffect, useState, useCallback} from "react";
import {Product} from "../../api/types";
import {ProductApi} from "../../api/api2/product";

function ProductDetail() {
  let params = useParams();

  let id = params['id'] ?? '';

  let [loading, setLoading] = useState(false);
  let [product, setProduct] = useState<Product | null>();

  let load = useCallback(() => {
    if (isNaN(+id)) return;
    let api = new ProductApi('');
    api.getDetail(+id)
      .then(rs => {
        if (rs.success) {
          setProduct(rs.data);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  useEffect(() => {
    load();
  }, [+id]);

  useEffect(() => load(), []);

  return (
    <>
      <div>
        {product?.name}
      </div>
    </>
  )
}

export default ProductDetail;
