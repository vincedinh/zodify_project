import React from "react";
import { 
  Container,
  Row, 
  Col,
} from "react-bootstrap";

import './About.css';


const About = () => {
  return (
    <Container fluid className='displayAbout'>
      <Row>
        <Col>
          <div>
            <h1>About</h1>
            <p style={{fontStyle: 'italic'}}>
              Zodify is an open source app used to generate an animal based on your Spotify top artists and the Vietnamese zodiac. <br/>
              Zodiac images are royalty-free and were found on Freepik. <br/>
              Zodiac Set: <a href="https://www.freepik.com/free-vector/chinese-new-year-animals-colorful-animal-zodiac-sign-stickers-set_16265752.htm#query=vietnamese%20zodiac&position=11&from_view=search&track=ais">Image by rawpixel.com</a>,
              Cat: <a href="https://www.freepik.com/free-psd/cute-cat-element-isolated_43305505.htm#page=2&query=artistic%20cat%20cartoon&position=29&from_view=search&track=ais">Image by Freepik</a>,
              Unicorn: <a href="https://www.freepik.com/free-vector/flat-design-illustration-unicorn-silhouette_28234724.htm#query=unicorn%20silhouette&position=21&from_view=search&track=ais">Image by Freepik</a>
            </p>
          </div>
          <div>
            <h3>Why is the app not working?</h3>
            <p>You may need to first log into the Spotify App by clicking the Spotify Login button on the home screen and allow permissions. <br/>
              If it is still not working, then try refreshing the page. The app also only currently supports users who have listened within the past month!
            </p>
          </div>
          <div>
          <h3>How are zodiacs generated?</h3>
            <p>
              Zodify takes your top 10 artists and their associated genres from the Spotify API. <br/> 
              Using an algorithm based on your top genres, a zodiac is then assigned to your listening habits within the past month. <br/>
              Your top artists' genres are also weighed based on each artist's ranking on your top artist list. <br/>
            </p>
          </div>
          <div>
            <h3>Why did I get a different animal than the one of the year I was born in?</h3>
            <p>
              Rather than a direct astrological association (such as birth year), Zodify considers the traits of each animal and your listening habits. <br/>
              It then bases its results on symbolic connections between your top genres' vibes and each zodiac animal's traits according to the zodiac. <br/>
              Therefore, your music's zodiac animal can be different from month to month!
            </p>
          </div>
          <div>
            <h3>Why is there a cat instead of the rabbit?</h3>
            <p>
              The zodiac used for Zodify is mostly based on the Vietnamese zodiac instead of the Chinese zodiac. <br/>
              Instead of the Rabbit and Ox, the Vietnamese zodiac instead honors the Cat and Water Buffalo respectively.
            </p>
          </div>
          <div>
            <h3>My zodiac is not being generated on the web app.</h3>
            <p>
              This may be due to increased traffic. You may try refreshing the web app page and clearing your browser's cookies and site data. <br/>
              If that doesn't work, try a different device or wait to try again later.
            </p>
          </div>
          <p>If you have any other questions, please feel free to {' '} <a href='mailto:vincekhdinh@gmail.com?subject=Zodify'>contact me</a>!</p>
        </Col>
      </Row>
    </Container>
  )
}

export default About;