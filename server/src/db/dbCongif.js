const { Pool } = require('pg');
require('dotenv').config();

let localPool = {
  user: 'esas',
  password: '1234',
  host: 'localhost',
  port: '5432',
  database: 'timetable'
}

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
    }
} : localPool;
// const pool = new Pool({
//   // connectionString: "postgres://esas:1234@localhost:5432/timetable"
//   connectionString: process.env.DATABASE_URL
  
//  });

//  pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })
const pool = new Pool(poolConfig);
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
module.exports = pool;