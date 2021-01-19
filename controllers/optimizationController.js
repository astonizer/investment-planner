const yahooStockPrices = require('yahoo-stock-prices');
const async = require('async');

// defining time interval for fetching stock history
const date = new Date();
const startMonth = date.getMonth()+1, startYear = date.getFullYear()-5, startDay = date.getDate();
const endMonth = startMonth, endYear = date.getFullYear(), endDay = startDay;

customOptimization_get = (req, res) => {
    console.log('Optimization for custom stocks');
    res.redirect('/');
};

customOptimization_post = (req, res) => {
    console.log('Posted stocks');
    res.redirect('/');
}

featuredOptimization_get = (req, res) => {
    console.log('Optimization for featured stocks');
    res.redirect('/');
};

featuredOptimization_post = (req, res) => {
    console.log('Posted stocks');
    res.redirect('/');
}

module.exports = {
    customOptimization_get,
    customOptimization_post,
    featuredOptimization_get,
    featuredOptimization_post
};