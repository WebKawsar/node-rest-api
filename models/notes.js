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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{
    timestamps: true
})


const Note = mongoose.model("Note", notesSchema)
module.exports = Note;



