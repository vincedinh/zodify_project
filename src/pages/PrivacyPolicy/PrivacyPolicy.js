import React from "react";
import { 
  Container,
  Row, 
  Col,
} from "react-bootstrap";

import './PrivacyPolicy.css';


const PrivacyPolicy = () => {
  return (
    <Container fluid className='displayPrivacyPolicy'>
      <Row>
        <Col>
          <h1>Privacy Policy</h1>
          <p>
            Zodify is a web app developed by Vince Dinh using the Spotify API. It is not intended for monetization. <br/>
            By choosing to use this app, you agree to the collection and use of your Spotify account username and data from your top artists. <br/>
          </p>
          <p>
            None of your Spotify data used by Zodify is stored or shared with any third parties. <br/>
            It is solely used to generate your zodiac. <br/>
            Additionally, your Zodify login credentials (Google Firebase) are only used for authentication and to authorize your access to the Zodify app. <br/>
          </p>
          <p>
            None of your Spotify data is stored or used anywhere outside the Zodify app session. <br/>
            You can choose to revoke Zodify's permissions to your data any time by visiting
            {' '} <a href='https://www.spotify.com/us/account/apps/'>your Spotify apps page</a> and clicking "Remove Access" next to Zodify.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default PrivacyPolicy;