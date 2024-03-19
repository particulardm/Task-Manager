const mongoose = require('mongoose');
const uri = process.env.URI;

const connectDB = async function() {
    try {
        await mongoose.connect(uri);
        console.log('DB connected');
    } catch(error) {
        console.error(error);
    }
};

const disconnectDB = async function(app) {
    app.close(async () => {
        console.log('server closed..');

        await mongoose.connection.close(false);
        console.log('DB closed');
    });
};

module.exports = { connectDB, disconnectDB };