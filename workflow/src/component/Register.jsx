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
} from 'reactstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  register = (e) => {
    e.preventDefault();
    if (this.state.email === '' || this.state.email === undefined) {
      NotificationManager.error('Email is required', 'Error!');
      return false;
    } else if (
      this.state.password === '' ||
      this.state.password === undefined
    ) {
      NotificationManager.error('Password is required', 'Error!');
      return false;
    } else if (
      this.state.confirmPassword === '' ||
      this.state.confirmPassword === undefined
    ) {
      NotificationManager.error('Confirm Password is required', 'Error!');
      return false;
    } else if (this.state.password === this.state.confirmPassword) {
      NotificationManager.error('Password do not matched', 'Error!');
      return false;
    }
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
                <h3 className="text-center">Sign up</h3>
                <Form onSubmit={this.register}>
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
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fas fa-asterisk"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(event) =>
                          this.setState({ confirmPassword: event.target.value })
                        }
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="text-center ">
                    <Button className="mt-4" color="secondary" type="submit">
                      Sign up
                    </Button>
                  </div>
                  <div className="mt-4">
                    Already have an Account ? <Link to="/">Login here</Link>
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

export default Register;
