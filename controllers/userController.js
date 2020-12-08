const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { use } = require("../routes");


module.exports.addUserController = async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send(errors.array())

    const pickedProperty = _.pick(req.body, ["firstName", "lastName", "email", "password", "confirmPassword"])
    const user = new User(pickedProperty)
    
    try {
        const foundUser = await User.findOne({email: req.body.email});
        if(foundUser) return res.status(400).send("User email already exist")
        await user.save()
        res.send({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getUsersController = async(req, res) => {
    
    try {
        
        const users = await User.find({}, "-password");
        res.send(users);

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getUserController = async(req, res) => {

    try {
        const id = req.user._id;
        const user = await User.findById(id, "-password");
        if(!user) return res.status(404).send("user not exist")
        res.send(user)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports.loginController = async(req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).send("Unable to login")
    
        const isMatched = bcrypt.compare(password, user.password)
        if(!isMatched) return res.status(400).send("Unable to login");

        const token = user.generateAuthToken();
        // res.header("x-auth-token", token)
        res.cookie("auth", token, {
            httpOnly: true,
            sameSite: true,
            signed: true,
            maxAge: 4 * 60 * 60 * 1000
        })

        res.send("Success")
        
    } catch (error) {
        res.status(500).send(error)
    }
}

//Logout Controller
module.exports.logOutController = (req, res) => {

    res.clearCookie("auth");
    res.send("Successfully logout")
}





