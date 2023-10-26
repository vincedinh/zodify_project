const { Pool } = require("pg")
const dotenv = require("dotenv")
const fs = require('fs')
dotenv.config()

const ssl = {
  rejectUnauthorized: true, // Set this to true to verify the certificate
  ca: fs.readFileSync('us-west-1-bundle.pem'),
};

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl,
});

// get all zodiacs
exports.selectZodiacs = async () => {
  const select = `SELECT * FROM zodiac`;

  const query = {
    text: select,
    values: [],
  };

  const {rows} = await pool.query(query);

  return rows;
};