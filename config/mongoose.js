const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Node-12');

const db = mongoose.connection;
db.once('open',function(err){
    if(err){
        console.log("Something wrong");
    }
    console.log("DB connect successfully");
}) 
module.exports = db;