import React from 'react';
import { IoLogOut } from 'react-icons/io5';

function Header() {
  const headerStyle = {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '30px',
    backgroundColor: '#001C41',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    padding: '10px 20px',
  };

  const projectNameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const logoutIconStyle = {
    fontSize: '24px',
    cursor: 'pointer',
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div style={headerStyle}>
      <div style={projectNameStyle}>P4L</div>
      <IoLogOut style={logoutIconStyle} onClick={handleLogout} />
    </div>
  );
}

export default Header;