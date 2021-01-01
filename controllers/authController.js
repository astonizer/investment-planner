require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET;

// handling errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', email: '', password: '' };

    // login failing due to incorrect username
    if(err.message === 'Incorrect email') {
        errors.email = 'Email doesn\'t exist';
    }

    // login failing due to incorrect password
    if(err.message === 'Incorrect password') {
        errors.password = err.message;
    }

    // duplicate email error
    if(err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// creating jwt token
const maxAge = 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: maxAge
    });
};

// route controllers
signup_get = (req, res) => {
    res.render('signup', { title: 'Signup' });
};

signup_post = async (req, res) => {
    // destructuring the values
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

login_get = (req, res) => {
    res.render('login', { title: 'Login' });
};

login_post = async (req, res) => {
    // destructuring the values
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
};