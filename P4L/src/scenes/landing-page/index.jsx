import { Image, Typography } from "antd";
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
    <div className="test-shadow" style={{backgroundColor: "#E8EFF0", height: "350px", width: "350px", position: "relative", bottom: "320px"}}>
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
        <label className="text-2xl font-bold block" style={{ color: "#3A847F", paddingTop: "30px", paddingLeft: "10px"}}>Go green</label>
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

const LandingPage = () => {
  return (<div>
    <BestSellers/>
    <div>Hello</div>
  </div>);
}

export default LandingPage;