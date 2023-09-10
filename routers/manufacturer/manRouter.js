//* Import External Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

//* Internal Dependencies
const {getManHomePage,getManInventory} = require("../../controller/manufacturer/manController");


//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());

//* Route setup
router.get("/home",getManHomePage);
router.get("/showInventory",getManInventory);


//* Export
module.exports = router;