//* Import External dependencies
const express = require('express');
const dotenv = require('dotenv');     //^ For Environmental Variables
const { Pool } = require('pg');       //^ Postgress sql
const cors = require('cors');
const path = require('path');


//* Import Internal Dependencies
const itemsPool = require('./database/dbConnection');   //^ Db Connection
const loginRouter = require('./routers/login/loginRouter');


//* App Helpers
const app = express();
app.use(express.json());    //^ To Parse JSON data
app.use(express.urlencoded({extended:true}));   //^ To Parse HTML form data and 'extended:true' => now it can parse query data
app.use(express.static(path.join(__dirname,"public")));     //^ Setting up static Folders, the contents of these folders can be directly accessed by the user
app.use(express.static(path.join(__dirname,"public/js"))); 
app.use(express.static(path.join(__dirname,"public/images"))); 
app.use(express.static(path.join(__dirname,"public/css")));



//* Set view Engine
//* =>Default folder : 'views'
app.set("view engine","ejs");


//* Import environmental variables
dotenv.config();


// Define a route
// app.get('/', (req, res) => {
//     res.render("patientHome");
// });



// app.get('/', async(req, res) => {
//   try {
//       const allItems = await itemsPool.query(
//           `SELECT * FROM "Test"`
//       );
//       console.log(allItems.rows[0].ID);
//       res.json({ allItems });
//   } catch (error) {
//       console.log(error);
//       res.status(500).send(error.message)
//   }
// })

//* Routing Setup
app.use("/",loginRouter);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:` + process.env.PORT);
});


