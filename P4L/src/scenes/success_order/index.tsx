import { Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {useLoginState} from "../../hooks/loginState";
import Left from '../../assets/Left.png';
import Check from '../../assets/Checkmark.png';

const SuccessOrder = () => {
  let [state, user, token] = useLoginState();

  let navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center w-full" style={{ height: '90vh' }}>
      <div className="absolute left-0">
        <Image preview={false} width={230} height={670} src={Left}/>
      </div>
      <div className="z-10 h-fit card_success p-6 rounded-lg">
        <div className="middle_success">
          <Image preview={false} style={{margin: "0 auto"}} src={Check}/>
        </div>
        <div className="middle_success">
          <div style={{color: "rgba(0, 0, 0, 0.5)"}}>Hey, {user?.name}...</div>
        </div>
        <div className="middle_success">
          <div className={"text-xl font-bold"}>
            Đơn hàng của bạn đã được xác nhận!
          </div>
        </div>
        <div className="middle_success">
          <div className={"text-lg"}>
            Chúng tôi sẽ gửi thông báo tình trạng đơn hàng của bạn thông qua email.
            <br />
            Hãy chú ý theo dõi nhé!
          </div>
        </div>
        <div className="middle_success pt-6">
          <Button
            className="return_success"
            onClick={e => {
              navigate('/');
            }}
          >Về trang chủ</Button>
        </div>
      </div>
    </div>
  )
}

export default SuccessOrder;
