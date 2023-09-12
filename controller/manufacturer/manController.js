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


//* Get batch list of a specific product
function getBatchListPage(req,res){
    res.render("batchList.ejs");
}



//* Get Batch List of a specific product
async function getBatchListByPID_IID(req,res){
    // const sql = `SELECT "Batch"."bid", "Product"."Name", "Product"."Category_Name", "Product"."Image", "Product"."Unit Price", "Product"."Weight/Volume", "Batch"."ManufacturingQuantity", "Batch"."ExpiryDate", "Batch"."ManufacturingDate",
    // CASE
    //    WHEN "Batch"."ManufacturingDate" > Date('2022-07-30') THEN 'Fresh'
    //    WHEN "Batch"."ManufacturingDate" > Date('2022-05-30') THEN 'Moderate'
    //    ELSE 'Critical'
    // END AS "BatchState"
    // FROM "Product" INNER JOIN "Batch" ON
    // "Product"."pid" = "Batch"."pid" and "Batch"."IID/HID" = '${req.body.iid}' and "Product"."pid" = '${req.body.pid}';`;

    const sql = `SELECT "Batch"."bid", "Product"."Name", "Product"."Category_Name", "Product"."Image", "Product"."Unit Price", "Product"."Weight/Volume", "Batch"."ManufacturingQuantity", "Batch"."ExpiryDate", "Batch"."ManufacturingDate",
    CASE
       WHEN "Batch"."ManufacturingDate" > Date('2023-02-24') THEN 'Fresh'
       WHEN "Batch"."ManufacturingDate" > Date('2022-11-14') THEN 'Moderate'
       ELSE 'Critical'
    END AS "BatchState"
    FROM "Product" INNER JOIN "Batch" ON
    "Product"."pid" = "Batch"."pid" and "Batch"."IID/HID" = '${req.body.iid}' and "Product"."pid" = '${req.body.pid}'
    ORDER BY "Batch"."ManufacturingDate";`;
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



//* Add to the shifting cart
async function addToShiftingCart(req,res){
    try{
        for(let i=0; i<req.body.bidL.length; i++){
            const sql = `INSERT INTO "ShiftCart" (iid, bid) VALUES (${req.body.iid}, ${req.body.bidL[i]});`;
            let result = await itemsPool.query(
                sql
            );
        }
        res.status(200).send("OK");
       
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}


//* Add To MarketPlace
async function addToMarketPlace(req,res){
    try{
        for(let i=0; i<req.body.bidL.length; i++){
            const sql = `UPDATE "Batch" SET "InMarketPlace" = true WHERE bid = ${req.body.bidL[i]};`;
            let result = await itemsPool.query(
                sql
            );
        }
        res.status(200).send("OK");
       
    } catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}



//* Get Shifting Cart Page
function getShiftingCartPage(req,res){
    res.render("shiftingCart.ejs");
}




//* Get Shifting Cart Info
async function getShiftingCartInfo(req,res){
    const sql = `SELECT "Batch"."bid", "Product"."Name", "Product"."Category_Name", "Product"."Image", "Product"."Unit Price", "Product"."Weight/Volume", "Batch"."ManufacturingQuantity", "Batch"."ExpiryDate", "Batch"."ManufacturingDate",
    CASE
       WHEN "Batch"."ManufacturingDate" > Date('2023-02-24') THEN 'Fresh'
       WHEN "Batch"."ManufacturingDate" > Date('2022-11-14') THEN 'Moderate'
       ELSE 'Critical'
    END AS "BatchState"
    FROM (("Batch"
    INNER JOIN "ShiftCart" ON "ShiftCart"."bid" = "Batch"."bid")
    INNER JOIN "Product" ON "Product"."pid" = "Batch"."pid")
    WHERE "ShiftCart"."iid" = ${req.body.iid}
    ORDER BY "Batch"."ManufacturingDate";`;
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



//* Select Inventory To Shift Page
function getSelectInventoryToShiftPage(req,res){
    res.render("selectInventoryToShift.ejs");
}



//* Get all inventories and address except one
async function getAllInventoriesExceptOne(req,res){
    const sql = `SELECT *
    FROM "Inventory", "Address"
    WHERE "Inventory".mid = ${req.body.mid} and "Address".rmish_id = "Inventory".iid and "Inventory".iid <> ${req.body.iid};`;
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




//* Shift to new inventory
//* Update New Inventory(for each bid)
//* Delete All Entries of Inventory From a Shift Cart
async function shiftToOtherInventory(req,res){
    try{
        for(let i=0; i<req.body.bidList.length; i++){
            let sql = `UPDATE "Batch" SET "IID/HID" = ${req.body.toiid} WHERE bid = ${req.body.bidList[i]};`;
            let result = await itemsPool.query(
                sql
            );
        }

        let sql = `DELETE FROM "ShiftCart" WHERE iid = ${req.body.fromiid};`;
        let result = await itemsPool.query(
            sql
        );


        sql = `UPDATE "Inventory" SET "Availability" = "Inventory"."Availability" + 3 WHERE iid = ${req.body.fromiid};`;
        result = await itemsPool.query(
            sql
        );

        sql = `UPDATE "Inventory" SET "Availability" = "Inventory"."Availability" - 3 WHERE iid = ${req.body.toiid};`;
        result = await itemsPool.query(
            sql
        );
        res.status(200).send("OK");
       
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
    getBatchListPage,
    getBatchListByPID_IID,
    addToShiftingCart,
    addToMarketPlace,
    getShiftingCartPage,
    getShiftingCartInfo,
    getSelectInventoryToShiftPage,
    getAllInventoriesExceptOne,
    shiftToOtherInventory
};