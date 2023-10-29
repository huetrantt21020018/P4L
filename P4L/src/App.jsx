// app.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import reactLogo from './assets/react.svg';

function App() {
  const [selectedOption, setSelectedOption] = useState('home');

  // Callback function to update the selectedOption in the root component
  const handleOptionChange = (option) => {
    setSelectedOption(option);

  };

  return (
    <>
      {/* Render other components */}
      <Header />
      <Sidebar name="user" avatar={reactLogo} selectedOption={selectedOption} onOptionChange={handleOptionChange} />
    </>
    
  );
}

export default App;