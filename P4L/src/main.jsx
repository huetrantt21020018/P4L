import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './components/login/login.tsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
);
