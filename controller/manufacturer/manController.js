//* Import Internal Dependencies
const itemsPool = require('../../database/dbConnection');   //^ Db Connection


//* To get manufacturer's home page
function getManHomePage(req,res,next){
    res.render("patientHome.ejs");
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

//* Export 
module.exports = {
    getManHomePage,
    getManInventoryPage,
    getInventoryList,
    getSingleInventoryViewPage,
    getProductByInventory,
    getCategoryByIID,
};