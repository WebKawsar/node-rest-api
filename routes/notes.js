const express = require("express");
const router = express.Router();
const {check, validationResult } = require("express-validator");


//Middleware
const { auth } = require("../middleware/auth");

//Controllers
const {addNoteController, getNoteController, getNotesController, updateNoteController, deleteNoteController } = require("../controllers/noteControllers")



// Get all Notes
router.get("/", auth, getNotesController)


// Adding Note
router.post("/",
[   
    auth,
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
    auth,
    check("noteId", "Note not found").isMongoId(),
    check("title", "Title is req").optional().notEmpty(),
    check("description", "Description is req").optional().notEmpty(),
],
updateNoteController
)


// Delete Note
router.delete("/:noteId",
[
    auth,
    check("noteId", "Note not found").isMongoId()
],

deleteNoteController
)

module.exports = router;










