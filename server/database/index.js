require('dotenv').config()
const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.MONGO_URL);
module.exports = connection