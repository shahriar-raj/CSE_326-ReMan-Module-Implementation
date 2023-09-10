//* Import Internal Dependencies
const itemsPool = require('../../database/dbConnection');   //^ Db Connection


//* To get manufacturer's home page
function getManHomePage(req,res,next){
    res.render("patientHome.ejs");
}


//* To get manufacturer's inventory page
function getManInventory(req,res,next){
    res.render("inventories.ejs");
}


//* Export 
module.exports = {
    getManHomePage,
    getManInventory,
};