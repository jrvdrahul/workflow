import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
} from 'reactstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import * as actionTypes from '../store/action'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  // login event
  login = (e) => {
    e.preventDefault();

    if (this.state.email === '' || this.state.email === undefined) {
      NotificationManager.error('Email is required', 'Error!',1000);
      return false;
    } else if (
      this.state.password === '' ||
      this.state.password === undefined
    ) {
      NotificationManager.error('Password is required', 'Error!',1000);
      return false;
    }


    var result=this.props.user.find(data=>data.email.toLowerCase()===this.state.email.toLowerCase())
    
    if(result){
      if(result.password===this.state.password){
        localStorage.setItem('token', 'a2wqswq2wsed');
        this.setState({ success: true });
      }else{
        NotificationManager.error('Incorrect Password', 'Error!',1000);
      }
    }
    else{
      NotificationManager.error('User not found', 'Error!',1000);
    }

  };

  render() {
    if (this.state.success) {
      return <Redirect to="workflow" />;
    }

    return (
        <section id="login" className="perfect-center">
          <div className="login">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <h3 className="text-center">Login</h3>
                {/* login form */}
                <Form onSubmit={this.login}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="far fa-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onChange={(event) =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-asterisk"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={(event) =>
                          this.setState({ password: event.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" /> Remember me
                    </Label>
                  </FormGroup>

                  <div className="text-center">
                    <Button className="mt-4 width100" color="primary" type="submit">
                      Login
                    </Button>
                  </div>
                  <div className="mt-4 blue-text text-center">
                    Don't have an Account ? Sign up here
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
          <NotificationContainer />
        </section>
    );
  }
}

const mapStateToProps = state =>{
  return{
    user:state.user,
    isAuthenticated:state.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveWorkflow: (val) => dispatch({type: actionTypes.SAVEWORKFLOW,val:val}),
    logged: (val) => dispatch({type:actionTypes.LOGGED,val:val })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
