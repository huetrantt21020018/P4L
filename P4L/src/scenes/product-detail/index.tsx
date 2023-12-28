import {useParams} from 'react-router-dom'
import {Fragment, useCallback, useEffect, useState, useContext} from "react";

import {Product} from "../../api/types";
import {ProductApi} from "../../api/api2/product";
import {Spin, notification} from "antd";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useLoginState} from "../../hooks/loginState";
import {LoginState} from "../../types/loginState";
import {CartApi} from "../../api/api2/cart";
import {CartContext} from "../../context/cartContext";

function ProductDetail() {
  let params = useParams();
  let cart = useContext(CartContext);
  let [noti, notiContextHolder] = notification.useNotification();

  let id = params['id'] ?? '';

  let [loginState, user, token] = useLoginState();
  let [loading, setLoading] = useState(true);
  let [addingToCart, setAddingToCart] = useState(false);
  let [product, setProduct] = useState<Product | null>();
  let [count, setCount] = useState(1);

  let load = useCallback(() => {
    if (isNaN(+id)) return;
    let api = new ProductApi('');
    setLoading(true);
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

  if (loading) {
    return (
      <div className={"text-center pt-6 font-bold"}>
        <Spin size={"large"} />
      </div>
    );
  }

  return (
    <>
      {notiContextHolder}
      <div className={"grid grid-cols-2 gap-4"}>
        <div className={"bg-[#2FA77C] pl-2 ml-4"}>
          <img className={"h-[85vh] max-w-[40vw] float-right object-fill"} src={thumbnail?.url} alt={product?.name} />
        </div>
        <div className={"font-opensans mt-4"}>
          <div className={"text-3xl font-semibold"}>
            {product?.name}
          </div>
          <div className={"pt-6"}>
            {formatter.format(product?.price ?? 0)} VND
          </div>

          <div className={"flex flex-row gap-2 pt-2"}>
            {tags}
          </div>
          <div className={"pt-8 w-4/5"}>
            {product?.description}
          </div>
          <div className={"pt-10"}>
            <div className={"flex flex-row gap-16 justify-content-center"}>
              <button
                className={"bg-[#B9E4D5] uppercase border-0 rounded-md border-solid font-bold py-4 px-32"}
                disabled={loginState !== LoginState.LoggedIn || loading}
                onClick={() => {
                  setAddingToCart(true);

                  let api = new CartApi(token);
                  api.postCart({
                    productId: product.id,
                    count: count
                  })
                    .then(() => {
                      noti.success({
                        message: `Added ${product.name} to cart`,
                        placement: 'topRight'
                      });
                      cart.onChange();
                      setCount(1);
                    })
                    .finally(() => {
                      setAddingToCart(false);
                    })

                }}>
                {addingToCart && <Spin />}
                {!addingToCart && (
                  <>
                    {loginState !== LoginState.LoggedIn ? 'Vui lòng đăng nhập' : 'Thêm vào giỏ hàng'}
                  </>
                )}
              </button>
              <div className={"flex flex-row justify-content-between items-center gap-3"}>
                <button className={"bg-transparent h-fit border-0"}
                        disabled={count <= 1}
                        onClick={() => setCount(count - 1)}>
                  <RemoveCircleOutlineIcon />
                </button>
                <div className={"h-fit mb-0.5"}>{count}</div>
                <button className={"bg-transparent h-fit border-0"}
                        disabled={product?.stock && count >= product?.stock}
                        onClick={() => setCount(count + 1)}>
                  <AddCircleOutlineIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;
