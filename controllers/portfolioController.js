const User = require('../models/User');
const jwt = require('jsonwebtoken');
const data = require('../data/data.json');

const SECRET_KEY = process.env.SECRET;

// defining time interval for fetching stock history
const date = new Date();
const startMonth = date.getMonth()+1, startYear = date.getFullYear()-5, startDay = date.getDate();
const endMonth = startMonth, endYear = date.getFullYear(), endDay = startDay;

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
                const { investments } = await User.findById(decodedToken.id);
                let user_investments = [];
                let date = [],price = [],type = [],pchange = [],net_pl = 0, roi = 0,
                    total = 0,total_investments = 0,symbol = [],beta = [], cagr = 0;

                investments.map(investment => {
                    if(investment.quantity > 0) {
                        data.forEach(data_asset => {
                            if(data_asset.Symbol === investment.asset) {
                                symbol = [...symbol, investment.asset];
                                type = [...type, investment.type];
                            }
                        });
                    }
                    // yahooStockPrices.getCurrentPrice(asset.Symbol)
                    //     .then(pricing => {
                    //         price.push(pricing);
                    //     })
                    price.push(12);

                });
                symbol.push('^NSEI');
                symbol.push('^BSESN');
                investments.map((investment, id) => {
                    pchange.push(Math.round((1-investments[id].price/price[id])*100)/100);
                    net_pl += price[id] * investments[id].quantity;
                    date.push(investments[id].date);
                    total += investments[id].price * investments[id].quantity;
                });
                total_investment = total;

                res.render('portfolio', { title: 'Investment', date, price, type, pchange, roi,
                                            net_pl, total, total_investments, symbol, beta, cagr });
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