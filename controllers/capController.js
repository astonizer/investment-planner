require('dotenv').config();
const data = require('../data/data.json');
const async = require('async');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET;

// Get current date
const date = new Date();
const currentDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

smallCap_get = async (req, res) => {
    let smallCapData = [];
    async.map(data, (async asset => {
        if(asset.Type === "small-cap") {
            smallCapData = [...smallCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Small Cap', data: smallCapData });
        }
        else {
            axios({
                method: 'POST',
                url: 'https://yfinance-node.herokuapp.com/stocks',
                data: smallCapData
            })
            .then(response => {
                smallCapData.map((smallAsset, id) => {
                    smallAsset.Price = response.data[id];
                });
                res.render('assets', { title: 'Small Cap', data: smallCapData });
            })
            .catch(err => {
                console.error(err);

                res.render('error', { title: 'Server Error' });
            });
        }
    });
};

smallCap_post = (req, res) => {
    let { quantity, asset, buyPrice } = req.body;
    let investment = {
        asset,
        buyPrice, 
        quantity,
        date: currentDate
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
            midCapData = [...midCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Mid Cap', data: midCapData });
        }
        else {
            axios({
                method: 'POST',
                url: 'https://yfinance-node.herokuapp.com/stocks',
                data: midCapData
            })
            .then(response => {
                midCapData.map((midAsset, id) => {
                    midAsset.Price = response.data[id];
                });
                res.render('assets', { title: 'Small Cap', data: midCapData });
            })
            .catch(err => {
                console.error(err);
                res.render('error', { title: 'Server Error' });
            });
        }
    });
};

midCap_post = (req, res) => {
    let { quantity, asset, buyPrice } = req.body;
    let investment = {
        asset,
        buyPrice, 
        quantity,
        date: currentDate
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
            largeCapData = [...largeCapData, asset];
        }
    }), (err, result) => {
        if(err) {
            console.log(err);
            res.render('assets', { title: 'Large Cap', data: largeCapData });
        }
        else {    
            axios({
                method: 'POST',
                url: 'https://yfinance-node.herokuapp.com/stocks',
                data: largeCapData
            })
            .then(response => {
                largeCapData.map((largeAsset, id) => {
                    largeAsset.Price = response.data[id];
                });
                res.render('assets', { title: 'Small Cap', data: largeCapData });
            })
            .catch(err => {
                console.error(err);
                res.render('error', { title: 'Server Error' });
            });
        }
    });
};

largeCap_post = (req, res) => {
    let { quantity, asset, buyPrice } = req.body;
    let investment = {
        asset,
        buyPrice, 
        quantity,
        date: currentDate
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