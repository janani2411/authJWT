const mongoose = require("mongoose"); // import mongoose

//Define Schema(structure) for user details to get from user 
const userSchema = new mongoose.Schema({
    username : {
        type : String , 
        required : true ,
        min : 5 , 
        max : 150 
    },
    email : {
        type : String , 
        required : true , 
    },
    password : {
        type :String , 
        required : true , 
    }

})


module.exports = mongoose.model("User" , userSchema); //Wrap the userSChema data into User using model()
