import React from 'react';
import { render as Render } from 'react-dom';
import App from './App';

Render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
