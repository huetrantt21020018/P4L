import React, { useState } from 'react';
import { Menu, Avatar, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment';

const Banner = (props) => {
  return (
    <div className="w-100% flex font-opensans" style={{height: "15rem", backgroundColor: "#E8F8FA"}}>
      <div style={{height: "400px", width: "12rem", paddingLeft: "7.5rem", paddingTop: "2rem"}}>
        <div className="font-opensans text-sm" style={{color: "#106A7D"}}>
          Khách hàng từ {props.creationYear}
        </div>
        <div className="font-poppins text-3xl" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          Xin chào,
        </div>
        <div className="font-poppins text-3xl">
          {props.username}
        </div>
      </div>
      <div className="relative" style={{height: "400px", width: "8rem", left: "60rem", textAlign: "right", paddingTop: "2rem"}}>
        <div className="text-sm" style={{color: "#106A7D"}}>
          Tổng số đơn hàng
        </div>
        <div className="text-3xl" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
          {props.orderCount}
        </div>
        <Button className="bg-[#B9E4D5]" style={{width: "9rem", height: "3rem", border: "none"}}>
          Lịch sử mua
        </Button>
      </div>
    </div>
  );
}

const InputField = (props) => {
  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-opensans font-semibold'>{props.title}</div>
      <Input className='text-xl font-opensans' placeholder={props.title} defaultValue={props.defaultValue} style={{height: "3rem"}}/>
    </div>
  )
}

const dateFormat = "DD/MM/YYYY";

const DateField = (props) => {
  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-opensans font-semibold'>{props.title}</div>
      <DatePicker className='text-xl font-opensans' defaultValue={props.defaultValue} format={dateFormat} style={{height: "3rem", width: "14rem"}}/>
    </div>
  )
}

const SelectField = (props) => {
  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-opensans font-semibold'>{props.title}</div>
      <Select className='text-xl font-opensans'
        defaultValue={props.defaultValue}
        style={{height: "3rem", width: "14rem"}}
        options={props.options}
      />
    </div>
  )
}

const PasswordField = (props) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <div style={{width: "100%", paddingLeft: "3rem", marginTop: "1rem"}}>
      <div className='text-xl font-semibold'>{props.title}</div>
      <Input.Password
        placeholder={props.title}
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        style={{height: "3rem"}}
      />
    </div>
  )
}

const ProfileFields = (props) => {
  let date = moment('2020-06-09');
  let name = "Donald Đức";
  let options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Không', label: 'Không' },
  ];

  return (
    <div>
      <div className='text-3xl font-semibold' style={{width: "100%", marginTop: "1rem", marginLeft: "1rem"}}>Trang cá nhân</div>
      <div className='flex' style={{width: "45rem", marginLeft: "1rem"}}>
        <Avatar size={180} src="/src/scenes/user-profile/image 2.png" style={{marginTop: "1rem"}}>
        </Avatar>
        <div style={{height: "wrap-content", width: "30rem"}}>
          <InputField defaultValue={name} title="Họ và tên"></InputField>
          <div className='grid grid-cols-2 gap-3'>
            <DateField defaultValue={date} title="Ngày sinh"></DateField>
            <SelectField defaultValue="Nam" options={options} title="Giới tính"></SelectField>
          </div>
        </div>
      </div>
      <div className='flex' style={{width: "47.25rem", marginLeft: "-2rem"}}>
        <InputField title="Email"></InputField>
      </div>
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

  return (
    <div style={{width: "90%", height: "30rem", marginLeft: "4.5rem"}}>
      <ProfileFields></ProfileFields>
      <div className='relative grid grid-cols-1' style={{width: "20rem", left: "50rem", bottom: "31rem", rowGap: "1rem"}}>
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
      <Button className='relative' style={{left: "80rem", width: "10rem", height: "4rem"}}>
        Lưu
      </Button>
    </div>
  );
}

// need to pass data to Banner
const UserProfile = (props) => {
  const [profileState, setProfileState] = useState("profile");
  const items = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      style: { width: '9rem', textAlign: "center", familyFont: "open-sans"},
    },
    {
      key: "order",
      label: "Đơn hàng",
      style: { width: '9rem', textAlign: "center"},
    },
    {
      key: "history",
      label: "Lịch sử mua hàng",
      style: { width: '9rem', textAlign: "center"},
    }
  ];

  const onClickMenu = (e) => {
    console.log(e);
    setProfileState(e.key);
  }

  return (
    <div>
      <Banner username="minhducsun2002" orderCount={10} creationYear={2019}/>
      <Menu selectedKeys={profileState} onClick={onClickMenu} mode={"horizontal"} theme={"light"} items={items}     style={{ borderWidth: 3, marginLeft: "4.5rem"}}>
      </Menu>
      <ProfileView></ProfileView>
      
    </div>
  )
}

export default UserProfile;