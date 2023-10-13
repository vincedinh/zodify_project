const express = require('express');

const db = require('./dbseed.js');

const app = express();

// middleware for allowing react to fetch() from server
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

// An api endpoint that returns a short list of items
app.get('/api/getList', async (req, res) => {
  try {
    const zodiacs = await db.selectZodiacs();
    res.json(zodiacs);
    // console.log(`Connected to database '${process.env.PGDATABASE}'`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.listen(9000, () => {
  console.log(`listening on port ${9000}`);
})