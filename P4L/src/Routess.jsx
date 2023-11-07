import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QlkDssp from './QlkDssp';
import QlkCtsp from './QlkCtsp';

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<QlkDssp />} />
      <Route path="/detail/:productID" element={<QlkCtsp />} />
    </Routes>
  )
};

export default Routess;