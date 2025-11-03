// config/database.js
// ⬅️ CRITICAL FIX: Corrected typo 'moongoose' to 'mongoose'
const mongoose = require('mongoose'); 
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONOGODB_URL, {
        useNewUrlParser: true,
        // ⬅️ CRITICAL FIX: Corrected typo 'useUNifiedTopology'
        useUnifiedTopology: true 
    })
    .then(() => { console.log("Database connected successfully") })
    .catch((err) => {
        console.log("Database connection failed");
        console.error(err);
        process.exit(1);
    });
}