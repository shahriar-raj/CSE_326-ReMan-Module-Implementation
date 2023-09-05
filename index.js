const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();

dotenv.config();

// Define a route
app.get('/', (req, res) => {
    res.render("patientHome");
});

console.log(process.env.PORT);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:4200`);
});

/*
Set view Engine
=>Default folder : 'views'
*/
app.set("view engine","ejs");
