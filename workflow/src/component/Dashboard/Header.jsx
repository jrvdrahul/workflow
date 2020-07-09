import React from 'react';
import { Redirect } from 'react-router-dom';

// reactstrap components
import { Button, Row, Col } from 'reactstrap';

class Header extends React.Component {

  state = {
    logout: false,
  };


  logout() {
    localStorage.removeItem('token');
    this.setState({logout:true})
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/" />;
    }
    return (
      <>
        {/* commom header */}
        <Row className="header">
          <Col></Col>
          <Col className="text-right">
            <Button color="secondary" onClick={() => this.logout()}>
              Logout
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default Header;
