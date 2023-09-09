const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');


const itemsPool = require('./database/dbConnection');


const app = express();

dotenv.config();


// Define a route
// app.get('/', (req, res) => {
//     res.render("patientHome");
// });



app.get('/', async(req, res) => {
  try {
      const allItems = await itemsPool.query(
          `SELECT * FROM "Test"`
      );
      console.log(allItems.rows[0].ID);
      res.json({ allItems });
  } catch (error) {
      console.log(error);
      res.status(500).send(error.message)
  }
})



console.log(process.env.PORT);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:4201`);
});

/*
Set view Engine
=>Default folder : 'views'
*/
app.set("view engine","ejs");
