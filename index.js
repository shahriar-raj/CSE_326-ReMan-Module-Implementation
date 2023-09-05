const express = require('express');
const cors = require('cors');


const app = express();
const port = 3002;

// Define a route
app.get('/', (req, res) => {
    res.render("patientHome");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
Set view Engine
=>Default folder : 'views'
*/
app.set("view engine","ejs");
