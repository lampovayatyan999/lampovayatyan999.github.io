import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';   // ← ОБЯЗАТЕЛЬНО
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>          // ← ОБЁРТКА
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();