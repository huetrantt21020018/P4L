import { useParams } from 'react-router-dom'
import {useEffect, useState, useCallback, Fragment} from "react";

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

  let tags = product?.productTags.map(t => {
    return (
      <Fragment key={t.id}>
        <div className={"flex flex-row bg-[#E8EFF0] p-1"}>
          {t.name}
        </div>
      </Fragment>
    )
  })

  let formatter = new Intl.NumberFormat('vi-VN');
  let thumbnail = product?.productThumbnails
    .sort((a, b) => a.priority - b.priority)[0];
  return (
    <>
      <div className={"grid grid-cols-2"}>
        <div>
          <img className={"max-h-[85vh] max-w-[40vw]"} src={thumbnail?.url} alt={product?.name} />
        </div>
        <div className={"font-opensans mt-4"}>
          <div className={"text-3xl font-semibold"}>
            {product?.name}
          </div>
          <br />
          <div>
            {formatter.format(product?.price ?? 0)} VND
          </div>

          <div className={"flex flex-row gap-2"}>
            {tags}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;
