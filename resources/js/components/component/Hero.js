import React from 'react';
import { Jumbotron } from 'reactstrap';

const Hero = (props) => {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Naukri Portal</h1>
          <p className="lead w-75">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
          <hr className="my-2" />
          <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting</p>
        </Jumbotron>
      </div>
    );
  };
  
  export default Hero;