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

class EditWorkflow extends React.Component {
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
    let workflows = this.state.workflows;
    return (
      <>
        <Container fluid>
          <section id="editWorkflow" className="">
            <Row className="header">
              <Col></Col>
              <Col className="text-right">
                <Button color="secondary">Logout</Button>
              </Col>
            </Row>
            <Row className="actionBar">
              <Col md="4">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText></InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Workflow name"
                      type="text"
                      onChange={(event) =>
                        this.setState({ name: event.target.value })
                      }
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="8" className="text-right">
                <Button color="secondary">Shuffle</Button>
                <Button color="secondary">Delete</Button>
                <Button color="secondary">Add Note</Button>
                <Button color="secondary">Save</Button>
              </Col>
            </Row>
            <Row className="workflowList">
              {workflows.map((data, index) => (
                <Col md="3">
                  <Card>
                    <CardBody>
                      <div>{data.name}</div>
                      <div>
                        <FormGroup>
                          <Input type="textarea" name="text" />
                        </FormGroup>
                      </div>
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

export default EditWorkflow;
