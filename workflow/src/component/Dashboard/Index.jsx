import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// core components

import Workflow from './Workflow';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
    };
  }
  render() {
    console.log(this.state.token == null);
    // if (
    //   this.state.token == '' ||
    //   this.state.token == null ||
    //   this.state.token == 'undefined'
    // ) {
    //   alert();
    //   return <Redirect to="/" />;
    // }
    return (
      <>
        {/* <Sidebar /> */}
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard/index" component={Workflow} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Dashboard;
