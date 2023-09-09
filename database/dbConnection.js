const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DBConnLink);
const itemsPool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl: {
        rejectUnauthorized: false
    }
});
module.exports = itemsPool;
