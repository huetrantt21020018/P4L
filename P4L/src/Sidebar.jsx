import React, { useState } from 'react';

function Sidebar(props) {

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: 30,
    left: 0,
    width: '200px',
    height: '100%',
    backgroundColor: '#001C41',
    padding: '30px',
    boxSizing: 'border-box',
  };
  const optionStyle = {
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const selectedOptionStyle = {
    ...optionStyle,
    backgroundColor: '#C5DEFD',
  };

  const textStyle = {
    color: 'white',
    textDecoration: 'none',
  };

  const handleOptionClick = (option) => {
    props.onOptionChange(option); // Call the callback function from the root component
  };


  return (
    <div style={sidebarStyle}>
      <img src={props.avatar} alt="Profile Picture" />
      <h2 style={textStyle}>{props.name}</h2>  
      <div
        style={props.selectedOption === 'home' ? selectedOptionStyle : optionStyle}
        onClick={() => handleOptionClick('home')}
      >
        <a href="/" style={textStyle}>Trang chủ</a>
      </div>

      <div
        style={props.selectedOption === 'file' ? selectedOptionStyle : optionStyle}
        onClick={() => handleOptionClick('file')}
      >
        <a href="/" style={textStyle}>Quản lý hồ sơ</a>
      </div>

      <div
        style={props.selectedOption === 'cart' ? selectedOptionStyle : optionStyle}
        onClick={() => handleOptionClick('cart')}
      >
        <a href="/" style={textStyle}>Giỏ hàng</a>
      </div>

      <div
        style={props.selectedOption === 'orders' ? selectedOptionStyle : optionStyle}
        onClick={() => handleOptionClick('orders')}
      >
        <a href="/" style={textStyle}>Đơn mua</a>
      </div>

      <div
        style={props.selectedOption === 'noti' ? selectedOptionStyle : optionStyle}
        onClick={() => handleOptionClick('noti')}
      >
        <a href="/" style={textStyle}>Thông báo</a>
      </div>
    </div>
  )
}

export default Sidebar;
