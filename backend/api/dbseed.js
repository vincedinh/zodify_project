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

// const connectDb = async () => {
//     try {
 
//         await pool.connect()
//         const res = await pool.query('SELECT animalid, unnest(genres) as genre FROM zodiac')
//         for (const row of res.rows) {
//           console.log(`animal: ${row.animalid}, Genre: ${row.genre}`);
//         }
//         await pool.end()
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// connectDb()

// get all zodiacs
exports.selectZodiacs = async () => {
  const select = `SELECT * FROM zodiac`;

  const query = {
    text: select,
    values: [],
  };
  // console.log(await pool.query(query));
  const {rows} = await pool.query(query);
  // console.log(rows);
  // for (const row of rows) {
  //   console.log(`animal: ${row.animalid}, Genre: ${row.genre}`);
  // }

  return rows;
};