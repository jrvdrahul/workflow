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
    window.location.assign('/');
  }

  render() {
    
    return (
      <>
        {/* commom header */}
        <Row className="header">
          <Col></Col>
          <Col className="text-right action-button">
            <Button color="secondary logout" onClick={() => this.logout()}>
            <i className="fas fa-sign-out-alt"></i> Logout
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default Header;
