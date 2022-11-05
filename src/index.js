import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth } from './context/AuthContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth>
      <App />
    </Auth>
  </React.StrictMode>
);
