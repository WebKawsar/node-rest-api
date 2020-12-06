const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./models/notes");
const {check, validationResult } = require("express-validator");


//Controllers
const {addNoteController, getNoteController, getNotesController, updateNoteController, deleteNoteController } = require("./controllers/noteControllers")

//db
const { connectDB } = require("./db/db.connection")
connectDB();

//Midleware
app.use(express.json());





//Root server path
app.get("/", (req, res) => {
    res.send("Welcome Node Js Rest Api server")
})


// Get all Notes
app.get("/notes", getNotesController)


// Adding Note
app.post("/notes",
[
    check("title", "Title is required by express validator").notEmpty(),
    check("description", "Description is required by express validator").notEmpty()
],
addNoteController
)


//Get Sinlge Note
app.get("/notes/:noteId",
check("noteId", "Note not Found").isMongoId(),
getNoteController
)



//Update Note
app.put("/notes/:noteId",
[
    check("noteId", "Note not found").isMongoId(),
    check("title", "Title is req").optional().notEmpty(),
    check("description", "Description is req").optional().notEmpty(),
],
updateNoteController
)






// Delete Note
app.delete("/notes/:noteId", 
check("noteId", "Note not found").isMongoId(),
deleteNoteController
)




app.get("*", (req, res) => {

    res.send("404 Not Found")
})



// Server creation
app.listen(8080, () => {
    console.log("Surver is running the port is 8080");
})