const mongoose = require("mongoose");

//Connecting database
module.exports.connectDB = async() => {


    try {

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u2izr.mongodb.net/notes-app?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log("Database connected successfully")

    } catch (error) {
        console.log(error);
    }


}

