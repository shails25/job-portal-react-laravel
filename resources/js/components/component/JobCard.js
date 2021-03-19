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
          
          {props.isLoggedIn ? props.userType == 'user' ?
          <Button color="primary" onClick={props.apply}>Apply</Button> : 
           null : <NavLink color="primary" to="/login" tag={RNavLink}>Login</NavLink>}
        </CardBody>
      </Card>
  );
};

export default JobCard;
