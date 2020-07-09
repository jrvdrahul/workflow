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
import {connect} from 'react-redux';
import Header from './Header';

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
    console.log(this.props.workflow);
   
    var id = this.props.match.params.id;
    if (id != undefined) {
      var result = this.props.workflow.filter((data) => data.id == id);
      this.setState({
        name: result[0].name,
        state:result[0].state,
        node: [...result[0].nodes],
      });
    } else {
      newArr = [];
      newArr.push({
        id: this.props.workflow.length,
        name: '',
        state: 'pending',
        nodes: [],
      });
      this.setState({ node: newArr[0].nodes });
    }
  }

  // node state change
  stateChange(index) {

    console.log('index',index);
    if(index !=0){
      if(this.state.node[index-1].state !== 'completed'){
        NotificationManager.error('Complete previous node first', 'Error!');
        return false;
      }
    }

    if (this.state.node[index].state === 'pending') {
      this.state.node[index].state = 'progress';
    } else if (this.state.node[index].state === 'progress') {
      this.state.node[index].state = 'completed';
    } else if (this.state.node[index].state === 'completed') {
      this.state.node[index].state = 'pending';
    }

    this.setState({ node: this.state.node });
  }

  // delete node
  deleteNode() {
    this.state.node.pop();
    this.setState({ node: this.state.node });
    NotificationManager.success('Node Deleted Successfully');
    
  }

  // add node
  addNode() {
    this.state.node.push({
      title: '',
      content: '',
      state: 'pending',
    });
    this.setState({ node: this.state.node });
    NotificationManager.success('Node Added Successfully');
  }

  // title change event
  titleChange(event, index) {
    this.state.node[index].title = event.target.value;
    this.setState({ node: this.state.node });
  }

  // content change event
  contentChange(event, index) {
    this.state.node[index].content = event.target.value;
    this.setState({ node: this.state.node });
  }
  
  //shuffle event
  shuffle(){
    var result=this.state.node.sort( () => Math.random() - 0.5) 
    this.setState({ node: result });
  }

  // save event
  save() {
    if(!this.state.name){
      NotificationManager.error('Workflow Name is required', 'Error!');
      return false;
    }

    console.log('innnnn')

    var id = this.props.match.params.id;

    if (id) {
      this.props.workflow[id].name = this.state.name;
      this.props.workflow[id].nodes = this.state.node;
    } else {
      newArr[0].name = this.state.name;
      newArr[0].nodes = this.state.node;
      this.props.workflow.push(newArr[0]);
    }

    this.props.saveWorkflow(this.props.workflow);

    NotificationManager.success('Worflow Updated Successfully');

    setTimeout(() => {
      this.props.history.push('/dashboard/index');
    }, 800);
  }

  render() {
    let node = this.state.node;
    return (
      <>
        <Container fluid>
          <section id="editWorkflow" className="">
            {/* header */}
            <Header />
            {/* action bar */}
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

                {this.state.state =='completed'? (<Button color="secondary" onClick={()=> this.shuffle()}>Shuffle</Button>):(<></>)}
                
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
            {/* Node list */}
            <Row className="workflowList">
              {node.map((data, index) => (
                <Col md="3" className="mt-4" key={index}>
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

const mapStateToProps = state =>{
  return{
    workflow:state.workflow
  };
}

const mapDispatchToProps = dispatch => {
  return {
    saveWorkflow: (val) => dispatch({type: 'SAVEWORKFLOW',val:val})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditWorkflow);
