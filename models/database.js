const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  // host: 'localhost',
  // port: 3306,
  // password: 'admin',
  // database: 'healthinfommtdb',
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
})


db.query('select 1+1',(err, rows) => {
    if (err) {
     return console.log(err);
    }
    console.log("Database connected successfully");
  });

  module.exports = db;