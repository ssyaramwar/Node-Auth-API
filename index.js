// index.js
const express = require('express');
const app = express();
require('dotenv').config();

// Assuming your .env is loaded correctly, we use the process.env values.
const PORT = process.env.PORT || 4000; 

// Middleware to parse JSON request body
app.use(express.json());

// Database connection
require('./config/database').connect();

// Route import and mount
// ⬅️ CRITICAL FIX: Corrected typo 'requires' to 'require'
const user = require("./Routes/user"); 
app.use("/api/v1", user);

// Server activation
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});