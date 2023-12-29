import { Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";

function getUser(props) {
  return "aaaaaa";
}

const SuccessOrder = (props) => {
  var user = getUser(props);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  return (
    <div className="app" style={{width: "100%"}}>
      <div className="left_success">
        <Image preview={false} width={230} height={670} src="/src/scenes/success_order/Left.png"/>
      </div>
      <div className="right_success">
        <div className="card_success">
          <div className="middle_success">
            <Image preview={false} style={{margin: "0 auto"}} src="/src/scenes/success_order/Checkmark.png"/>
          </div>
          <div className="middle_success">
            <div style={{color: "rgba(0, 0, 0, 0.5)"}}>Hey, {user}</div>
          </div>
          <div className="middle_success">
            <div style={{fontSize: "20px", fontWeight: "bold"}}>Đơn hàng của bản đã được xác nhận!</div>
          </div>
          <div className="middle_success">
            <div style={{width: "500px", paddingTop: "20px", fontSize: "20px"}}>Chúng tôi sẽ gửi thông báo tình trạng đơn hàng của bạn thông qua email. Hãy chú ý theo dõi nhé!</div>
          </div>
          <div className="middle_success" style={{paddingTop: "20px"}}>
            <Button 
              className="return_success"
              onClick={e => {routeChange()}}
            >Về trang chủ</Button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SuccessOrder;