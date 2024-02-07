const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv')    //.env holds the connection url of database
dotenv.config()
const authroute =require('../api/routes/auth.js')
const hotelroute=require('../api/routes/hotels.js')
const roomroute=require('../api/routes/rooms.js')
const usersroute=require('../api/routes/users.js')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const  connection = async ()=>{
try {
    await mongoose.connect(process.env.MONGO)              //mong is the variable it holds the url
    console.log("mongodb connection successed")
    
} catch (error) {
    throw(error)
}
}

const app=express();


//middlewear
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authroute)
app.use('/api/users',usersroute)
app.use('/api/rooms',roomroute)
app.use('/api/hotels',hotelroute)

//error handeler middlewear

app.use((err, req, res, next) => {
    console.error(err.stack);
  
    // Set a default status code and error message
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';
  
    // Respond with the error message and status code
    res.status(statusCode).json({
        status:500,
        message:errorMessage,
      success:false,
    });
  });

app.listen(8000, () => {
    connection();
    console.log("Connected to the backend");
  });

 