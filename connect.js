const mongoose = require('mongoose');

function ConnectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = ConnectToMongoDB;