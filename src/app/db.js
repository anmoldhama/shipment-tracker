// require('dotenv').config();
// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL);

// module.exports = db;

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shipmentTracker',
  password: 'postgre',
  port: 5433, 
});


export default pool;