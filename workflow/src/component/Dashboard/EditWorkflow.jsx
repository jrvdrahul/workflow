import React from 'react';

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
import Data from '../../Data.json';

var newArr = [];

class EditWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      node: [],
      success: false,
    };
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    if (id != undefined) {
      var result = Data.filter((data) => data.id == id);
      this.setState({
        name: result[0].name,
        node: [...result[0].nodes],
      });
    } else {
      newArr = [];
      newArr.push({
        id: Data.length,
        name: '',
        state: 'pending',
        nodes: [],
      });
      this.setState({ node: newArr[0].nodes });
    }
  }

  stateChange(index) {
    if (this.state.node[index].state === 'pending') {
      this.state.node[index].state = 'progress';
    } else if (this.state.node[index].state === 'progress') {
      this.state.node[index].state = 'completed';
    } else if (this.state.node[index].state === 'completed') {
      this.state.node[index].state = 'pending';
    }

    this.setState({ node: this.state.node });
  }

  deleteNode() {
    this.state.node.pop();
    this.setState({ node: this.state.node });
    NotificationManager.success('Node Deleted Successfully');
  }

  addNode() {
    this.state.node.push({
      title: '',
      content: '',
      state: 'pending',
    });
    this.setState({ node: this.state.node });
    NotificationManager.success('Node Added Successfully');
  }

  titleChange(event, index) {
    this.state.node[index].title = event.target.value;
    this.setState({ node: this.state.node });
  }

  contentChange(event, index) {
    this.state.node[index].content = event.target.value;
    this.setState({ node: this.state.node });
  }

  save() {
    var id = this.props.match.params.id;

    if (id) {
      Data[id].name = this.state.name;
      Data[id].nodes = this.state.node;
    } else {
      newArr.name = this.state.name;
      newArr.nodes = this.state.node;
      Data.push(newArr[0]);
    }
    NotificationManager.success('Worflow Updated Successfully');

    setTimeout(() => {
      this.props.history.push('/dashboard/index');
    }, 800);
  }

  render() {
    let node = this.state.node;
    console.log('node', node);
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
                    <Input
                      placeholder="Workflow name"
                      type="text"
                      value={this.state.name}
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
              {node.map((data, index) => (
                <Col md="3" className="mt-4">
                  <Card>
                    <div
                      className={data.state}
                      onClick={() => this.stateChange(index)}
                    >
                      <i className="fas fa-check-circle"></i>
                    </div>

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
                          rows="10"
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
