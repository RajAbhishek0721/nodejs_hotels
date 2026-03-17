// import mongoose library
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
// localhost = local machine
// 27017 = default MongoDB port
// hotelDB = database name
// const mongoURL =process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL;


// connect mongoose to MongoDB database
mongoose.connect(mongoURL);


// get the default connection object
// mongoose automatically creates a connection object
const db = mongoose.connection;


// event listener: when database successfully connects
db.on('connected', () => {
    console.log("MongoDB connected successfully");
});


// event listener: when there is an error in connection
db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});


// event listener: when database connection gets disconnected
db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});


// export the database connection
// so it can be used in other files like server.js
module.exports = db;