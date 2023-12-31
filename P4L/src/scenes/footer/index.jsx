import "./index.css";
import { Space, Input, Button, Divider, Typography } from "antd";
import { Link } from 'react-router-dom';
import image from '../../assets/Image1.png';

const Footer = () => {
  let data = [
    [{label: "Chăm sóc khách hàng"}, {label: "Tài nguyên"}, {label: "Plant for Your Life"}, {label: "Khám phá"}],

    [{label: "FAQ", link: "https://ant.design"}, {label: "Bạn hợp cây gì", link: "https://ant.design"},
    {label: "Tài khoản của tôi", link: "https://ant.design"}, {label: "Về chúng tôi", link: "https://ant.design"}],

    [{label: "Dịch vụ giao hàng", link: "https://ant.design"}, {label: "Mẹo chăm sóc cây", link: "https://ant.design"},
    {label: "Đơn đang giao", link: "/order"}, {label: "Địa điểm", link: "https://ant.design"}],

    [{label: "30-Day Guarantee", link: "https://ant.design"}, {label: "Blog", link: "https://ant.design"},
    {label: "Xem lịch sử đơn hàng", link: "https://ant.design"}, {label: "Tuyển dụng", link: "https://ant.design"}],

    [{label: "Liên hệ chúng tôi", link: "https://ant.design"}, {label: "Các khóa học trồng cây", link: "https://ant.design"},
    {label: "Đăng xuất", link: "https://ant.design"}, {label: "Quà tặng đối tác", link: "https://ant.design"}],
  ];

  let policyData = [
    {label: "Điều khoản dịch vụ", link: "https://ant.design"},
    {label: "Chính sách bảo mật", link: "https://ant.design"},
    {label: "Bảo vệ dữ liệu người dùng", link: "https://ant.design"}
  ];

  return (
  <div className={"bg-[#E8F8FA80]"}>
    <Space direction="horizontal" style={{paddingLeft: "11rem", paddingRight: "12rem", marginTop: "2rem"}}>
      <img src={image} style={{marginRight: "2rem"}}></img>
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
    <div>
      <Divider style={{borderWidth: "3px"}}></Divider>
    </div>
    <Space direction="vertical" style={{paddingLeft: "12rem", paddingRight: "12rem"}}>
      {data.map(
        (row, idx) => {
          return <Space direction="horizontal" style={{textAlign: "left", width: "50rem", gap: "4rem"}} key={idx}>
            {row.map(
              d => {
                if (d.link === undefined) {
                  return <Typography className='font-opensans font-semibold text-lg' style={{width: "10rem"}}>
                    <div className={"text-black hover:text-[#3A847F] hover:italic"}>{d.label}</div>
                  </Typography>
                } else {
                  return <div className='font-opensans' style={{width: "10rem"}}>
                    <Link to={d.link} className={"text-black hover:text-[#3A847F] hover:italic"}>
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
    <div style={{marginTop: "10rem"}}>
      <Divider style={{borderWidth: "3px"}}></Divider>
    </div>
    <Space className="font-opensans" direction="horizontial" style={{fontSize: "0.75rem"}}>
      <Space direction="vertical" style={{marginLeft: "6rem"}}>
        <div>Công ty TNHH MTV Trần Thị Thu </div>
        <div>Địa chỉ: Số 9 Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</div>
      </Space>
      <Space direction="horizontal" style={{marginTop: "1rem", marginLeft: "36rem"}}>
        {policyData.map(
          d => {
            function toItalic(e) {
              e.target.style.color = "#3A847F";
              e.target.style.fontStyle = "italic";
            }

            function toNormal(e) {
              e.target.style.color = "#000000";
              e.target.style.fontStyle = "normal";
            }

            return <div className='font-opensans' style={{width: "9rem"}}>
              <Link style={{fontSize: "0.75rem"}} to={d.link} className={"text-black hover:text-[#3A847F] hover:italic"}>
                {d.label}
              </Link>
            </div>
          }
        )}
      </Space>
    </Space>
  </div>
  );
}

export default Footer;
