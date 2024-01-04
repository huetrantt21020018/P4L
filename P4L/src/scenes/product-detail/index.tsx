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
import {RecommendRow} from "../landing-page/index";

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

  let [variants, setVariants] = useState<Map<number, number>>(new Map);
  let [list3, setList3] = useState<Product[]>([]);
  let [thumb, setThumb] = useState<number>(0);

  let load = useCallback(() => {
    if (isNaN(+id)) return;
    let api = new ProductApi('');
    setLoading(true);
    api.getDetail(+id)
      .then(rs => {
        if (rs.success) {
          setProduct(rs.data);
          if (rs.data.productThumbnails?.length) {
            setThumb(rs.data.productThumbnails.sort((a, b) => a.priority - b.priority)[0].id);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [id]);

  useEffect(() => {
    load();
  }, [+id]);

  useEffect(() => {
    let api = new ProductApi('');

    [[3, setList3] as const]
      .forEach(pair => {
        api.getType(pair[0])
          .then(rs => {
            if (rs.success) {
              pair[1](rs.data);
            }
          })
      })
  }, [])

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


  let productVariants = product?.productVariants.map(v => {
    return (
      <Fragment key={v.id}>
        <div className={"font-opensans font-bold py-4"}>
          {v.name} :
        </div>
        <div className={"flex flex-row gap-2"}>
          {v.productVariantValues.map(value => {
            let selected = variants.get(value.variantId) === value.id;
            let selectedClass = selected ? 'border-black font-bold border-width-[1px] italic' : 'border-[#00000067]';
            return (
              <button key={value.id}
                      className={"cursor-pointer py-5 px-10 bg-white border border-solid font-opensans " + selectedClass}
                      onClick={() => {
                        // @ts-ignore
                        let m = new Map([...variants]);
                        m.set(value.variantId, value.id);
                        // @ts-ignore
                        setVariants(m);
                      }}>
                {value.name}
              </button>
            )
          })}
        </div>
      </Fragment>
    )
  })

  let formatter = new Intl.NumberFormat('vi-VN');
  let thumbnail = product?.productThumbnails.find(t => t.id === thumb);

  let allVariantSet = (product?.productVariants?.length ?? 0) === variants.size;

  if (loading) {
    return (
      <div className={"text-center pt-6 font-bold"}>
        <Spin size={"large"} />
      </div>
    );
  }

  let controls = (
    <div className={"pt-10"}>
      <div className={"flex flex-row gap-16 justify-content-center"}>
        <div>
          <button
            className={"bg-[#B9E4D5] uppercase border-0 rounded-md border-solid font-bold py-4 px-32"}
            disabled={loginState !== LoginState.LoggedIn || loading || !allVariantSet || product?.stock === 0}
            onClick={() => {
              setAddingToCart(true);

              let api = new CartApi(token);
              api.postCart({
                productId: product.id,
                count: count,
                // @ts-ignore
                variants: [...variants].map(pair => ({
                  variantId: pair[0],
                  variantValueId: pair[1]
                }))
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
        </div>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row justify-content-between items-center gap-3 py-3"}>
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

          <div className={"text-center text-[#106A7D]"}>
            Số lượng : {product?.stock}
          </div>
        </div>
      </div>
    </div>
  );

  let card = (
    <>
      <div className={"grid grid-cols-2 gap-10  font-opensans"}>
        <div className={"flex flex-col gap-2"}>
          <div className={"font-bold text-xl font-opensans"}>
            Thông tin sản phẩm
          </div>
          <div className={"text-[#1A2A2D]"}>
            {product?.description.split('\n')
              .map(chunk => (
                <>
                  {chunk}
                  <br />
                </>
              ))}
          </div>
        </div>
        <div className={"flex flex-row gap-2 text-[#1A2A2D]"}>
          <div className={"flex-grow"}>
            <div className={"mt-10"}>Khí hậu: {product?.climateDescription}</div>
            <div>Năng suất: {product?.yield}</div>
            <div>Thời gian trồng: {product?.plantingDuration} tuần</div>
            <div>Mùa trồng: tháng {product?.growingSeason}</div>
          </div>
          <div className={"flex flex-col text-right"}>
            <div className={"text-lg text-[#106A7D]"}>Đã bán</div>
            <div className={"text-3xl font-bold"}>
              {formatter.format(product?.totalOrder)}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {notiContextHolder}
      <div className={"grid grid-cols-2 gap-4"}>
        <div className={"pl-2 ml-4 flex flex-row gap-10"}>
          <div className={"flex flex-col gap-2 py-2"}>
            {product?.productThumbnails.slice(0, 3).map(r => {
              let className = r.id === thumb ? 'border-black border-2' : 'border-gray-300 border-2';
              return (
                <>
                  <div onClick={() => {
                    setThumb(r.id)
                  }}>
                    <img className={"h-[27vh] w-[10vw] border border-solid " + className} src={r.url} alt={product?.name} />
                  </div>
                </>
              )
            })}
          </div>
          <img className={"h-[85vh] w-[35vw] float-right object-fill"} src={thumbnail?.url} alt={product?.name} />
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
            {product?.description.split('\n')
              .map(chunk => (
                <>
                  {chunk}
                  <br />
                </>
              ))}
          </div>
          <div className={"pt-8 w-4/5"}>
            {productVariants ?? null}
          </div>
          {controls}
        </div>
      </div>
      <div className={"px-20 mt-10"}>
        <div className={"shadow-2xl rounded-md px-10 py-10"}>
          {card}
        </div>
      </div>
      <div className={"mt-10"}>
        <RecommendRow cart={list3.slice(0, 6)} category={"Trending"} />
      </div>
    </>
  )
}

export default ProductDetail;
