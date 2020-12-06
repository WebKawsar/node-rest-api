const mongoose = require("mongoose");

//Connecting database
module.exports.connectDB = async() => {

    try {

        await mongoose.connect("mongodb://localhost:27017/notes-app-2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log("Database connected successfully")

    } catch (error) {
        console.log(error);
    }


}

