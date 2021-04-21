// Route creation
const express = require("express");

//Getting route function from express module
const authRoutes = express.Router();

//Import models userSchema js file here
const User = require("../models/userSchema");

// Import hashing js file
const {hashGenerate} = require("../helpers/hashing.js")
const {hashValidator} = require("../helpers/hashing.js")

//INport Tokenjs file
const {tokenGenerator} = require("../helpers/token.js");
const authVerify = require("../helpers/authVerify.js");

//Use post function for signup
authRoutes.post('/signup' , async (req , res) => {
    try
    {
        const hashPassword = await hashGenerate(req.body.password)
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        });
        const savedUser = await user.save();
        res.send(savedUser);
    }
    
    catch(error)
    {
        res.send(error);
    }
});

//signin 
authRoutes.post("/signin" , async (req,res) => {
    try{
        const existingUser = await User.findOne({ email :req.body.email });
        if(!existingUser){
            res.send("Email is invalid");
        }
        else{
            const checkUser = await hashValidator(req.body.password , existingUser);
            if(!checkUser)
            {
                res.send("Password is invalid");
            }
            else
            {
                const token = await tokenGenerator(existingUser.email); // calling tokenGernerator to create token
                res.cookie("jwt" , token); //token stored in cookies as jwt 
                res.send(token);
            }
        }
    }
    catch(error)
    {
        res.send(error);
    }
   
})

// only login user can have access to this path
// authVerfy is a middleware function = verfication process before callback function
authRoutes.get("/protected" , authVerify , (req,res) => {
    res.send("I am protected route");
})
//export authRoutes
module.exports = authRoutes;