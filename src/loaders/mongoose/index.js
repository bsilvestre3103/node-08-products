const mongoose = require('mongoose');
const config = require('../../config');


module.exports = async () => {
    await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
}