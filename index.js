const express = require("express");
const app = express();
app.use(express.json());



let notes = [
    {
        id: 101,
        title: "Notes Title 1",
        description: "Notes Description 1"
    },
    {
        id: 102,
        title: "Notes Title 2",
        description: "Notes Description 2"
    },

]


app.get("/", (req, res) => {
    res.send("Welcome Node Js Rest Api server")
})

app.get("/notes", (req, res) => {
    if(notes.length){
        return res.send(notes);
    }
    res.send("Notes Not Found")
})

app.post("/notes", (req, res) => {

    const note = req.body;
    notes = [...notes, note];
    res.send(notes);
})

app.get("/notes/:noteId", (req, res) => {

    const noteId = parseInt(req.params.noteId);
    const note = notes.find(note => note.id === noteId);
    if(note){
        return res.send(note)
    }
    res.status(404).send("Note not found")

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