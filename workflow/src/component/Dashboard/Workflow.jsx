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
  Container,
} from 'reactstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Workflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  render() {
    if (this.state.success) {
      return <Redirect to="dashboard/index" />;
    }
    return (
      <>
        <Container fluid>
          <section id="workflow" className="">
            <Row className="header">
              <Col></Col>
              <Col>Logout</Col>
            </Row>
            <Row className="actionBar"></Row>
            <Row className="workflowList">
              <Col md="3">
                <Card>
                  <CardBody>
                    <div>Completed</div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <CardBody>
                    <div>Completed</div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <NotificationContainer />
          </section>
        </Container>
      </>
    );
  }
}

export default Workflow;
