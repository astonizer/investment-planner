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
    console.log(req.body);

    // get all the selected stocks
    const { stocks, money } = req.body;

    // let adjCloseForSelectedStocks = [];
    // async.map(stocks, (async stock => {
    //     let adjCloseForCurrentStock = [];
    //     yahooStocks.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, stock, "1d")
    //         .then(priceArray => {
    //             priceArray.map(pricing => {
    //                 adjCloseForCurrentStock = [...adjCloseForCurrentStock, pricing.adjclose];
    //             })
    //         })
    //         .then(res => {
    //             // get percent change of individual stock
                
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             console.error('Failed to fetch closing prices');
    //         })
    // }), (err, result) => {
    //     if(err) {
    //         console.error(err);
    //         console.error('Selected stocks mapping failed!');
    //     }
    //     else {
    //         console.log('result', adjClose);
    //     }
    // });

    res.redirect('/');
}

featuredOptimization_get = (req, res) => {
    console.log('Optimization for featured stocks');
    res.redirect('/');
};

featuredOptimization_post = (req, res) => {
    console.log(req.body);

    // get all the selected stocks
    const { stocks, money } = req.body;

    // let adjCloseForSelectedStocks = [];
    // async.map(stocks, (async stock => {
    //     let adjCloseForCurrentStock = [];
    //     yahooStocks.getHistoricalPrices(startMonth, startDay, startYear, endMonth, endDay, endYear, stock, "1d")
    //         .then(priceArray => {
    //             priceArray.map(pricing => {
    //                 adjCloseForCurrentStock = [...adjCloseForCurrentStock, pricing.adjclose];
    //             })
    //         })
    //         .then(res => {
    //             // get percent change of individual stock
                
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             console.error('Failed to fetch closing prices');
    //         })
    // }), (err, result) => {
    //     if(err) {
    //         console.error(err);
    //         console.error('Selected stocks mapping failed!');
    //     }
    //     else {
    //         console.log('result', adjClose);
    //     }
    // });

    res.redirect('/');
}

module.exports = {
    customOptimization_get,
    customOptimization_post,
    featuredOptimization_get,
    featuredOptimization_post
};