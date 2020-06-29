import React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroup,
  Row,
  Col,
  Container,
} from 'reactstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import data from '../../Data.json';
import Header from './Header';

class Workflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflows: [],
      success: false,
      filter: 0,
    };
  }

  componentDidMount() {
    this.setState({
      workflows: data,
    });
  }

  // workflow state change
  stateChange(event, index) {
    event.preventDefault();
    var pass = data[index].nodes.filter(
      (data) => data.state === 'pending' || data.state === 'progress'
    );

    if (pass.length < 1) {
      if (data[index].state === 'pending') {
        data[index].state = 'completed';
      } else {
        data[index].state = 'pending';
      }
      this.setState({ workflows: data });
    } else {
      NotificationManager.error('Complete all node first', 'Error!');
    }
  }

  // delete workflow
  WorkflowDelete(event, index) {
    event.preventDefault();
    data.splice(index, 1);
    this.setState({ workflows: data });
  }

  // search workflow
  filterList(event) {
    var list = data;
    var result = list.filter((list) => list.name.includes(event.target.value));
    this.setState({ workflows: result });
  }

  // filter workflow
  filter = (e) => {
    var list = data;
    if (e.target.value === 'All') {
      this.setState({ workflows: data });
    } else {
      var result = list.filter((list) => list.state === e.target.value);
      this.setState({ workflows: result });
    }
  };

  render() {
    if (this.state.success) {
      return <Redirect to="dashboard/index" />;
    }

    let workflows = this.state.workflows;
    return (
      <>
        <Container fluid>
          <section id="workflow" className="">
            {/* header */}
            <Header />
            {/* action bar */}
            <Row className="actionBar">
              <Col md="4">
                <div>Search workflows based on workflow name</div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      placeholder="search"
                      type="text"
                      onChange={(event) => this.filterList(event)}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="2">
                <div>Filter workflow </div>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <Input
                      type="select"
                      name="Select state"
                      onChange={this.filter}
                      value={this.state.filter}
                    >
                      <option value="0" disabled selected>
                        Select state
                      </option>
                      <option value="All">All</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="6" className="text-right">
                <Button color="secondary" to="createWorkflow" tag={Link}>
                  Create Workflow
                </Button>
              </Col>
            </Row>
            {/* workflow list */}
            <Row className="workflowList">
              {workflows.map((data, index) => (
                <Col md="3" className="mt-50" key={index}>
                  <Link to={'editWorkflow/' + data.id}>
                    <Card>
                      <div
                        className="delete"
                        onClick={(event) => this.WorkflowDelete(event, index)}
                      >
                        <i className="fas fa-trash"></i>
                      </div>
                      <CardBody>
                        <div className="workflowName">{data.name}</div>
                        <Row>
                          <Col>
                            <div>{data.state}</div>
                          </Col>
                          <Col className="text-right">
                            <div
                              className={data.state}
                              onClick={(event) =>
                                this.stateChange(event, index)
                              }
                            >
                              <i className="fas fa-check-circle"></i>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Link>
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
