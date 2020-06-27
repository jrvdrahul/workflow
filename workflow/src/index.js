import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import Signup from './component/Register';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/signUp" component={Signup} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
