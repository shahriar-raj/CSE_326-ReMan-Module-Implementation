//* Import Internal Dependencies
const itemsPool = require('../database/dbConnection');   //^ Db Connection


//* To get manufacturerLogin.ejs => manufacturer login page
function getManLoginPage(req,res,next){
    res.render("loginMan.ejs");
}


async function doLoginMan(req, res){
    const sql = `select * from "Manufacturer"         
    where "Email" = '${req.body.email}'   
    and "Password" = '${req.body.pass}';`
    try {
        const allItems = await itemsPool.query(
            sql
        );
        if(allItems.rows.length==1){
            res.status(200).send("OK");
        }
        else{
            res.status(500).send("Invalid Credential");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
} 


//* Export 
module.exports = {
    getManLoginPage,
    doLoginMan,
};