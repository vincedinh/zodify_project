const { Client } = require("pg")
const dotenv = require("dotenv")
const fs = require('fs')
dotenv.config()
 
const connectDb = async () => {
  // only for dev, for prod investigate https://letsencrypt.org/docs/
  // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    const ssl = {
      rejectUnauthorized: true, // Set this to true to verify the certificate
      ca: fs.readFileSync('us-west-1-bundle.pem'),
    };
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
            ssl,
        })
 
        await client.connect()
        const res = await client.query('SELECT animalid, unnest(genres) as genre FROM zodiac')
        for (const row of res.rows) {
          console.log(`animal: ${row.animalid}, Genre: ${row.genre}`);
        }
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()