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
        node: [...result[0].nodes],
      });
    } else {
      newArr = [];
      newArr.push({
        id: Data.length - 1,
        name: '',
        state: 'pending',
        nodes: [],
      });
      console.log(newArr[0].nodes);
      this.setState({ node: newArr[0].nodes });
    }
  }

  stateChange(index) {
    this.state.node[index].state = 'complete';
    this.setState({ node: this.state.node });
  }

  deleteNode() {
    this.state.node.pop();
    this.setState({ node: this.state.node });
    console.log(Data);
  }

  addNode() {
    this.state.node.push({
      title: '',
      content: '',
      state: 'pending',
    });
    this.setState({ node: this.state.node });
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
      Data[id].nodes = this.state.node;
    } else {
      newArr.nodes = this.state.node;
      Data.push(newArr[0]);
    }
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
              {node.map((data, index) => (
                <Col md="3" className="mt-4">
                  <Card>
                    <div
                      className="nodeState"
                      onClick={() => this.stateChange(index)}
                    >
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
