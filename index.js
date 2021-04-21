const { request } = require("express");
const express = require("express"); // import express module

const app = express(); // calling express module

const authRoutes = require("./routes/authRoutes.js"); // import authRoutes file 

const  mongoose = require("mongoose"); // Import mongoose 

const dotenv = require("dotenv"); //import dotenv 

const cookieParser = require("cookie-parser"); // Import cookie-parser to store toke 

dotenv.config();

// .env file is used to store constant varibles which are not to be visible
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true , useUnifiedTopology: true}, () => {
    console.log("Database Connected ...");
});
// Routes 
// Middleware
app.use(express.json()); //used for getting data in body 
app.use('/api/user' , authRoutes); // whenever using /api/user path on get function it move to authRoutes file
// for running server
app.listen( 5100 , () => {
    console.log("Server running");
})