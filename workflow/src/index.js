import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Signup from './component/Register';
import Dashboard from './component/Dashboard/Index';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer'
const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signUp" component={Signup} />
      <Route path="/" component={App} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
