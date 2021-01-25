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
                // const { investments } = await User.findById(decodedToken.id);
                // const data = {
                //     Investments: investments,
                //     Returns: returns
                // };

                // // fetch investments analysis from api
                // axios({
                //     method: 'POST',
                //     url: 'https://yfinance-node.herokuapp.com/',
                //     data
                // })
                // .then(response => {
                    res.render('portfolio', { title: 'Portfolio', traces });
                // })
                // .catch(err => {
                //     console.error(err);
                //     res.render('error', { title: 'Server Error' });
                // });
            }
        });
    } else {
        console.error('Token verification failed');
        res.redirect('/');
    }
}

portfolio_graphs = (req, res) => {
    let graphData = {
        category: {
            smallCap: 0,
            midCap: 0,
            largeCap: 0
        },
        stockPrices: [
            {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17]
            },
            {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17]
            }
        ]
    }
    res.json()
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