const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [5, "Title must be grater than 5 char"],
        maxlength: 15
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: 5,
        maxlength: 150
    }

},{
    timestamps: true
})


const Note = mongoose.model("Note", notesSchema)
module.exports = Note;



