import { Image, Typography, Row, Col } from "antd";
import "./index.css";

import { Link } from 'react-router-dom';

const SmallTopPlant = () => {
  return <div>
    <Image 
      preview={false} 
      width={180}
      height={210}
      src="\src\scenes\landing-page\image 1.png"
      />
    <div className="test-shadow" style={{backgroundColor: "#E8EFF0", width: "230px", height: "230px", position: "relative", bottom: "190px", borderRadius: "20px"}}>
    </div>
    <div className="text-xl font-bold font-opensans" style={{position: "relative", textAlign: "right", bottom: "230px", right: "10px"}}>
      Cây sen đá
    </div>
  </div>
}

const BigTopPlant = () => {
  return <div style={{height: "800px", width: "456px", paddingTop: "20px"}}>
    <Image 
      preview={false} 
      width={350}
      height={600}
      src="\src\scenes\landing-page\Plant-pot-on-transparent-background-PNG 1.png"
      />
    <div className="test-shadow" style={{backgroundColor: "#E8EFF0", height: "350px", width: "350px", position: "relative", bottom: "320px", borderRadius: "20px"}}>
    </div>
    <div className="text-3xl font-bold font-opensans" style={{position: "relative", bottom: "380px", right: "120px", textAlign: "right"}}>
      Cây lưỡi hổ
    </div>
  </div>
}

const SocialSideBar = () => {
  return (<div style={{height: "350px", width: "100px", paddingTop: "50px"}}>
    <div className="flex flex-col h-screen justify-center items-center">
      <div style={{height: "5rem"}}></div>
      <Link className="h-36" to="https://github.com/">
        <img src="\src\scenes\landing-page\fb.png"></img>
      </Link>
      <div style={{height: "2rem"}}></div>
      <Link to="https://github.com/">
        <img src="\src\scenes\landing-page\insta.png"></img>
      </Link>
      <div style={{height: "2rem"}}></div>
      <Link to="https://github.com/">
        <img src="\src\scenes\landing-page\x.png"></img>
      </Link>
      <div style={{height: "2rem"}}></div>
      <div style={{borderLeft: "2px solid black", height: "1.5rem"}}></div>
    </div>
  </div>);
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
          <SmallTopPlant/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant/>
          <div style={{width: "20px"}}></div>
          <SmallTopPlant/>
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
        <img src="\src\scenes\landing-page\Trillium.png" width="15rem" height="15rem" style={{paddingLeft: "0.5rem"}}/>
        <div style={{paddingLeft: "0.5rem"}}>
          Cây cảnh
        </div>
      </div>
    </div>
  );
}

const PlantCard = (props) => {
  return <Col span={3} style={{height: "20rem"}}>
    <img src={props.url} width="216rem" height="256rem"></img>
    <div className="w-100% text-xl">{props.name}</div>
    <div className="w-100% text-l">{props.price}</div>
    <div className="col">
      <Tag havePrice={props.price!==undefined}></Tag>
    </div>
  </Col>
}

const RecommendRow = (props) => {
  return (<div className="font-opensans text-2xl w-100%" style={{paddingTop: "2rem"}}>
    <div className="relative font-semibold" style={{left: "2rem", paddingBottom: "1rem"}}>{props.category}</div>
    <Row justify="space-around">
      {props.cart.map(c => {
        return <PlantCard key={c.id}
                          url={c.product?.productThumbnails?.[0]?.url}
                          name={c.product?.name}
                          price={c.product?.price}
                          />
      })}
    </Row>
  </div>);
}

const Card = (props) => {
  return (
    <Col style={{backgroundColor: "#FFFFFF", width: "17rem", height: "17rem", textAlign: "center", borderRadius: "1rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
        <img src={props.url} style={{width: "6rem", height: "6rem", paddingTop: "1rem"}}></img>
      </div>
      <div className="text-3xl text-bold" style={{justifyContent: "center", display: "flex", fontFamily: "Oswald"}}>{props.title}</div>
      <div className="text-xl font-opensans" style={{justifyContent: "center", display: "flex", paddingLeft: "1rem", paddingRight: "1rem"}}>{props.content}</div>
    </Col>
  );
}

const WhatWeDo = (props) => {
  return (<div className="w-100% font-opensans" style={{height: "400px"}}>
    <img style={{filter: "blur(0.3rem)", width: "100%", paddingTop: "10rem"}} src="\src\scenes\landing-page\WhiteBG.png"></img>
    <div className="relative" style={{backgroundColor: "", width: "37rem", padding: "10rem", bottom: "45rem"}}>
      <div className="text-2xl font-bold">
        Vì sao chọn PlantForLife?
      </div>
      <div>
      Dù bạn là người mới bắt đầu sự chăm sóc cây hay là người yêu thực vật lâu năm, chúng tôi cam kết cung cấp những sản phẩm phong phú và hỗ trợ thông tin chăm sóc tận tình để đảm bảo cây của bạn luôn phát triển khỏe mạnh.
      </div>
    </div>
    <Row className="relative" justify="space-evenly" style={{bottom: "50rem", width: "95%", paddingLeft: "5.5rem"}}>
      {props.cart.map(c => {
          return <Card key={c.id} url={c.url} content={c.content} title={c.title}/>
      })}
    </Row>
  </div>);
}

const LandingPage = () => {
  let cart1 = [{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}}, {id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây"}}];
  let cart2 = [{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}}, {id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}}];
  let cart3 = [{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}},{id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}}, {id: "1",product: {productThumbnails: [{url: "/src/scenes/landing-page/image 3.png"}],name:"Cây",price: "4.500.000"}}];
  let cart4 = [
    {
      id: "Card_Khỏe mạnh",
      title: "Khỏe mạnh",
      content: "Cây được chăm sóc trong tình trang tốt và khỏe mạnh nhất.",
      url: "/src/scenes/landing-page/health.png"
    },
    {
      id: "Card_Chất lượng",
      title: "Chất lượng",
      content: "Giám sát của đội ngũ chuyên gia đầy kinh nghiệm.",
      url: "/src/scenes/landing-page/quality.png"
    },
    {
      id: "Card_Tinh túy",
      title: "Tinh túy",
      content: "Chất lượng hạt giống ngay từ khi bắt đầu đã phải qua chọn lọc kỹ càng.",
      url: "/src/scenes/landing-page/essence.png"
    },
    {
      id: "Card_Dịch vụ",
      title: "Dịch vụ",
      content: "Đối với chúng tôi, trải nghiệm của khách hàng là mục tiêu hàng đầu.",
      url: "/src/scenes/landing-page/health.png"
    }
  ]
  return (<div>
    <BestSellers/>
    <RecommendRow cart={cart1} category="Most Popular Categories"/>
    <RecommendRow cart={cart2} category="Hàng mới về"/>
    <RecommendRow cart={cart3} category="Cây cảnh"/>
    <WhatWeDo cart={cart4}/>
  </div>);
}

export default LandingPage;