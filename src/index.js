import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import Home from '@/components/Home/home.js'
import RecipeBox from '@/components/RecipeBox/recipe_box.js'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <HashRouter>
    <App>
      <Route path='/home' component={Home}></Route>
      <Route path='/' component={RecipeBox}></Route> 
    </App>
  </HashRouter>
, document.getElementById('root'));
registerServiceWorker();
