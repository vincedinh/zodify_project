import { useState, useEffect } from 'react';

function useFetch(relativeUrl) {
  const [data, setData] = useState([]);

  async function fetchUrl() {
    try {
      // Get the current domain (protocol + hostname)
      const currentDomain = window.location.protocol + '//' + window.location.hostname;
      // Construct the full URL by appending the relative URL to the current domain
      const fullUrl = `${currentDomain}${relativeUrl}`;

      // let resClone;
      const res = await fetch(fullUrl, {
        //use the authorization
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('@token'),
        },
      })
      /** FOR DEV TESTING
       * FROM: https://support.stripe.com/questions/how-to-fix-syntaxerror-unexpected-token-in-json-at-position-0#:~:text=Usually%20this%20error%20is%20caused,the%20error%20messages%20mentioned%20above.
       */
      // .then(function (response) {
      //   resClone = response.clone();
      //   return response.json();
      // })
      // .then(function (data) {
      //   // Do something with data
      // }, function (rejectionReason) {
      //     console.log('Error parsing JSON from response:', rejectionReason, resClone);
      //     resClone.text()
      //     .then(function (bodyText) {
      //         console.log('Received the following instead of valid JSON:', bodyText);
      //     });
      // });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data];
}

export default useFetch;