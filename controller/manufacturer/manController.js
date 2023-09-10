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


//* Export 
module.exports = {
    getManHomePage,
    getManInventoryPage,
    getInventoryList,
};