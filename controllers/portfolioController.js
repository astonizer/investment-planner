const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = process.env.SECRET;

investment_get = async (req, res) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.error(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                const { investments, returns } = await User.findById(decodedToken.id);
                const data = {
                    Investments: investments,
                    Returns: returns
                };
                axios({
                    method: 'POST',
                    url: 'https://yfinance-node.herokuapp.com/investment',
                    data
                })
                .then(response => {
                    res.render('portfolio', { title: 'Investments', data: response.data, investments });
                })
                .catch(err => {
                    console.error(err);
                    res.render('error', { title: 'Server Error' });
                });
            }
        });
    } else {
        console.error('Token verification failed');
        res.redirect('/');
    }
}

module.exports = {
    investment_get
};