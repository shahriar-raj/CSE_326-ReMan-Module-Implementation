//* Import External Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

//* Internal Dependencies
const {getManHomePage,getManInventoryPage,getInventoryList} = require("../../controller/manufacturer/manController");


//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());
router.use(express.static(path.join(__dirname,"../../public")));     //^ Setting up static Folders
router.use(express.static(path.join(__dirname,"../../public/js"))); 
router.use(express.static(path.join(__dirname,"../../public/images"))); 
router.use(express.static(path.join(__dirname,"../../public/css")));

//* Route setup
router.get("/home",getManHomePage);
router.get("/showInventory",getManInventoryPage);
router.post("/getInventoryList",getInventoryList);


//* Export
module.exports = router;