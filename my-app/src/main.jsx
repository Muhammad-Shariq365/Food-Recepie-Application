import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import  GlobalState from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>
  </BrowserRouter>
);
