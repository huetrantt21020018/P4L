import {Col, Row} from "antd";
// @ts-ignore
import Health from '../../assets/health.png';
// @ts-ignore
import Quality from '../../assets/quality.png';
// @ts-ignore
import Essence from '../../assets/essence.png';
// @ts-ignore
import WhiteBG from '../../assets/WhiteBG2.png';

function Card(props : { url: string, title: string, content: string }) {
  return (
    <div className={"bg-white w-60 h-60 xl:w-72 xl:h-72 text-center rounded-2xl flex flex-col"} style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
      <div className={"flex flex-row w-full justify-center"}>
        <img src={props.url} style={{width: "6rem", height: "6rem", paddingTop: "1rem"}} alt={""}></img>
      </div>
      <div className="text-3xl text-bold justify-center flex flex-row" style={{fontFamily: "Oswald"}}>
        {props.title}
      </div>
      <div className="text-base xl:text-lg font-opensans justify-center flex flex-row pt-2 lg:pt-4 xl:pt-6" style={{justifyContent: "center", display: "flex", paddingLeft: "1rem", paddingRight: "1rem"}}>
        {props.content}
      </div>
    </div>
  )
}

function WhatWeDo() {
  let c = [
    {
      title: "Khỏe mạnh",
      content: "Cây được chăm sóc trong tình trang tốt và khỏe mạnh nhất.",
      url: Health
    },
    {
      title: "Chất lượng",
      content: "Giám sát của đội ngũ chuyên gia đầy kinh nghiệm.",
      url: Quality
    },
    {
      title: "Tinh túy",
      content: "Chất lượng hạt giống ngay từ khi bắt đầu đã phải qua chọn lọc kỹ càng.",
      url: Essence
    },
    {
      title: "Dịch vụ",
      content: "Đối với chúng tôi, trải nghiệm của khách hàng là mục tiêu hàng đầu.",
      url: Health
    }
  ]

  return (
    <>
      <div className="w-full font-opensans my-20 flex flex-col gap-20 px-20 py-20 box-border"
          style={{
            backgroundImage: `
              linear-gradient(rgb(255,255,255,0.7), rgb(255,255,255,0.7)),
              url('${WhiteBG}')
            `
          }}>
        {/*<img style={{filter: "blur(0.3rem)", width: "100%", paddingTop: "10rem"}} src={WhiteBG}></img>*/}

        <div className={""}>
          <div className={"w-2/5 flex flex-col gap-6"}>
            <div className="text-2xl font-bold">
              Vì sao chọn PlantForLife?
            </div>
            <div>
              Dù bạn là người mới bắt đầu sự chăm sóc cây hay là người yêu thực vật lâu năm,
              chúng tôi cam kết cung cấp những sản phẩm phong phú và hỗ trợ thông tin chăm sóc tận tình
              để đảm bảo cây của bạn luôn phát triển khỏe mạnh.
            </div>
          </div>
        </div>
        <div className={"flex flex-row justify-center"}>
          <div className={"grid grid-cols-4 w-fit gap-10"}>
            {c.map(c => {
              return <Card key={c.title} url={c.url} content={c.content} title={c.title}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatWeDo;
