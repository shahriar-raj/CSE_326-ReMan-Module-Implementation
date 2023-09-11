//* Import External Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');

//* Internal Dependencies
const {getManHomePage,
    getManInventoryPage,
    getInventoryList,
    getSingleInventoryViewPage,
    getProductByInventory,
    getCategoryByIID,
    getCategoryProductCount,
    getCategoryProductCountInMarketPlace,
    getAllInventoryCount,
    getEmptyInventoryCount,
    getAllProductionHouseCount,
    getEmptyProductionHouseCount
    } = require("../../controller/manufacturer/manController");


//* Create router
const router = express.Router();
router.use(cors());
router.options('*',cors());
router.use(express.static(path.join(__dirname,"../../public")));     //^ Setting up static Folders
router.use(express.static(path.join(__dirname,"../../public/js"))); 
router.use(express.static(path.join(__dirname,"../../public/images"))); 
router.use(express.static(path.join(__dirname,"../../public/css")));

//* Route setup
//? POST METHODS
router.get("/home",getManHomePage);
router.get("/showInventory",getManInventoryPage);
router.get("/getSingleInventoryView",getSingleInventoryViewPage);

// ? POST METHODS
router.post("/getInventoryList",getInventoryList);
router.post("/getProductByInventory",getProductByInventory);
router.post("/getCategoryByIID",getCategoryByIID);
router.post("/getCategoryProductCount",getCategoryProductCount);
router.post("/getCategoryProductCountInMarketPlace",getCategoryProductCountInMarketPlace);
router.post("/getAllInventoryCount",getAllInventoryCount);
router.post("/getEmptyInventoryCount",getEmptyInventoryCount);
router.post("/getAllProductionHouseCount",getAllProductionHouseCount);
router.post("/getEmptyProductionHouseCount",getEmptyProductionHouseCount);



//* Export
module.exports = router;