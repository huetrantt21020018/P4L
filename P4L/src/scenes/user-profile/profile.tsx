import {Avatar, Button, DatePicker, Input, notification, Select, Space} from 'antd';
// @ts-ignore
import moment from 'moment';
import {AddressForm, ContactForm} from '../checkout/index';
import {useEffect, useState} from 'react';
import {useLoginState} from "../../hooks/loginState";
import User from "../../types/user";
import {LoginState} from "../../types/loginState";
import {UserApi} from "../../api/api2/user";
import {UserAddressApi} from "../../api/api2/user_address";
import {UserDetail} from "../../types/userDetail";
import {UserDetailApi} from "../../api/api2/user_detail";

const InputField = (props : { value: string, onChange?: (v: string) => void, title: string }) => {
  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-opensans font-semibold'>{props.title}</div>
      <Input className='text-xl font-opensans'
             placeholder={props.title}
             value={props.value}
             onChange={e => props.onChange?.(e)}
             style={{height: "3rem"}}/>
    </div>
  )
}

const DateField = (props : { value: ReturnType<typeof moment>, onChange?: (v: string) => void, title: string }) => {
  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-opensans font-semibold'>{props.title}</div>
      <DatePicker className='text-xl font-opensans' value={props.value} onChange={e => props.onChange?.(e)} format={"DD/MM/YYYY"} style={{height: "3rem", width: "14rem"}}/>
    </div>
  )
}

const PasswordField = (props) => {
  let [state, user, token] = useLoginState();
  let [loading, setLoading] = useState(false);
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [noti, notiContextHolder] = notification.useNotification();

  let [p1, setP1] = useState('');
  let [p2, setP2] = useState('');
  let [p3, setP3] = useState('');

  let load = () => {
    let api = new UserApi(token);

    setLoading(true);
    api.changePassword(p3, p1)
      .then((rs) => {
        if (rs.success) {
          noti.success({
            message: 'Đổi mật khẩu thành công'
          })
          window.location.reload()
        } else {
          noti.error({
            message: rs.error
          })
        }
      })
      .catch(() => {
        noti.error({
          message: 'Có lỗi xảy ra khi đổi mật khẩu'
        })
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Space direction='vertical' style={{width: "40rem", marginLeft: "-1.5rem"}}>
      {notiContextHolder}
      <Space direction='horizontal' style={{width: "60rem"}}>
        <div style={{paddingLeft: "3rem", marginTop: "1rem", width: "21.25rem"}}>
          <div className='text-xl font-semibold'>
            Mật khẩu mới
          </div>
          <Input.Password
            value={p1} onChange={e => setP1(e.target.value)}
            placeholder="Mật khẩu mới"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            style={{height: "4rem"}}
          />
        </div>
        <div style={{paddingLeft: "0.75rem", marginTop: "1rem", width: "21.25rem"}}>
          <div className='text-xl font-semibold'>
            Nhập lại mật khẩu mới
          </div>
          <Input.Password
            value={p2} onChange={e => setP2(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            style={{height: "4rem"}}
          />
        </div>
      </Space>

      <div style={{paddingLeft: "3rem", marginTop: "1rem", width: "43.75rem"}}>
        <div className='text-xl font-semibold'>Mật khẩu hiện tại</div>
        <Input.Password
          value={p3} onChange={e => setP3(e.target.value)}
          placeholder="Mật khẩu hiện tại"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          style={{height: "4rem"}}
        />
      </div>

      <div className={"flex flex-row justify-end"} style={{paddingLeft: "3rem", marginTop: "1rem", width: "43.75rem"}}>
        <Button disabled={!p1 || !p2 || !p3 || p1 !== p2 || loading} onClick={load}>Đổi mật khẩu</Button>
      </div>
    </Space>
  )
}

const ProfileFields = (props) => {
  let [noti, notiContextHolder] = notification.useNotification();
  let [state, u, token] = useLoginState();
  let [user, setUser] = useState<User | null>();

  let [loading, setLoading] = useState(false);

  let [country, setCountry] = useState('');
  let [province, setProvince] = useState('');
  let [city, setCity] = useState('');
  let [ward, setWard] = useState('');
  let [street, setStreet] = useState('');
  let [phone_number, setPhone] = useState('');

  let [extra, setExtra] = useState('');
  let [email, setEmail] = useState('');

  let [paymentMethodId, setPayment] = useState(0);

  let [addressId, setAddressId] = useState(0);

  let [orig, setDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (state === LoginState.LoggedIn) {
      setUser(JSON.parse(JSON.stringify(u)));
    }
  }, [u, state]);

  useEffect(() => {
    setDetail(JSON.parse(JSON.stringify(u.detail)));
  }, [u])



  let submit = () => {
    if (!user) return;
    setLoading(true);
    let detailApi = new UserDetailApi(token);
    let p = detailApi.put(orig.id, orig);

    let userApi = new UserApi(token);
    let p1 = userApi
      .put(user.id, {
        ...user,
        detail: null,
        roles: null,
        userAddress: null,
        password: ''
      });

    let api = new UserAddressApi(token);

    let p2 = api.put(addressId, {
      id: addressId,
      userId: user.id,
      city, province, ward, street, phoneNumber: phone_number, extra,
      status: 1
    })
      .then(rs => {
        if (rs.success) {
          noti.success({
            message: 'Thay đổi thông tin thành công'
          })
        } else {
          noti.error({
            message: rs.error
          })
        }
      })
      .catch(() => {
      noti.error({
        message: `Có lỗi khi thay đổi thông tin`
      })
    });

    Promise.all([p, p1, p2])
      .then(() => {
        window.location.reload();
      })
  }

  useEffect(() => {
    let api = new UserApi(token);
    api.self()
      .then(rs => {
        if (rs.success) {
          let { data } = rs;
          if (data.userAddress) {
            let d = data.userAddress;
            setAddressId(d.id);
            setCountry('VNM');
            setCity(d.city);
            setProvince(d.province);
            setWard(d.ward);
            setStreet(d.street);
            setPhone(d.phoneNumber);
            setExtra(d.extra);
          }
          if (data.detail) {
            setEmail(data.detail.email);
            setDetail(data.detail);
          }
        }
      })
  }, [u, state, token]);

  return (
    <div>
      {notiContextHolder}
      <div className='text-3xl font-semibold' style={{width: "100%", marginTop: "1rem", marginLeft: "1rem"}}>Trang cá nhân</div>
      <div className='flex' style={{width: "45rem", marginLeft: "1rem"}}>
        <Avatar size={180} src={user?.detail?.avatarUrl} style={{marginTop: "1rem"}}>
        </Avatar>
        <div style={{height: "wrap-content", width: "30rem"}}>
          <InputField value={user?.name} title="Họ và tên"
                      onChange={v => {
                        setUser({ ...user, name: v });
                      }} />
          <div className='grid grid-cols-2 gap-3'>
            <DateField value={orig?.dateOfBirth ? moment(new Date(orig?.dateOfBirth)) : undefined}
                       onChange={v => setDetail({
                         ...orig,
                         dateOfBirth: new Date(v).toJSON()
                       })}
                       title="Ngày sinh" />
          </div>
        </div>
      </div>
      <div style={{width: "46.75rem"}}>
        <ContactForm email={email} onChange={setEmail}/>
        <AddressForm
          country={country} onCountry={() => {}}
          province={province} onProvince={setProvince}
          city={city} onCity={setCity}
          ward={ward} onWard={setWard}
          street={street} onStreet={setStreet}
          phone_number={phone_number} onPhone={setPhone}
          extra={extra} onExtra={setExtra}
          payment={false}
          onSubmit={() => {
            if (!loading) {
              submit();
            }
          }}
        />
      </div>
      <PasswordField />
    </div>
  );
}

const PaymentAccountNumber = (props) => {
  let data = props.id.slice(-3).padStart(props.id.length, '*');
  return (
    <div className='grid grid-rows-1' style={{height: "3.5rem", width: "35rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09)"}}>
      <img src={props.url} style={{width: "2.5rem", height: "2.5rem", marginTop: "0.5rem", marginLeft: "1rem"}}></img>
      <div className='relative font-opensans font-semibold text-xl' style={{bottom: "2rem", left: "5rem"}}>{data}</div>
    </div>
  );
}

const ProfileView = (props) => {
  let accountNumber = [
    {
      id: "1232138410",
      url: "/src/scenes/user-profile/vietcombank.png"
    },
    {
      id: "1232321138974",
      url: "/src/scenes/user-profile/bidv.png"
    },
    {
      id: "1232138184",
      url: "/src/scenes/user-profile/master-card.png"
    },
  ];

  if (!props.show) {
    return <></>
  }

  return (
    <div style={{width: "90%", marginLeft: "4.5rem"}}>
      <ProfileFields></ProfileFields>
      <div className='relative grid grid-cols-1' style={{width: "20rem", left: "50rem", bottom: "64rem", rowGap: "1rem"}}>
        <div className='text-xl font-semibold font-opensans'>Phương thức thanh toán</div>
        {accountNumber.map(
          account => {
            return <PaymentAccountNumber url={account.url} id={account.id}/>
          }
        )}
        <Button style={{height: "4rem", backgroundColor: "#B9E4D5"}}>
          <div className='font-opensans font-semibold'>Thêm phương thức thanh toán</div>
        </Button>
        <img className='relative' src="/src/scenes/user-profile/plus.png" style={{bottom: "3.7rem", left: "9.5rem"}}></img>
      </div>
    </div>
  );
}

export default ProfileView;
export { AddressForm, ContactForm };
