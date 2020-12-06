const express = require("express");
const router = express.Router();
const {check, validationResult } = require("express-validator");


//Controllers
const {addNoteController, getNoteController, getNotesController, updateNoteController, deleteNoteController } = require("../controllers/noteControllers")



// Get all Notes
router.get("/", getNotesController)


// Adding Note
router.post("/",
[
    check("title", "Title is required by express validator").notEmpty(),
    check("description", "Description is required by express validator").notEmpty()
],
addNoteController
)


//Get Sinlge Note
router.get("/:noteId",
check("noteId", "Note not Found").isMongoId(),
getNoteController
)



//Update Note
router.put("/:noteId",
[
    check("noteId", "Note not found").isMongoId(),
    check("title", "Title is req").optional().notEmpty(),
    check("description", "Description is req").optional().notEmpty(),
],
updateNoteController
)


// Delete Note
router.delete("/:noteId", 
check("noteId", "Note not found").isMongoId(),
deleteNoteController
)

module.exports = router;










