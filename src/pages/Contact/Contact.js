import React from "react";
import { 
  Container,
  Row, 
  Col,
} from "react-bootstrap";

import './Contact.css';


const Contact = () => {
  return (
    <Container fluid className='displayAbout'>
      <Row>
        <Col>
          <h1>Contact</h1>
          <p>
            Thank you for using Zodify! <br/><br/>
            If you have any inquiries, suggestions, or would just like to chat, message me on
            {' '} <a href='https://www.linkedin.com/in/vince-dinh/'>LinkedIn</a>! <br/><br/>
            You can also reach me at my emails, 
            {' '} <a href='mailto:vince@ucsc.edu?subject=Zodify'>vince@ucsc.edu</a> or <a href='mailto:vincekhdinh@gmail.com?subject=Zodify'>vincekhdinh@gmail.com</a>. <br/><br/>
            For more of my work, check out my {' '} <a href='https://www.github.com/vincedinh/'>GitHub</a>. 
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact;