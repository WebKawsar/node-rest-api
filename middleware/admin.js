const jwt = require("jsonwebtoken");
const User = require("../models/user")


module.exports.admin = async(req, res, next) => {
    
    if(!req.user.isAdmin) return res.status(403).send("You are not allow to access")
    next();
}






