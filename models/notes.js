const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
    title: String,
    description: String
}, {
    timestamps: true
})


const Note = mongoose.model("Note", notesSchema)
module.exports = Note;



