const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = process.env.SECRET;

portfolio_get = async (req, res) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.error(err.message);
                res.redirect('/');
            } else {
                
                // fetch user details from db
                const { investments } = await User.findById(decodedToken.id);
                let tot = [0,0,0]
                investments.map(investment => {
                    if(investment.Type === "small-cap") {
                        tot[0] += investment.Quantity * investment.buyPrice;
                    } else if(investment.Type === "mid-cap") {
                        tot[1] += investment.Quantity * investment.buyPrice;
                    } else {
                        tot[2] += investment.Quantity * investment.buyPrice;
                    }
                });
                
                res.render('portfolio', { title: 'Portfolio', tot });
            }
        });
    } else {
        console.error('Token verification failed');
        res.redirect('/');
    }
}

investment_get = async (req, res) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.error(err.message);
                res.redirect('/');
            } else {
                // fetch user details from db
                const { investments, returns } = await User.findById(decodedToken.id);
                const data = {
                    Investments: investments,
                    Returns: returns
                };

                // fetch investments analysis from api
                axios({
                    method: 'POST',
                    url: 'https://yfinance-node.herokuapp.com/investment',
                    data
                })
                .then(response => {
                    res.render('investment', { title: 'Investments', data: response.data, investments });
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

return_get = async (req, res) => {
    const token = req.cookies.jwt;

    // verification of token
    if(token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.error(err.message);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                
                // fetch the returns of user from db
                const { returns } = await User.findById(decodedToken.id);
                const data = {
                    Returns: returns
                };
                
                // fetch returns analysis from api
                axios({
                    method: 'POST',
                    url: 'https://yfinance-node.herokuapp.com/return',
                    data
                })
                .then(response => {
                    res.render('return', { title: 'Returns', data: response.data, returns });
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
    portfolio_get,
    investment_get,
    return_get
};