const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./models/notes");
const {check, validationResult } = require("express-validator");


//Midleware
app.use(express.json());


//Connecting database
mongoose.connect("mongodb://localhost:27017/notes-app-2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.log(err))





//Root server path
app.get("/", (req, res) => {
    res.send("Welcome Node Js Rest Api server")
})


// Get all Notes
app.get("/notes", async(req, res) => {

    try {

        const notes = await Note.find()
        res.send(notes); 

    } catch (error) {

        res.status(500).send(error)
    }

})


// Adding Note
app.post("/notes",
[
    check("title", "Title is required by express validator").notEmpty(),
    check("description", "Description is required by express validator").notEmpty()
],
 async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send(errors.array())
    }

    try {
        const note = new Note(req.body);
        await note.save();
        res.send(note);

    } catch (error) {

        res.status(400).send(error)
    }
    
})


//Get Sinlge Note
app.get("/notes/:noteId",
check("noteId", "Note not Found").isMongoId(),
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send(errors.array())

    try {

        const id = req.params.noteId;
        const note = await Note.findById(id);
        if(!note) return res.status(404).send("Note Note found")
        res.send(note);

    } catch (error) {

        res.status(500).send(error)
    }


})




app.put("/notes/:noteId", (req, res) => {
    const noteId = parseInt(req.params.noteId);
    const noteInput = req.body;
    const gotNoteInput = Object.keys(noteInput);
    const allowedUpdates = ["title", "description"];

    try {
        const isAllowed = gotNoteInput.every(update => allowedUpdates.includes(update))
        const note = notes.find(note => note.id === noteId)
        
        if(!isAllowed){
            return res.status(400).send("Invalid operation");
        }
        
        if(note){

            notes = notes.map(note => {
                if(note.id === noteId){
                    return {...note, ...noteInput};
                }else {
                    return note;
                }
            })
            return res.send(notes)

        }else {
            return res.status(404).send("Note Not Found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }


})







app.delete("/notes/:noteId", (req, res) => {
    const noteId = parseInt(req.params.noteId)
    const note = notes.find(note => note.id === noteId)
    if(note){
        notes = notes.filter(note => note.id !== noteId)
        return res.send(notes);

    }else {
        return res.status(404).send("Note Not Found or unable to Delete");
    }
})




app.get("*", (req, res) => {

    res.send("404 Not Found")
})



// Server creation
app.listen(8080, () => {
    console.log("Surver is running the port is 8080");
})