import React from 'react';
import {withRouter} from 'react-router-dom';

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem
} from 'reactstrap';

import {NavLink as RRNav} from 'react-router-dom';

import logo from './../../img/naukri.png';
import axios from 'axios';

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';



const Header = (props) => {
  console.log(props.token);
  const handleLogout = () => {
    axios.post("/api/logout?api_token="+props.token)
    .then(res => {
      alert(res.data.message);
      clearLocalStorage()
      props.history.push("/login");
    })
    .catch(err => console.log(err))
  }
  
  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("user_type");
  }

  return (
  <header>
    <Navbar sticky color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
    
      <Container fluid>
        <Row noGutters className="position-relative w-100 align-items-center">
        
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto" navbar>
            
            <NavbarBrand className="d-inline-block p-0" to="/" tag={RRNav} style={{ width: 80 }}>
                <img src={logo} alt="logo" className="position-relative img-fluid" />
            </NavbarBrand>              
            <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" to="/" tag={RRNav} >Home</NavLink>
            </NavItem>
            
            {props.isLoggedIn ? props.userType == 'user' ? 
            <NavItem className="d-flex align-items-center">
                <NavLink to="/dashboard" activeClassName="active" tag={RRNav}>Dashboard</NavLink> 
            </NavItem> 
            : <NavItem className="d-flex align-items-center">
                <NavLink to="/dashboard" activeClassName="active" tag={RRNav}>Panel</NavLink> 
            </NavItem> : null }
              
              
            </Nav>
          </Col>
        
          
          <Col className="d-none d-lg-flex justify-content-end">
              <Nav navbar>
              
              {props.isLoggedIn ? 
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" to="#" tag={RRNav}>Hi, {props.name}</NavLink>
                  <Button color="link" className="font-weight-bold" onClick={handleLogout}>Logout</Button>
                </NavItem> : 
                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" to="/login" tag={RRNav}>Login</NavLink>
                </NavItem>}
              </Nav>
            
          </Col>
          
        </Row>
      </Container>
      
    </Navbar>
  </header>
)};

export default withRouter(Header);