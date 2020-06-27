import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  Row,
  Col,
} from 'reactstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  login = (e) => {
    e.preventDefault();
    if (this.state.email == '' || this.state.email == undefined) {
      NotificationManager.error('Email is required', 'Error!');
      return false;
    } else if (this.state.password == '' || this.state.password == undefined) {
      NotificationManager.error('Password is required', 'Error!');
      return false;
    }
    localStorage.setItem('token', 'a2wqswq2wsed');
    this.setState({ success: true });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="dashboard/index" />;
    }
    return (
      <>
        <section id="login" className="perfect-center">
          <div className="login">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <h3 className="text-center">Login</h3>
                <Form onSubmit={this.login}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onChange={(event) =>
                          this.setState({ email: event.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
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

                  <div className="text-center ">
                    <Button className="mt-4" color="secondary" type="submit">
                      Login
                    </Button>
                  </div>
                  <div className="mt-4">
                    Don't have an Account ?<Link to="signUp">Sign up here</Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
          <NotificationContainer />
        </section>
      </>
    );
  }
}

export default Login;
