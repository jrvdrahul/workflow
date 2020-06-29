import React from 'react';

// reactstrap components
import { Button, Row, Col } from 'reactstrap';

class Header extends React.Component {
  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }

  render() {
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
