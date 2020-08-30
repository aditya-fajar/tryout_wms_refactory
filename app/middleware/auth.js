const jwt = require('jsonwebtoken');
const { static } = require('express');
require("dotenv").config();

exports.id = (r) => id_user;
module.exports = {
    isAuth: (req, res, next) => {
        try {
            const token = req.headers.token;
            // console.log(token);
            var decoded = 
            jwt.verify(token, 
                process.env.SECRET_JWT);
            req.user = decoded;
            
            next();
        } catch (err) {
            res.status(401).json({
                err:err.message,
                message: 'Token is Invalid'
            });
        }
    }
};