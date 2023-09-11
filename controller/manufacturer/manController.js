//* Import Internal Dependencies
const itemsPool = require('../../database/dbConnection');   //^ Db Connection


//* To get manufacturer's home page
function getManHomePage(req,res,next){
    res.render("homepage.ejs");
}


//* To get manufacturer's inventory page
function getManInventoryPage(req,res,next){
    res.render("inventories.ejs");
}


//* To get the inventory lists of a specific manufacturer
async function getInventoryList(req,res){
    const sql = `SELECT *
    FROM "Inventory", "Address"
    WHERE "Inventory".mid = '${req.body.mid}' and "Address".rmish_id = "Inventory".iid;`;

    try{
        const result = await itemsPool.query(
            sql
        );
        
        console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}



//* Get single inventory view page
function getSingleInventoryViewPage(req,res){
    res.render("singleInventoryView.ejs");
}



//* Get product list and info by inventory
async function getProductByInventory(req,res){
    const sql = `SELECT "Product"."pid", "Product"."Name", "Product"."Category_Name", "Product"."Image", "Product"."Unit Price", "Product"."Rating", "Product"."Weight/Volume", SUM("Batch"."ManufacturingQuantity") AS "TotalQuantity"
    FROM "Product" INNER JOIN "Batch" ON
    "Product"."pid" = "Batch"."pid" and "Batch"."IID/HID" = '${req.body.iid}'
    GROUP BY "Product"."pid"`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}



//* get category list by IID
async function getCategoryByIID(req,res){
    const sql = `SELECT DISTINCT "Product"."Category_Name"
    FROM "Product" INNER JOIN "Inventory" ON
    "Product"."mid" = "Inventory"."mid" and "Inventory"."iid" = '${req.body.iid}';`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


//* Get All Categories and products from a manufacturer
async function getCategoryProductCount(req,res){
    const sql = `SELECT COUNT(pid) AS "ProductCount", COUNT(DISTINCT "Category_Name") AS "CategoryCount"
    FROM "Product"
    WHERE "Product".mid = '${req.body.mid}';`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


//* Get All Categories and products count from a manufacturer in marketplace
async function getCategoryProductCountInMarketPlace(req,res){
    const sql = `SELECT COUNT(DISTINCT "Batch".pid) AS "MProductCount", COUNT(DISTINCT "Category_Name") AS "MCategoryCount"
    FROM "Batch"
    INNER JOIN "Product" ON "Batch".pid = "Product".pid
    WHERE "Product".mid = '${req.body.mid}' and "Batch"."InMarketPlace" = true;`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}




//* Get All Inventories Count
async function getAllInventoryCount(req,res){
    const sql = `SELECT COUNT("Inventory".iid) AS "InventoryCount" FROM "Inventory" WHERE "Inventory".mid = '${req.body.mid}';`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


//* Get Empty Inventories Count
async function getEmptyInventoryCount(req,res){
    const sql = `SELECT COUNT("Inventory".iid) AS "EmptyInventoryCount" FROM "Inventory" WHERE "Inventory".mid = '${req.body.mid}' and "Inventory"."Availability" = 100;`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}




//* Get ALl Production House Count
async function getAllProductionHouseCount(req,res){
    const sql = `SELECT COUNT("ProductionHouse".hid) AS "ProductionHouseCount" FROM "ProductionHouse" WHERE "ProductionHouse".mid = '${req.body.mid}';`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


//* Get Empty Production House Count
async function getEmptyProductionHouseCount(req,res){
    const sql = `SELECT COUNT("ProductionHouse".hid) AS "EmptyProductionHouseCount" FROM "ProductionHouse" WHERE "ProductionHouse".mid = '${req.body.mid}' and "ProductionHouse"."Availability" = 100;`;
    try{
        const result = await itemsPool.query(
            sql
        );
        
        //console.log(result);
        const userObj = {
            rows: result.rows, 
        }
        res.status(200);
        res.json(userObj);
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}



//* Export 
module.exports = {
    getManHomePage,
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
    getEmptyProductionHouseCount,
};