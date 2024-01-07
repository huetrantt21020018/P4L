import { Select, Input, Steps, Button, Spin, notification } from "antd";
import "./index.css";
import FloatLabel from "../../components/float_lable/";

import {useEffect, useMemo, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {useLoginState} from "../../hooks/loginState";
import {Cart, PaymentMethod} from "../../api/types";
import {CartApi} from "../../api/api2/cart";
import PlantCard from "../cart/plant_card";
import Footer from "./footer";
import {PaymentMethodApi} from "../../api/api2/payment_method";
import {OrderApi} from "../../api/api2/order";
import {CartContext} from "../../context/cartContext";
// @ts-ignore
import location from "../../assets/final.json";

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
          value={props.value}
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
  payment?: boolean;
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

  let fill = useMemo(() => {
    return () => {
      if (user?.userAddress) {
        let a = user.userAddress;
        props.onExtra?.(a.extra);
        props.onCity?.(a.city);
        props.onProvince?.(a.province);
        props.onStreet?.(a.street);
        props.onWard?.(a.ward);
        props.onCountry?.('VNM');
      }
    }
  }, [user])

  useEffect(() => {
    load();
  }, [token])

  useEffect(() => {
    fill();
  }, [user]);

  // @ts-ignore
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
                      value={props.country}
                      onChange={e => props.onCountry?.(e)}
                      options={[{ value: 'VNM', label: 'Việt Nam' }]}
              />
            </FloatLabel>
          </div>

          <HalfSelectButton label="Tỉnh" name="province"
                            value={props.province} onChange={e => props.onProvince?.(e)}
                            getData={() => Object.keys(location).map(r => ({
                              label: r,
                              value: r
                            }))}/>
          <HalfSelectButton label="Thành phố/Quận" name="city"
                            value={props.city} onChange={e => props.onCity?.(e)}
                            getData={
                              () => props.province
                                ? Object.keys(location[props.province] ?? {}).map(r => ({
                                  label: r,
                                  value: r
                                }))
                                : []
                            }/>

          <HalfSelectButton label="Phường" name="ward"
                            value={props.ward} onChange={e => props.onWard?.(e)}
                            getData={
                              () => (props.province && props.city)
                              ? location[props.province]?.[props.city]?.map(r => ({ label: r, value: r })) : []
                            }
                            />
          <div className={"col-span-1"}>
            <FloatLabel label="Đường" name="street" value={props.street}>
              <Input
                className="text-box text-xl"
                value={props.street}
                onChange={e => props.onStreet?.(e.target.value)} />
            </FloatLabel>
          </div>

          <div className={"col-span-2"}>
            <FloatLabel label="Địa chỉ cụ thể" name="extraAddress" value={props.extra}>
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

          {props.payment !== false && (
            <HalfSelectButton label="Phương thức thanh toán" name="paymentMethod"
                              value={props.paymentMethodId} onChange={e => props.onPayment?.(e)}
                              // @ts-ignore
                              getData={() => [{ id: -1, cardNumber: 'Thanh toán khi nhận hàng' }].concat(paymentMethodList).map(r => {
                                return {
                                  label: r.cardNumber,
                                  value: r.id
                                }
                              })}/>
          )}
        </div>
      </div>



      <div className={"flex flex-row justify-end"}>
        <button
          className={"cursor-pointer bg-[#B9E4D5] font-bold text-lg uppercase border-0 mx-6 py-4 px-16 rounded-md"}
          onClick={() => props.onSubmit?.()}>
          Xác nhận
        </button>
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

  let [paymentMethodId, setPayment] = useState(-1);

  let cc = useContext(CartContext);

  let [noti, ctx] = notification.useNotification();

  let fill = useMemo(() => {
    return () => {
      if (user?.detail) {
        setEmail(user?.detail.email);
      }
    }
  }, [user]);

  useEffect(() => {
    fill();
  }, [user])

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
export { AddressForm, ContactForm };
