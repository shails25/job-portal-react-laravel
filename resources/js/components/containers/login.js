import React from 'react';
import { withRouter } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import Headers from '../component/Header';
import LoginForm from './LoginForm';

function login(){
    return (
        <>
        <Headers />
        <Container >
            <Row>
                <Col className="col-sm-4 offset-sm-4 border border-1 p-4 m-4 mx-auto" >
                    <LoginForm />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default withRouter(login);