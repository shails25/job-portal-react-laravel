import React from 'react';

import {
  Container, Row, Col,  Navbar, Nav, NavLink, 
} from 'reactstrap';

import logo from './../../img/naukri.png';

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

const Footer = () => (
  <footer>
    <Navbar color="dark" light expand="xs" className=" navbar-dark bg-dark" style={{ height: 40 }}>
    
      <Container fluid>
        <Row noGutters className="position-relative w-100 align-items-center">
        
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
                <NavLink className="font-weight-bold" href="/">Naukri Poratl</NavLink>
            </Nav>
          </Col>
          
        </Row>
      </Container>
      
    </Navbar>
  </footer>
);

export default Footer;