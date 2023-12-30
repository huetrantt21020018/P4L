import "./index.css";
import { Space, Input, Button, Divider, Typography } from "antd";

const { Text, Link } = Typography;

const Footer = () => {
  let data = [
    [{label: "Chăm sóc khách hàng"}, {label: "Tài nguyên"}, {label: "Plant for Your Life"}, {label: "Khám phá"}],

    [{label: "FAQ", link: "https://ant.design"}, {label: "Bạn hợp cây gì", link: "https://ant.design"}, 
    {label: "Tài khoản của tôi", link: "https://ant.design"}, {label: "Về chúng tôi", link: "https://ant.design"}],

    [{label: "Dịch vụ giao hàng", link: "https://ant.design"}, {label: "Mẹo chăm sóc cây", link: "https://ant.design"}, 
    {label: "Đơn đang giao", link: "https://ant.design"}, {label: "Địa điểm", link: "https://ant.design"}],

    [{label: "30-Day Guarantee", link: "https://ant.design"}, {label: "Blog", link: "https://ant.design"}, 
    {label: "Xem lịch sử đơn hàng", link: "https://ant.design"}, {label: "Tuyển dụng", link: "https://ant.design"}],

    [{label: "Liên hệ chúng tôi", link: "https://ant.design"}, {label: "Các khóa học trồng cây", link: "https://ant.design"}, 
    {label: "Đăng xuất", link: "https://ant.design"}, {label: "Quà tặng đối tác", link: "https://ant.design"}],
  ]

  return (<div style={{height: "50rem", backgroundColor: "rgba(232,248,250,0.5)"}}>
    <Space direction="horizontial" style={{marginLeft: "6rem", marginTop: "2rem"}}>
      <img src="\src\scenes\footer\image.png"></img>
      <Space direction="vertical">
        <div className="text-2xl" style={{fontFamily: "Pacifico"}}>Get the Dirt, go green!</div>
        <div className="text-l">Cùng theo dõi những mẹo chăm sóc cây, các event và offer vào thẳng inbox của bạn.</div>
        <Space direction="horizontial">
          <Input placeholder="Nhập email của bạn tại đây..." style={{width: "25rem", height: "2.5rem"}}>
          </Input>
          <Button style={{backgroundColor: "#B9E4D5", width: "9rem", height: "2.5rem"}}>
            Theo dõi
          </Button>
        </Space>
      </Space>
    </Space>
    <div style={{width: "87rem"}}>
      <Divider style={{borderWidth: "3px", marginLeft: "6rem", width: "50%"}}></Divider>
    </div>
    <Space direction="vertical" style={{marginLeft: "6rem"}}>
      {data.map(
        row => {
          return <Space direction="horizontial" style={{textAlign: "left", width: "50rem", gap: "4rem"}}>
            {row.map(
              d => {
                if (d.link === undefined) {
                  return <Typography className='font-opensans font-semibold text-l' style={{width: "10rem"}}>{d.label}</Typography>
                } else {
                  return <div className='font-opensans' style={{width: "10rem"}}>
                    <Link style={{color: "#000000"}} href={d.link}>
                      {d.label}
                    </Link>
                  </div> 
                }
              }
            )}
          </Space>
        }
      )}
    </Space>
    <div style={{width: "87rem", marginTop: "10rem"}}>
      <Divider style={{borderWidth: "3px", marginLeft: "6rem", width: "50%"}}></Divider>
    </div>
  </div>);
}

export default Footer;