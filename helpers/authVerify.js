const {tokenValidator} = require("./token");

module.exports = async function(req,res,next){
    
    try
    {
        const {jwt} = req.cookies; //take out the token from cookies jwt 
        const valid = await tokenValidator(jwt); // calling tokenVAlidator
        if(valid)
        {
            next(); // calls the callback function
        }
        else
        {
            res.send("Access Denied")
        }
    }
    catch (error)
    {
        res.send(error);
    }
}