import { useState, useEffect } from 'react';
import './index.css';
import { ProductApi } from '../../api/api2/product';
import type {Product, ProductType} from '../../api/types';
import {useLoginState} from "../../hooks/loginState";
import {TreeTypeIcon} from "../../icons";
import {ProductTypeApi} from "../../api/api2/product_type";
import {FilterAccordion} from "./filterAccordion";
import { Spin } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';


function ProductList2() {
  let [productList, setProductList] = useState<Product[]>([]);
  let [loading, setLoading] = useState(false);
  let [productTypes, setProductTypes] = useState<ProductType[]>([]);
  let [param, setParam] = useSearchParams();
  let [_, __, token] = useLoginState();

  let chosenProductTypes = +param.get('type') || 0;
  let query = param.get('q') || '';

  useEffect(() => {
    setLoading(true);
    let api = new ProductApi('');
    api.find({
      productType: chosenProductTypes,
      query
    })
      .then(rs => {
        if (rs.success) {
          setProductList(rs.data);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [chosenProductTypes, query]);

  useEffect(() => {
    // setLoading(true);
    let api = new ProductTypeApi('');
    api.list()
      .then(rs => {
        if (rs.success) {
          setProductTypes(rs.data);
        }
      })
      .finally(() => {
        // setLoading(false);
      })
  }, [])

  let formatter = new Intl.NumberFormat('vi-VN');
  let products = productList
    .map(product => {
      let thumbnail = product.productThumbnails?.[0];
      let type = product.productType?.name;
      return (
        <Link to={"/products/" + product.id} key={product.id} className={"h-full relative text-black no-underline"}>
          <div className={"absolute top-3"}>
            <div className={"text-sm -mb-7 z-10 px-2 py-0.5 bg-[#E8EFF0] w-fit flex flex-row gap-1"}>
              <TreeTypeIcon />
              <div>
                {type}
              </div>
            </div>
          </div>
          <div className={"flex flex-col h-full font-opensans"}>
            <img className={"h-full object-cover"} src={thumbnail?.url} alt={product.name} />
            <div className={"text-lg xl:text-2xl py-2 text-ellipsis whitespace-nowrap overflow-hidden"}>
              {product.name}
            </div>
            <div className={"text-sm xl:text-lg pt-1"}>
              {formatter.format(product.price)} VND
            </div>
          </div>
          <div>

          </div>
        </Link>
      )
    })

  let productFilter = (
    <>
      <div className={"font-bold font-opensans sticky top-28 px-8"}>
        <div className={"text-2xl pb-4"}>
          Bộ lọc tìm kiếm
        </div>
        <div>
          <FilterAccordion
                choices={productTypes} choice={chosenProductTypes}
                value={'id'} label={'name'} name={'Loại cây'}
                onChange={k => {
                  let value = 0
                  if (chosenProductTypes === k) {
                    value = 0;
                  }
                  else {
                    value = k
                  }

                  // @ts-ignore
                  let p = new URLSearchParams([...param]);
                  p.set('type', value.toString());
                  setParam(p);
                }}/>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className={"grid grid-cols-8 xl:grid-cols-9"}>
        <div className={"product-filter col-span-2"}>
          {productFilter}
        </div>
        <div className={"product-list col-span-6"}>
          {!loading && <div className={"grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6"}>
            {products}
          </div>}
          {loading && (
            <div className={"text-center pt-6 font-bold"}>
              <Spin size={"large"} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductList2;
