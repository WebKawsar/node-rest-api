const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./models/notes");
const {check, validationResult } = require("express-validator");




//db
const { connectDB } = require("./db/db.connection")
connectDB();



//Routes
const notesRoute = require("./routes/notes");
const indexRoute = require("./routes/index");


//Midleware
app.use(express.json());






//Handling Routes
app.use("/notes", notesRoute)
app.use("/", indexRoute)




// Server creation
app.listen(8080, () => {
    console.log("Surver is running the port is 8080");
})