import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/styles.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
     <CookiesProvider>  
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


