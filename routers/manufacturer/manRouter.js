//* Import External Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

//* Internal Dependencies
const {getManHomePage} = require("../../controller/manufacturer/manController");


//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());

//* Route setup
router.get("/home",getManHomePage);


//* Export
module.exports = router;