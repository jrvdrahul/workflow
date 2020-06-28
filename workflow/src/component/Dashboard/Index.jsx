import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// core components

import Workflow from './Workflow';
import EditWorkflow from './EditWorkflow';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
    };
  }
  render() {
    if (
      this.state.token === '' ||
      this.state.token === null ||
      this.state.token === 'undefined'
    ) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard/createWorkflow/" component={EditWorkflow} />
            <Route
              path="/dashboard/editWorkflow/:id"
              component={EditWorkflow}
            />
            <Route path="/dashboard/index" component={Workflow} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Dashboard;
