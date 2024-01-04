import { Image, Typography, Row, Col } from "antd";
import "./index.css";
import WhatWeDo from './WhatWeDo';
import { Link } from 'react-router-dom';
import {useEffect, useState} from "react";
import {Product} from "../../api/types";
import {ProductApi} from "../../api/api2/product";

// @ts-ignore
import FB from './fb.png';
// @ts-ignore
import Insta from './insta.png';
// @ts-ignore
import X from './x.png';
// @ts-ignore
import tri from './Trillium.png';
// @ts-ignore
import PlantPot from './Plant-pot-on-transparent-background-PNG 1.png';
// @ts-ignore
import Small from './image 1.png';
// @ts-ignore
import Small2 from './transparent1.png';
// @ts-ignore
import Small3 from './transparent2.png';
// @ts-ignore
import Small4 from './transparent3.png';


const SmallTopPlant = ({ s, name } : {s: string, name: string}) => {
  return (
    <div>
      <Image
        preview={false}
        width={180}
        height={210}
        src={s}
      />
      <div className="test-shadow" style={{backgroundColor: "#E8EFF0", width: "230px", height: "230px", position: "relative", bottom: "190px", borderRadius: "20px"}}>
      </div>
      <div className="text-xl font-bold font-opensans" style={{position: "relative", textAlign: "right", bottom: "230px", right: "10px"}}>
        {name}
      </div>
    </div>
  )
}

const BigTopPlant = () => {
  return <div style={{height: "800px", width: "456px", paddingTop: "20px"}}>
    <Image
      preview={false}
      width={350}
      height={600}
      src={PlantPot}
      />
    <div className="test-shadow" style={{backgroundColor: "#E8EFF0", height: "350px", width: "350px", position: "relative", bottom: "320px", borderRadius: "20px"}}>
    </div>
    <div className="text-3xl font-bold font-opensans" style={{position: "relative", bottom: "380px", right: "120px", textAlign: "right"}}>
      Cây lưỡi hổ
    </div>
  </div>
}

const SocialSideBar = () => {
  return (
    <div style={{width: "100px", paddingTop: "50px"}}>
      <div className="flex flex-col h-screen items-center">
        <div style={{height: "5rem"}}></div>
        <Link to="https://github.com/">
          <img src={FB}></img>
        </Link>
        <div style={{height: "2rem"}}></div>
        <Link to="https://github.com/">
          <img src={Insta}></img>
        </Link>
        <div style={{height: "2rem"}}></div>
        <Link to="https://github.com/">
          <img src={X}></img>
        </Link>
        <div style={{height: "2rem"}}></div>
        <div style={{borderLeft: "2px solid black", height: "1.5rem"}}></div>
      </div>
    </div>
  );
}

const BestSellers = () => {
  return (<div className="bg-[#E8EFF0] flex" style={{height: "45rem"}}>
    <div style={{width: "40px"}}></div>
    <BigTopPlant/>
    <div style={{width: "5px"}}></div>
    <div className="font-opensans" style={{width: "250px"}}>
      <label className="text-2xl font-bold block" style={{color: "#3A847F", paddingTop: "30px", paddingLeft: "10px"}}>Go green</label>
      <label className="font-bold" style={{fontSize: "50px"}}>Thế giới cây trồng</label>
      <div style={{height: "350px", width: "900px"}}>
        <div>
          <Typography className="text-xl" style={{color: "#3A847F", fontFamily: 'Oleo Script', paddingTop: '90px'}}># Plant of the Month</Typography>
        </div>
        <div className="space-y-0.5" style={{display: "flex", width: "fit-content"}}>
          <SmallTopPlant s={Small} name={"Cây sen đá"}/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant s={Small2} name={"Cây chuối"}/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant s={Small3} name={"Cây táo tàu"}/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant s={Small4} name={"Cây sung"}/>
          <div style={{width: "20px"}}></div>
        </div>
      </div>
    </div>
    <div className="font-opensans" style={{height: "350px", width: "386px", paddingTop: "70px", paddingLeft: "40px", paddingRight: "230px"}}>
      <div>
      Cây giống không chỉ là sản phẩm, mà là một phần của cuộc sống, kết nối con người với thiên nhiên và tạo ra không gian sống xanh mát. Trồng cây là một hành trình khám phá sự đa dạng của thiên nhiên, và chúng tôi đồng hành để bạn có thể tạo ra một khu vườn phong phú và sống động.
      </div>
    </div>
    <SocialSideBar/>
  </div>);
}

const Tag = (props) => {
  return (
    <div>
      <div className="flex relative" style={{width: "6rem", height: "2rem", backgroundColor: "#E8EFF0", alignItems: "center", bottom: props.havePrice ? "20rem" : "18rem"}}>
        <img src={tri} width="15rem" height="15rem" style={{paddingLeft: "0.5rem"}}/>
        <div style={{paddingLeft: "0.5rem"}}>
          Cây cảnh
        </div>
      </div>
    </div>
  );
}

const PlantCard = (props) => {
  let f = new Intl.NumberFormat('vi-VN');
  return (
    <Col span={3} style={{height: "20rem"}}>
      <img src={props.url} width="216rem" height="256rem"></img>
      <div className="w-100% text-xl font-opensans">
        {props.name}
      </div>
      <div className="w-100% text-l font-opensans">
        {f.format(props.price)}
      </div>
      <div className="col">
        <Tag havePrice={props.price!==undefined}></Tag>
      </div>
    </Col>
  )
}

export const RecommendRow = (props : { category: string, cart: Product[] }) => {
  return (
    <div className="font-opensans text-2xl w-100%" style={{paddingTop: "2rem"}}>
      <div className={"pb-4 px-20 font-semibold"}>
        {props.category}
      </div>
      <div className={"flex flex-row px-20 justify-between"}>
        {props.cart.map(c => {
          return <PlantCard key={c.id}
                            url={c.productThumbnails?.[0]?.url}
                            name={c.name}
                            price={c.price}
                            />
        })}
      </div>
    </div>
  );
}

const LandingPage = () => {
  let [list1, setList1] = useState<Product[]>([]);
  let [list2, setList2] = useState<Product[]>([]);
  let [list3, setList3] = useState<Product[]>([]);

  useEffect(() => {
    let api = new ProductApi('');

    [[1, setList1] as const, [2, setList2] as const, [3, setList3] as const]
      .forEach(pair => {
        api.getType(pair[0])
          .then(rs => {
            if (rs.success) {
              pair[1](rs.data);
            }
          })
      })
  }, [])

  return (<div>
    <BestSellers/>
    <RecommendRow cart={list1.slice(0, 6)} category="Most Popular Categories"/>
    <RecommendRow cart={list2.slice(0, 6)} category="Hàng mới về"/>
    <RecommendRow cart={list3.slice(0, 6)} category="Cây cảnh"/>
    <WhatWeDo/>
  </div>);
}

export default LandingPage;
