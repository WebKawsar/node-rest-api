const express = require("express");
const router = express.Router();


//Root server path
router.get("/", (req, res) => {
    res.send("Welcome Node Js Rest Api server")
})



router.get("*", (req, res) => {

    res.send("404 Not Found")
})


module.exports = router;