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

var data = [
  {
    name: 'workflow1',
    state: 'completed',
  },
  {
    name: 'workflow2',
    state: 'pending',
  },
  {
    name: 'workflow2',
    state: 'completed',
  },
];

class Workflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflows: [],
      success: false,
    };
  }

  componentDidMount() {
    this.setState({
      workflows: data,
    });
  }

  stateChange(index) {
    data[index].state = 'pending';
    this.setState({ workflows: data });
  }

  WorkflowDelete(index) {
    data.splice(index, 1);
    this.setState({ workflows: data });
  }

  render() {
    if (this.state.success) {
      return <Redirect to="dashboard/index" />;
    }

    let workflows = this.state.workflows;
    return (
      <>
        <Container fluid>
          <section id="workflow" className="">
            <Row className="header">
              <Col></Col>
              <Col className="text-right">
                <Button color="secondary">Logout</Button>
              </Col>
            </Row>
            <Row className="actionBar">
              <Col md="4">
                <div>Search workflows based on workflow name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText></InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="search"
                      type="password"
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="2">
                <FormGroup></FormGroup>
              </Col>
              <Col md="6" className="text-right">
                <Button color="secondary">Create Workflow</Button>
              </Col>
            </Row>
            <Row className="workflowList">
              {workflows.map((data, index) => (
                <Col md="3">
                  <Card>
                    <div onClick={() => this.WorkflowDelete(index)}>
                      <i class="fas fa-trash"></i>
                    </div>
                    <CardBody>
                      <div>{data.name}</div>
                      <Row>
                        <Col>
                          <div>{data.state}</div>
                        </Col>
                        <Col>
                          <div onClick={() => this.stateChange(index)}>
                            <i class="fas fa-check-circle"></i>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <NotificationContainer />
          </section>
        </Container>
      </>
    );
  }
}

export default Workflow;
