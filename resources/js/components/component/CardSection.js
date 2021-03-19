import React from 'react';

import {Col, Container, Row} from 'reactstrap';
import image from '../../img/15326996038_4657d53aea_b.jpg';

export default function CardSection({rtl=false}){
    return (
        <Container>
            <Row>
                {rtl ? <Col sm="4"> <img src={image} className="img-fluid" /> </Col> : null }
                <Col sm="8">
                    <h3>
                    What is Lorem Ipsum?    
                    </h3>
                    <p className="lead">
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
                    </p>
                </Col>
                {rtl == false ? <Col xs="4"> <img src={image} className="img-fluid" /> </Col>: null }
            </Row>
        </Container>
    )
}