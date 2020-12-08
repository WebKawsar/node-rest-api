const { validationResult } = require("express-validator");
const Note = require("../models/notes");


module.exports.addNoteController =  async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).send(errors.array())
    }

    try {
        const note = new Note({...req.body, owner: req.user._id});
        await note.save();
        res.send(note);

    } catch (error) {

        res.status(400).send(error)
    }
    
}

module.exports.getNoteController = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send(errors.array())

    try {

        const id = req.params.noteId;
        const note = await Note.findById(id).populate("owner", "firstName lastName");
        if(!note) return res.status(404).send("Note Note found")
        res.send(note);

    } catch (error) {

        res.status(500).send(error)
    }


}

module.exports.getNotesController = async(req, res) => {
    
    try {

        const notes = await Note.find()
        res.send(notes); 

    } catch (error) {

        res.status(500).send(error)
    }

}


module.exports.updateNoteController = async(req, res) => {

    const id = req.params.noteId;

    const gotNoteInput = Object.keys(req.body);
    const allowedUpdates = ["title", "description"];
    const isAllowed = gotNoteInput.every(update => allowedUpdates.includes(update))
    if(!isAllowed) return res.status(400).send("Invalid updates")

    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(400).send(errors.array())

    try {

        const note = await Note.findOneAndUpdate({
            _id: id,
            owner: req.user._id
        }, req.body, {
            new: true,
            runValidators: true
        })
        if(!note) return res.status(404).send("Note not found");
        res.send(note)
        
    } catch (error) {

        res.status(500).send(error);
    }


}



module.exports.deleteNoteController = async(req, res) => {

    const id = req.params.noteId;
    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(404).send(errors.array());

    try {

        const note = await Note.findOneAndDelete({
            _id: id,
            owner: req.user._id
        })
        if(!note)return res.status(404).send("Note note found");
        res.send(note)

    } catch (error) {
        res.status(500).send(error)
    }

}




