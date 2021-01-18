require('dotenv').config();
const data = require('../data/data.json');
const yahooStockPrices = require('yahoo-stock-prices');
const async = require('async');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET;

smallCap_get = async (req, res) => {
    let smallCapData = [];
    async.map(data, (async asset => {
        if(asset.Type === "small-cap") {
            // asset.Price = await yahooStockPrices.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, asset.Symbol, '1d');
            asset.Price = await yahooStockPrices.getCurrentPrice(asset.Symbol);
            smallCapData = [...smallCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Small Cap', data: smallCapData });
        }
        else {
            res.render('assets', { title: 'Small Cap', data: smallCapData });
        }
    });
};

smallCap_post = (req, res) => {
    let { quantity, asset, price } = req.body;
    let investment = {
        asset,
        price, 
        quantity,
        date: Date.now()
    };

    // get user details
    try {
        const token = req.cookies.jwt;
        
        // verification of token
        if(token) {
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if(err) {
                    console.error(err);
                    res.redirect('/cap/small');
                } else {
                    console.log(decodedToken);

                    // add investment into history
                    try {
                        User.updateOne(
                            { _id: decodedToken.id }, 
                            { $push: { investments: investment } },
                            () => { res.redirect('/') }
                        );
                    } 
                    catch(err) {
                        console.error(err);
                        res.redirect('/cap/small');
                    }
                }
            });
        } else {
            console.error('Token verification failed');
            res.redirect('/cap/small');
        }
    } 
    catch(err) {
        console.error(err);
        res.redirect('/cap/small');
    }
}

midCap_get = (req, res) => {
    let midCapData = [];
    async.map(data, (async asset => {
        if(asset.Type === "mid-cap") {
            // asset.Price = await yahooStockPrices.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, asset.Symbol, '1d');
            asset.Price = await yahooStockPrices.getCurrentPrice(asset.Symbol);
            midCapData = [...midCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Mid Cap', data: midCapData });
        }
        else {
            res.render('assets', { title: 'Mid Cap', data: midCapData });
        }
    });
};

midCap_post = (req, res) => {
    let { quantity, asset, price } = req.body;
    let investment = {
        asset,
        price, 
        quantity,
        date: Date.now()
    };

    // get user details
    try {
        const token = req.cookies.jwt;
        
        // verification of token
        if(token) {
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if(err) {
                    console.error(err);
                    res.redirect('/cap/mid');
                } else {
                    console.log(decodedToken);

                    // add investment into history
                    try {
                        User.updateOne(
                            { _id: decodedToken.id }, 
                            { $push: { investments: investment } },
                            () => { res.redirect('/') }
                        );
                    } 
                    catch(err) {
                        console.error(err);
                        res.redirect('/cap/mid');
                    }
                }
            });
        } else {
            console.error('Token verification failed');
            res.redirect('/cap/mid');
        }
    } 
    catch(err) {
        console.error(err);
        res.redirect('/cap/small');
    }
}

largeCap_get = (req, res) => {
    let largeCapData = [];
    data.map(asset => {
        if(asset.Type === "large-cap") {
            largeCapData = [...largeCapData, asset];
        }
    });
    async.map(data, (async asset => {
        if(asset.Type === "large-cap") {
            // asset.Price = await yahooStockPrices.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, asset.Symbol, '1d');
            asset.Price = await yahooStockPrices.getCurrentPrice(asset.Symbol);
            largeCapData = [...largeCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Large Cap', data: largeCapData });
        }
        else {    
            res.render('assets', { title: 'Large Cap', data: largeCapData });
        }
    });
};

largeCap_post = (req, res) => {
    let { quantity, asset, price } = req.body;
    let investment = {
        asset,
        price, 
        quantity,
        date: Date.now()
    };

    // get user details
    try {
        const token = req.cookies.jwt;
        
        // verification of token
        if(token) {
            jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
                if(err) {
                    console.error(err);
                    res.redirect('/cap/large');
                } else {
                    console.log(decodedToken);

                    // add investment into history
                    try {
                        User.updateOne(
                            { _id: decodedToken.id }, 
                            { $push: { investments: investment } },
                            () => { res.redirect('/') }
                        );
                    } 
                    catch(err) {
                        console.error(err);
                        res.redirect('/cap/large');
                    }
                }
            });
        } else {
            console.error('Token verification failed');
            res.redirect('/cap/large');
        }
    } 
    catch(err) {
        console.error(err);
        res.redirect('/cap/large');
    }
}

module.exports = {
    smallCap_get,
    smallCap_post,
    midCap_get,
    midCap_post,
    largeCap_get,
    largeCap_post
}