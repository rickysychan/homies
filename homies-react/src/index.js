import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './styles/index.css';
import 'react-fontawesome';
import App from './App';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
