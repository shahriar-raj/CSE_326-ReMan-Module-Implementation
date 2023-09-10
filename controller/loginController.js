//* Internal Dependencies



//* To get manufacturerLogin.ejs => manufacturer login page
function getManLoginPage(req,res,next){
    res.render("loginMan.ejs");
}



//* Export 
module.exports = {
    getManLoginPage,
};