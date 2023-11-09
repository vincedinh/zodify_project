import React,
{
  useState,
  useEffect,
  useRef,
  useContext
}
from 'react';

import { 
  Container,
  Row, 
  Col,
  Button,
  Tabs,
  Tab,
  Card,
  Image,
} from 'react-bootstrap';

import './getZodiac.css'

import useFetch from '../../../../utils/hooks'
import useSpotifyData from '../spotifyData/index.js';
import { ZODIAC_IMG } from '../../../../constants/images.js';
import { SpotifyUserContext } from '../../../../context/SpotifyUserContext';

/**
 * 
 * @param {*} data plain JS object passed in
 * @returns gets the key of the highest value in the object
 */
function getZodiacWithMaxValue(data) {
  let maxKey = null;
  let maxValue = -1;

  if (data instanceof Map) {
    // Handle Map objects
    for (const [key, value] of data) {
      if (value > maxValue) {
        maxKey = key;
        maxValue = value;
      }
    }
  } else if (typeof data === 'object') {
    // Handle plain JavaScript objects
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] > maxValue) {
        maxKey = key;
        maxValue = data[key];
      }
    }
  }

  // There is a matching Zodiac present, else return the user 'Unicorn' status
  if (maxValue !== 0) {
    return maxKey;
  } else {
    return 'Unicorn';
  }
  
}

/**
 * 
 * @param {*} zodiacGenreMap map of zodiac, genreList pairings
 * @param {*} genreValuePair current genre we are evaluating, where index 0 = genre name, index 1 = value
 * @returns increments points for each zodiac that has genreValuePair[0] in its list
 */
function compareZodiac(zodiacGenreMap, genreValuePair) {
  return Object.entries(zodiacGenreMap).map(([animalid, genres]) => {
    // 
    const count = genres.filter((g) => g === genreValuePair[0]).length;
    const points = count * genreValuePair[1]

    return {animalid, points}
  });
}

/**
 * 
 * @param {*} zodiacCountMap map of all the zodiacs and their points, used for testing and seeing user's zodiac points
 * @returns jsx display of the map
 */
function DisplayZodiacCounts({ zodiacCountMap }) {
  function isZero(count) {
    return count === 0;
  }
  const allCountsZero = Object.values(zodiacCountMap).every(isZero);

  if (!allCountsZero) {
    return (
      <div>
        <h2>Zodiac Genre Counts:</h2>
        {Object.entries(zodiacCountMap).map(([animalid, count], idx) => (
          <div key={idx}>
            <p>{animalid}: {count}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return <h2>No zodiac generated yet!</h2>
  }
}

/**
 * Main function
 * @returns displays user zodiac based off of genres listened to
 */
const GetZodiac = () => {
  const userDetails = useContext(SpotifyUserContext);

  // fetches list of zodiacs and associated genres
  const { data, handleGetTopArtists, token } = useSpotifyData();

  // Use a ref to track whether the effect has run (prevent constant re-renders)
  const hasInitialRenderRun = useRef(false);

  // Effect to set the token and call handleGetTopArtists on initial render
  useEffect(() => {
    if (!hasInitialRenderRun.current && token) {
      hasInitialRenderRun.current = true;
      handleGetTopArtists();
    }
  }, [token, handleGetTopArtists]);

  // Fetch zodiac relations
  // Fix: Currently runs with every render, find way to only run on initial render
  let [zodiacData] = useFetch('https://zodify-app.com/api/getList');
    // 'http://zodify-backend:9000/api/getList'
    // 'http://172.17.0.2:9000/api/getList'
    // 'http://127.0.0.1:9000/api/getList'
    // 'http://localhost:9000/api/getList' 

  // Type is plain object
  const zodiacGenreMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = item.genres;
    return acc;
  }, {});

  // Type is plain object
  const zodiacDscrpMap = zodiacData.reduce((acc, item) => {
    acc[item.animalid] = [item.traits, item.dscrp];
    return acc;
  }, {});

  // State to update the countMap once the user generates a zodiac
  const [zodiacCountMap, setZodiacCountMap] = useState(() => {
    const initialCountMap = zodiacData.reduce((acc, item) => {
      acc[item.animalid] = 0;
      return acc;
    }, {});
    return initialCountMap;
  });

  const [processingDone, setProcessingDone] = useState(false);

  let generatedZodiac = null;

  // Process genres. If genres have already been processed, do not increment count map further.
  const processGenres = () => {
    if (data?.topGenres instanceof Map && !processingDone) {
      const results = [...data.topGenres.entries()].map(([genre, value], index) => {
        return compareZodiac(zodiacGenreMap, [genre, value], zodiacCountMap);
      });
      results.forEach((zodiacResults) => {
        zodiacResults.forEach(({ animalid, points }) => {
          setZodiacCountMap((prevZodiacCountMap) => ({
            ...prevZodiacCountMap,
            [animalid]: (prevZodiacCountMap[animalid] || 0) + points,
          }));
        })
      })
      // console.log(zodiacCountMap);
      setProcessingDone(true);
    }
  };

  // For mobile view
  const [key, setKey] = useState('description');

  // Generate zodiac if genres have been processed
  if (processingDone) {
    // Convert the Map to an array of key-value pairs
    // Sort the array in descending order based on values
    // Extract and print the keys in descending order
    const genresArray = [...(data.topGenres || new Map()).entries()];
    genresArray.sort((a, b) => b[1] - a[1]);
    const keysInDescendingOrder = genresArray.map(([genre, value]) => genre);
  
    function listGenres(genres) {
      if (genres) {
        return (
          <div className='listGenres'>
            {genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </div>
        );
      }
      return null;
    }

    // Shorter list for the mobile view card element
    function listTop3Genres(genres) {
      if (genres) {
        const top3Genres = genres.slice(0, 3);
        return (
          <div className='listGenres'>
            {top3Genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </div>
        );
      }
      return null;
    }

    let topZodiac = getZodiacWithMaxValue(zodiacCountMap)

    function DisplayTraits(traits) {
      // Convert the object to an array of key-value pairs
      const keyValuePairs = Object.entries(traits);

      // concatenate the pairs with commas
      const commaSeparatedText = keyValuePairs.map(([idx, value]) => `${value}`).join(', ');

      return (
        <div>
          {commaSeparatedText}
        </div>
      );
    }

    const today = new Date();
    const formattedToday = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
  
    generatedZodiac = (
      <Container className='generatedZodiac'>
        <Row>
          <Col>
            Your music's zodiac animal this month is: <br/>
            <h1 className='zodiacCardImageText'> The {topZodiac}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <img src={ZODIAC_IMG[topZodiac]} alt={topZodiac} className='zodiacImg' />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>{DisplayTraits(zodiacDscrpMap[topZodiac][0])}</h2>
          </Col>
        </Row>

        {/**  Desktop View */}
        <Row className='d-none d-lg-block'>
          <Col>
            <h3>{zodiacDscrpMap[topZodiac][1]}</h3>
          </Col>
        </Row>
        <Row className='d-none d-lg-block'> 
          <Col>
            <div>
              Your top genres this month:
            </div>
            <div style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black', justifyContent: 'center'}}>
              {listGenres(keysInDescendingOrder)}
            </div>
          </Col>
        </Row>

        {/** Mobile view */}
        <Row className='d-lg-none'>
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            fill
          >
            <Tab eventKey='description' title='Description' tabClassName='mobileTab'>
              <p className='mobileTabContent'>{zodiacDscrpMap[topZodiac][1]}</p>
            </Tab>
            <Tab eventKey='genres' title='Genres' tabClassName='mobileTab'>
              <div className='mobileTabContent'>
                Your top genres this month:
              </div>
              <div style={{ fontStyle: 'italic', fontWeight: 'bold', color: 'black'}}>
                {listGenres(keysInDescendingOrder)}
              </div>
            </Tab>
            <Tab eventKey='share' title='Share' tabClassName='mobileTab'>
              <p className='mobileTabContent'>
                { userDetails.images[0] ? 
                (<Image src={userDetails.images[0].url} roundedCircle width={200} alt="Spotify profile image"/>) 
                : (<Image roundedCircle width={200} alt="Spotify profile image (default)" className="gray-circle-placeholder"/>)
                }
                Screenshot & share your zodiac card with friends below!
              </p>
              <Card className='zodiacCard'>
                <div className='zodiacCardHeading'>
                  <Card.Title className='zodiacCardTitle'>
                      <div>
                        <span className='highlightText'>{userDetails.display_name}'s </span> 
                        Music Zodiac
                      </div>
                  </Card.Title>
                  <Card.Subtitle className='zodiacCardSubtitle mb-2'>
                    {formattedToday}
                  </Card.Subtitle>
                  <div className='zodiacCardImageBody'>
                    <Card.Title className='zodiacCardImageText' style={{paddingTop: '10px'}}>{topZodiac}</Card.Title>
                    <Card.Img src={ZODIAC_IMG[topZodiac]} className='zodiacCardImage' variant='top' alt={`Your zodiac is: ${ZODIAC_IMG[topZodiac]}`}/>
                    <Card.Subtitle className='zodiacCardTraitText pt-2 pb-2'>Traits: {DisplayTraits(zodiacDscrpMap[topZodiac][0])} </Card.Subtitle>
                  </div>
                  <Card.Body>
                    <div>
                      Some of my aligned genres were: {listTop3Genres(keysInDescendingOrder)} <br/>

                      Sound right to you?
                      Get yours on <a href='/' className='highlightText'>https://zodify-app.com</a>!
                    </div>

                  </Card.Body>
                </div>
              </Card>
            </Tab>
          </Tabs>
        </Row>
      </Container>
    );
  }
  

  function handleProcessGenres() {
    processGenres();
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Button className='analyzeButton' onClick={handleProcessGenres}>Analyze Your Music!</Button>
          {generatedZodiac}
          <div className='disclaimer'>
            <p>
              *Disclaimer: these connections are symbolic and meant for creative interpretation rather than a direct astrological association.*
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GetZodiac;