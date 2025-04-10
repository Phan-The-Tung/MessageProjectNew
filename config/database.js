const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ProductManagement"); 
        console.log("connect database success !");
    }   catch(error) {
        console.log("connect database fail !");
    }
}