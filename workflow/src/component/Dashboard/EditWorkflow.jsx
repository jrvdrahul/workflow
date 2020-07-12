import React from 'react';
import { Redirect } from 'react-router-dom';
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
import * as actionTypes from '../../store/action'
import Header from './Header';


var newArr = [];

class EditWorkflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflow:[],
      node: [],
      success: false,
    };
  }

  componentDidMount() {
    
    this.setState({
      workflow:this.props.workflow
    })
    
    var id = this.props.computedMatch.params.id;
    if (id != undefined) {
      var result = this.props.workflow[id];
      this.setState({
        name: result.name,
        state:result.state,
        node: [...result.nodes],
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

    if(index !=0){
      if(this.state.node[index-1].state !== 'completed'){
        NotificationManager.error('Complete previous node first', 'Error!',1000);
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
    NotificationManager.success('Node Deleted Successfully','Success',1000);
    
  }

  // add node
  addNode() {
    this.state.node.push({
      title: '',
      content: '',
      state: 'pending',
    });
    this.setState({ node: this.state.node });
    NotificationManager.success('Node Added Successfully','Success',1000);
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
      NotificationManager.error('Workflow Name is required', 'Error!',1000);
      return false;
    }
    var emptyNode=this.state.node.filter((data)=>data.title=="" || data.content=="")
    if(emptyNode.length>0){
      NotificationManager.error('Please fill node', 'Error!',1000);
      return false;
    }
    

    var id = this.props.computedMatch.params.id;
    if (id) {
      this.state.workflow[id].name = this.state.name;
      this.state.workflow[id].nodes = this.state.node;
    } else {
      newArr[0].name = this.state.name;
      newArr[0].nodes = this.state.node;
      this.state.workflow.push(newArr[0]);
    }

    this.props.saveWorkflow(this.state.workflow);

    NotificationManager.success('Worflow Updated Successfully','Success',1000);

    setTimeout(() => {
     this.setState({success:true})
    }, 800);
  }

  render() {
    if(this.state.success){
      return <Redirect to="/workflow" />;
    }
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
              <Col md="8" className="text-right action-button">

                {this.state.state =='completed'? (<Button color="secondary shuffle" onClick={()=> this.shuffle()}>
                <i className="fas fa-random"></i>Shuffle</Button>):(<></>)}
                
                <Button color="secondary delete-node" onClick={() => this.deleteNode()}>
                <i className="fas fa-times"></i> Delete
                </Button>
                <Button color="secondary add" onClick={() => this.addNode()}>
                <i className="fas fa-plus"></i> Add Note
                </Button>
                <Button color="secondary save" onClick={() => this.save()}>
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
    saveWorkflow: (val) => dispatch({type: actionTypes.SAVEWORKFLOW,val:val})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditWorkflow);
