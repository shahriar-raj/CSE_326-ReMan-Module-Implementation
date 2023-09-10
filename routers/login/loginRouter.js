//* Import External Dependencies
const express = require('express');
const cors = require('cors');



//* Import Internal Dependencies
const {getManLoginPage,doLoginMan} = require("../../controller/loginController");



//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());


//* Route setup
router.get("/",getManLoginPage);
router.post("/doLoginMan",doLoginMan);


//* Export
module.exports = router;