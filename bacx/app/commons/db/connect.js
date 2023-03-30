require("dotenv").config()
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongodb connected");
    } catch (error) {
        console.log("mongodb connection fail",error);
        process.exit(1);
    }
}

module.exports  = connectToMongoDB