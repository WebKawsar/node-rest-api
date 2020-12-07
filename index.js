const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./models/notes");
const {check, validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");




//db
const { connectDB } = require("./db/db.connection")
connectDB();



//Routes
const notesRoute = require("./routes/notes");
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");


function auth(req, res, next){
    req.body.random = "Hello";
    next();
}
//Midleware
app.use(express.json());
app.use(cookieParser('secretKey'))
app.use(auth)




//Handling Routes
app.use("/notes", notesRoute)
app.use("/users", usersRoute)
app.use("/", indexRoute)



// Server creation
app.listen(8080, () => {
    console.log("Surver is running the port is 8080");
})