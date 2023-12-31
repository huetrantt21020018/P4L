import { Select, Input, Steps, Button, Spin, notification } from "antd";
import "./index.css";
import FloatLabel from "../../components/float_lable/";

import {useEffect, useMemo, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {getCountryList, getProvinceList, getCityList, getDistrictList, getStreetList, getPaymentMethod, UserDataForm} from "./get_data";
import {useLoginState} from "../../hooks/loginState";
import {Cart, PaymentMethod} from "../../api/types";
import {CartApi} from "../../api/api2/cart";
import PlantCard from "../cart/plant_card";
import Footer from "./footer";
import {PaymentMethodApi} from "../../api/api2/payment_method";
import {OrderApi} from "../../api/api2/order";
import {CartContext} from "../../context/cartContext";

const CheckoutTimeLine = () => {
  return (
    <Steps className="time-line font-opensans"
      progressDot
      current={1}
      size="small"
      items={[
        {
          title: 'Mua sắm',
        },
        {
          title: 'Đặt hàng',
        },
        {
          title: 'Xác nhận',
        },
      ]}
    />
  )
}

const ContactForm = ({ email, onChange } : { email: string, onChange?: (s: string) => void }) => {
  return (
    <>
      <div className={"px-6 pt-4"}>
        <div className="text-xl font-bold pb-2">
          Liên hệ
        </div>

        <FloatLabel label="Email" name="email" focus={email ? true : undefined}>
          <Input
            className="text-box text-base"
            value={email}
            onChange={e => onChange(e.target.value)} />
        </FloatLabel>
      </div>
    </>
  )
}

const HalfSelectButton = (props) => {
  return (
    <div className="w-full">
      <FloatLabel label={props.label} name={props.name} focus={props.value ? true : undefined} value={props.value}>
        <Select style={{height: "60px", width: "100%", fontSize: "50px"}}
          defaultValue=""
          onChange={e => props.onChange(e)}
          options={
            props.getData()
          }
        />
      </FloatLabel>
    </div>
  )
}

const AddressForm = (props : {
  country: string, onCountry?: (c: string) => void,
  province: string, onProvince?: (c: string) => void,
  city: string, onCity?: (c: string) => void,
  ward: string, onWard?: (c: string) => void,
  street: string, onStreet?: (c: string) => void,
  phone_number: string, onPhone?: (c: string) => void,
  extra: string, onExtra?: (c: string) => void,

  paymentMethodId: number, onPayment?: (c: number) => void,

  onSubmit?: () => void;
}) => {
  let [state, user, token] = useLoginState();
  let [paymentMethodList, setPaymentMethodList] = useState<PaymentMethod[]>([]);

  let load = useMemo(() => {
    return () => {
      let api = new PaymentMethodApi(token);

      api.list()
        .then(rs => {
          if (rs.success) {
            setPaymentMethodList(rs.data);
          }
        })
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [token])

  return (
    <div className="space-y-px">
      <div className={"px-6 py-4"}>
        <div className="text-xl font-bold pb-2">
          Địa chỉ giao hàng
        </div>

        <div className={"grid grid-cols-2 gap-x-6"}>
          <div className={"col-span-2"}>
            <FloatLabel label="Quốc gia" name="country" value={props.country} focus={props.country ? true : undefined}>
              <Select style={{height: "60px", width: "100%"}}
                      onChange={e => props.onCountry?.(e)}
                      options={
                        getCountryList()
                      }
              />
            </FloatLabel>
          </div>

          <HalfSelectButton label="Tỉnh" name="province"
                            value={props.province} onChange={e => props.onProvince?.(e)} getData={getProvinceList}/>
          <HalfSelectButton label="Thành phố/Quận" name="city"
                            value={props.city} onChange={e => props.onCity?.(e)} getData={getCityList}/>

          <HalfSelectButton label="Phường" name="ward"
                            value={props.ward} onChange={e => props.onWard?.(e)} getData={getDistrictList}/>
          <HalfSelectButton label="Đường" name="city"
                            value={props.street} onChange={e => props.onStreet?.(e)} getData={getStreetList}/>

          <div className={"col-span-2"}>
            <FloatLabel label="Địa chỉ khác" name="extraAddress" value={props.extra}>
              <Input
                className="text-box text-xl"
                value={props.extra}
                onChange={e => props.onExtra?.(e.target.value)} />
            </FloatLabel>
          </div>

          <FloatLabel label="Số điện thoại" name="phoneNumber" value={props.phone_number}>
            <Input
              className="text-box text-xl"
              value={props.phone_number}
              onChange={e => props.onPhone?.(e.target.value)} />
          </FloatLabel>

          <HalfSelectButton label="Phương thức thanh toán" name="paymentMethod"
                            value={props.paymentMethodId} onChange={e => props.onPayment?.(e)}
                            getData={() => paymentMethodList.map(r => {
                              return {
                                label: r.cardNumber,
                                value: r.id
                              }
                            })}/>
        </div>
      </div>



      <div style={{paddingRight: "50px"}}>
        <Button
          type="default"
          onClick={() => props.onSubmit?.()}
        >Xác nhận</Button>
      </div>
    </div>
  )
}

const RightHeader = () => {
  return (
    <div className={"font-opensans opacity-70"}>
      <div>
        <label className="text-xl font-bold">
          30 Day guarantee
        </label>
      </div>
      <div>
        <label className="text-lg">
          Cây trồng và hạt giống sẽ được bảo quản trong điều kiện tốt nhất khi đang giao. Nếu không, chúng tôi cam kết sẽ thay thế hoàn toàn miễn phí.
        </label>
      </div>
    </div>
  )
}

const Checkout = (props) => {
  let [loginState, user, token] = useLoginState();
  let [cart, setCart] = useState<Cart[]>([]);
  let [loading, setLoading] = useState(false);
  let f = new Intl.NumberFormat('vi-VN');

  let [country, setCountry] = useState('');
  let [province, setProvince] = useState('');
  let [city, setCity] = useState('');
  let [ward, setWard] = useState('');
  let [street, setStreet] = useState('');
  let [phone_number, setPhone] = useState('');

  let [extra, setExtra] = useState('');
  let [email, setEmail] = useState('');

  let [paymentMethodId, setPayment] = useState(0);

  let cc = useContext(CartContext);

  let [noti, ctx] = notification.useNotification();

  let load = () => {
    setLoading(true);
    let c = new CartApi(token);
    c.list()
      .then(rs => {
        if (rs.success) {
          setCart(rs.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, [token])

  let navigate = useNavigate();
  const routeChange = () =>{
    navigate(`/success`);
  }
  return (
    <div className="app bg-[#F4F4F4]">
      {ctx}
      <div className="card font-opensans sticky top-16">
        <CheckoutTimeLine/>
        <ContactForm email={email} onChange={setEmail}/>
        <AddressForm
          country={country} onCountry={setCountry}
          province={province} onProvince={setProvince}
          city={city} onCity={setCity}
          ward={ward} onWard={setWard}
          street={street} onStreet={setStreet}
          phone_number={phone_number} onPhone={setPhone}
          extra={extra} onExtra={setExtra}
          paymentMethodId={paymentMethodId} onPayment={setPayment}

          onSubmit={() => {

            let c = new OrderApi(token);
            c.createOrder({
              country, province, city, ward, street, phoneNumber: phone_number,
              extra, email, cart_id: cart.map(r => r.id),
              userPaymentMethodId: paymentMethodId
            })
              .then(rs => {
                if (rs.success) {
                  noti.success({
                    message: 'Tạo đơn hàng thành công!'
                  });
                  navigate('/success');
                  cc.onChange();
                } else {
                  noti.error({
                    message: rs.error
                  });
                }
              })
              .catch(() => {
                noti.success({
                  message: 'Tạo đơn hàng thất bại!'
                });
              })
              .finally(() => {
                setLoading(false);
              })

          }}
        />
      </div>
      <div className="card font-opensans pb-0">
        <RightHeader/>
        <br />

        <div className={"flex flex-col gap-4 pb-4"}>
          {loading && <Spin />}
          {!loading && cart.map(c => {
            return <PlantCard key={c.id}
                              cart={c}
                              onReload={() => {
                                load();
                              }}
                              onDelete={() => {
                                let cc = new CartApi(token);
                                cc.delete(c.id)
                                  .then(rs => {
                                    if (rs.success) {
                                      load();
                                    }
                                  })
                              }}/>
          })}
        </div>
        <div className={"sticky bottom-0 bg-[#F4F4F4]"}>
          <Footer cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
