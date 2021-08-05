// this is used to read info from .env file. need to use npm install dotenv
require('dotenv').config();
const { Pool } = require ('pg');

// these variables are done for privacy.
let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.username;
let password = process.env.password;

let connectionString = `postgres://${username}:${password}@${host}:${port}/${database}`;

// all info needed to connect to database. B/c this website is practice 
// I didn't put a timer for it to timeout. DATABASE_URL is a key set by heroku.
let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

let getItems = () => {
    // gets all of the items and their prices in the database.
    return pool.query('select itemname, price, quantity from cups.items')
    .then(result => result.rows)
    .catch(e => console.log(e));
}

let getItem = (id_num) => {
    return pool.query('select itemname, price from cups.items where itemid = $1', [id_num])
    .then(result => result.rows)
    .catch(e => console.log(e);)
}

// needed so other files can access. Node.js syntax for exporting.
module.exports = { getItems, getItem }