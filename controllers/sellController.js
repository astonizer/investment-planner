require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET;

// Get current date
const date = new Date();
const currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

sell_post = (req, res) => {
    let { quantity, asset, buyPrice, date, type, currentPrice } = req.body;
    let returns = {
        Symbol: asset,
        Type: type,
        buyPrice: buyPrice * quantity,
        sellPrice: currentPrice * quantity,
        Quantity: quantity,
        buyDate: date,
        sellDate: currentDate
    }

    // get user details
    try {
        const token = req.cookies.jwt;

        // verification of token
        if(token) {
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if(err) {
                    console.error(err);
                    res.redirect('/portfolio/investments');
                } else {
                    console.log(decodedToken);

                    // add return into history
                    try {
                        // fetch the specified investment
                        User.updateOne({ 
                                _id: decodedToken.id, 
                                "investments.Symbol": asset 
                            }, { 
                                // subtract the quantity of investment by <quantity>
                                $inc: { "investments.$.Quantity": -1*quantity } 
                            },(err,  result) => {
                                if(err) {
                                    console.log('Couldn\'t find investment');
                                    res.redirect('/portfolio/investments');
                                } else {
                                    try {
                                        // if doesn't exist then add the return object to db
                                        User.updateOne(
                                            { _id: decodedToken.id }, 
                                            { $push: { returns } },
                                            () => { 
                                                res.redirect('/portfolio/returns') 
                                            });    
                                    }
                                    catch (err) {
                                        console.log(err);
                                        res.redirect('/portfolio/investments');
                                }
                            }
                        });
                    } 
                    catch(err) {
                        console.error(err);
                        res.redirect('/portfolio/investments');
                    }
                }
            });
        } else {
            console.error('Token verification failed');
            res.redirect('/portfolio/investments');
        }
    } 
    catch(err) {
        console.error(err);
        res.redirect('/portfolio/investments');
    }
};

module.exports = {
    sell_post
};