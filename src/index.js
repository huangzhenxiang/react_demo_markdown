import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import Home from '@/components/Home/home'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App>
      <Route path='/' component={Home}></Route> 
    </App>
  </HashRouter>
, document.getElementById('root'));
registerServiceWorker();
