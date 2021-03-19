import React from 'react';
import {NavLink as RNavLink } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,NavLink
} from 'reactstrap';

const JobCard = (props) => {

  return (
      <Card>
        <CardBody>
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{props.skills}</CardSubtitle>
          <CardText><b>Skills: </b>{props.description} <br/> <small>Posted On: {props.date}</small></CardText>
          
          {props.userType == 'user' ? props.isLoggedIn ? 
          <Button color="primary" onClick={props.apply}>Apply</Button> : 
          <NavLink color="primary" to="/login" tags={RNavLink}>Login</NavLink> : null }
        </CardBody>
      </Card>
  );
};

export default JobCard;
