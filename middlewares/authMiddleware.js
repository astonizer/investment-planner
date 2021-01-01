require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const SECRET_KEY = process.env.SECRET;

// check if user is logged in 
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

// check user details
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    requireAuth,
    checkUser
}