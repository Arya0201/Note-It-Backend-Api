const bodyParser = require('body-parser')
const connectDb = require('./config/dbConnection')
const express = require('express')
const cors = require('cors')
require('dotenv').config();



// Initialize express app
const app = express()

// Set the port from environment variables or default to 5050
const port = process.env.PORT || 5050

// Enable CORS for all routes
app.use(cors())


// Middleware to parse JSON bodies
app.use(bodyParser.json())

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({extended: false}))

app.get("/",(req,res)=>{
    res.send("hello");
});

// Routes for authentication
app.use('/auth', require('./routes/authRoute'));
app.use('/group', require('./routes/groupRoute'));


// Start the server and connect to the database
app.listen(port, ()=>{
    connectDb()
    console.log(`Listening to ${port}`);
})