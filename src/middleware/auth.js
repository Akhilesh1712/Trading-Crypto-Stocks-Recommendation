const jwt = require('jsonwebtoken');
const Register = require("../models/register");

const auth = async(req,res,next) => {
    try {
       
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;