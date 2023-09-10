//* Import External Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');



//* Import Internal Dependencies
const {getManLoginPage,doLoginMan} = require("../../controller/loginController");



//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());
router.use(express.static(path.join(__dirname,"../../public")));     //^ Setting up static Folders
router.use(express.static(path.join(__dirname,"../../public/js"))); 
router.use(express.static(path.join(__dirname,"../../public/images"))); 
router.use(express.static(path.join(__dirname,"../../public/css")));


//* Route setup
router.get("/",getManLoginPage);
router.post("/doLoginMan",doLoginMan);


//* Export
module.exports = router;