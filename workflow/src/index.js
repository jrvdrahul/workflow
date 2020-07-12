import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import ProtectedRoute from './ProtectedRoute';
import App from './App';
import Workflow from './component/Dashboard/Workflow';
import EditWorkflow from './component/Dashboard/EditWorkflow';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer'
const store = createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <Switch>
      <ProtectedRoute path="/editWorkflow/:id" component={EditWorkflow} />
      <ProtectedRoute path="/createWorkflow/" component={EditWorkflow} />
      <ProtectedRoute path="/workflow" component={Workflow} />
      <Route path="/" component={App} />
    </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
