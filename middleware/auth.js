const jwt = require("jsonwebtoken");
const User = require("../models/user")


module.exports.auth = async(req, res, next) => {
    

    if(req.signedCookies){
        //Accesssing cookies
        const token = req.signedCookies["auth"]
        
        try {

            //Verify token
            const decoded = jwt.verify(token,  process.env.JWT_SECRET)
            
            //Geting user
            const user = await User.findById(decoded.id)
            req.user = user;
            next();

        } catch (error) {
            res.status(500).send("Unauthorized Access")
        }
        
    }else {

        res.status(401).send("No token provided or Unauthorized")
    }

}






