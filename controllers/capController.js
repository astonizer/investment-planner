const data = require('../data/data.json');
const yahooStockPrices = require('yahoo-stock-prices');
const async = require('async');

smallCap_get = async (req, res) => {
    let smallCapData = [];
    // const date = new Date();
    // let startYear = 2000, startMonth = 0, startDay = 1;
    // let endYear = date.getFullYear(), endMonth = date.getMonth(), endDay = date.getDate();
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
            console.log(smallCapData);
        }
    });
};

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
            console.log(smallCapData);
        }
    });
};

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
            console.log(smallCapData);
        }
    });
};

module.exports = {
    smallCap_get,
    midCap_get,
    largeCap_get
}