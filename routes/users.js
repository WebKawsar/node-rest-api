const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Controller
const { addUserController, getUsersController, getUserController, loginController } = require("../controllers/userController");




router.get("/", getUsersController)

router.post("/",
[
    check("firstName", "Firstname is required").notEmpty(),
    check("lastName", "Lastname is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Email must be valid").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Password is min 6 chars long").isLength({min: 6}),
    check("confirmPassword", "Confirm password is required").notEmpty(),
    check("confirmPassword").custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("Confirm password don't match")
        }else {
            return true;
        }
    })
],
addUserController)

router.get("/:id", getUserController)
router.post("/login", loginController)


module.exports = router;
