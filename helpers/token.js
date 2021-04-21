const { response } = require("express");
const jwt = require("jsonwebtoken");

//function to generate token
const tokenGenerator = (email) => { //parameter email only here
    try
    {
        // token generation
        // token stored in token variable
        // jwt.sign(payload,secretkey,expirestime)
        const token = jwt.sign( { email } , process.env.JWT_KEY , { expiresIn : "3hours"} )
        return token;
    }
    catch (error)
    {
        res.send(error);
    }
    
}

// function to validate the token
const tokenValidator = (token) => {
    try{
        const data = jwt.verify(token , process.env.JWT_KEY);
        return data;
    }
    catch (error)
    {
        return false;
    }
}

module.exports.tokenGenerator = tokenGenerator;

module.exports.tokenValidator = tokenValidator;