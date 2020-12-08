const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./models/notes");
const {check, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");

//Port
const PORT = process.env.PORT || 8080

//congfig
require('dotenv').config({
    path: "./config/keys.env"
})


//db
const { connectDB } = require("./db/db.connection")
connectDB();



//Routes
const notesRoute = require("./routes/notes");
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");



//Midleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(auth)




//Handling Routes
app.use("/notes", notesRoute)
app.use("/users", usersRoute)
app.use("/", indexRoute)



// Server creation
app.listen(PORT, () => {
    console.log("Surver is running the port is 8080");
})