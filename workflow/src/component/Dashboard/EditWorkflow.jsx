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
    id: 0,
    name: 'workflow1',
    state: 'completed',
    nodes: [
      { title: 'node1', content: 'content', state: 'progress' },
      { title: 'node2', content: 'content2', state: 'progress' },
      { title: 'node3', content: 'content3', state: 'progress' },
    ],
  },
  {
    id: 1,
    name: 'workflow2',
    state: 'pending',
    nodes: [{ title: 'node1', content: 'content', state: 'progress' }],
  },
  {
    id: 2,
    name: 'workflow2',
    state: 'completed',
    nodes: [{ title: 'node1', content: 'content', state: 'progress' }],
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
    var id = this.props.match.params.id;
    if (id != undefined) {
      var result = data.filter((data) => data.id == id);
      this.setState({
        workflows: result[0].nodes,
      });
    } else {
      console.log('in');
      this.state.workflows.push({
        name: '',
        state: 'pending',
        nodes: [],
      });
      this.setState({ workflows: this.state.workflows[0].nodes });
    }
  }

  stateChange(index) {
    console.log(data[0].nodes[index].state);
    data[0].nodes[index].state = 'complete';
    console.log(data[0].nodes[index].state);
    this.setState({ workflows: data[0].nodes });

    // this.state.workflows[index].state = 'complete';
    // console.log(this.state.workflows[index].state);
    // this.setState({ workflows: this.state.workflows });
  }

  deleteNode() {
    this.state.workflows.pop();
    this.setState({ workflows: this.state.workflows });
  }

  addNode() {
    this.state.workflows.push({
      title: '',
      content: '',
      state: 'pending',
    });
    this.setState({ workflows: this.state.workflows });
  }

  titleChange(event, index) {
    this.state.workflows[index].title = event.target.value;
    this.setState({ workflows: this.state.workflows });
  }

  contentChange(event, index) {
    this.state.workflows[index].content = event.target.value;
    this.setState({ workflows: this.state.workflows });
  }

  // save() {
  //   this.state.workflows[0].nodes = this.state.nodes;
  //   this.setState({ workflows: this.state.nodes });
  // }

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
                <Button color="secondary" onClick={() => this.deleteNode()}>
                  Delete
                </Button>
                <Button color="secondary" onClick={() => this.addNode()}>
                  Add Note
                </Button>
                <Button color="secondary" onClick={() => this.save()}>
                  Save
                </Button>
              </Col>
            </Row>
            <Row className="workflowList">
              {workflows.map((data, index) => (
                <Col md="3" className="mt-4">
                  <Card>
                    <div onClick={() => this.stateChange(index)}>
                      <i class="fas fa-check-circle"></i>
                    </div>
                    {data.state}
                    <CardBody>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <Input
                            placeholder="title"
                            type="text"
                            value={data.title}
                            onChange={(event) => this.titleChange(event, index)}
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="textarea"
                          name="text"
                          placeholder="content"
                          value={data.content}
                          onChange={(event) => this.contentChange(event, index)}
                        />
                      </FormGroup>
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
