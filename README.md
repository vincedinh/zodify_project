# Zodify

WIP React project using Spotify API to generate an animal from the Vietnamese zodiac based on user's top listened to genres. 

Tech Stack:

Node.js
  * node-postgres are used to retrieve data from the AWS RDS database in the backend
  * Axios (promise based HTTP client for browser and Node.js) used to call on the Spotify API
Express.js
  * Used to build REST API for Zodiac data
React.js
  * Used to build UI and front-end (such as implementing contexts)
Bootstrap
  * react-bootstrap used for RWD (making mobile view look clean)

Formerly supported authentication through Google Firebase, though code is disabled for now (since there is no real purpose for it but may add more features in the future), solely relying on Spotify auth.

Royalty-free zodiac animal images obtained from FreePik.

This project was inspired by Receiptify by Michelle Liu and some of the initial code was based on CarmelleCodes' React JS series on Youtube.