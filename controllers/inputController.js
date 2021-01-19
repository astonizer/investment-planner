const featuredStocks = require('../data/featured.json');
const allStocks = require('../data/data.json');

inputCustom_get = (req, res) => {
    let data = [];
    allStocks.map(stock => {
        data = [...data, stock.Symbol];
    });
    data.sort();
    res.render('input', { title: 'Customize', data });
};

inputCustom_post = (req, res) => {
    const { money, stocks } = req.body;
    if(stocks) {
        if(stocks.length<5) {
            console.error("Enough stocks not selected");
        } else {
            
        }
    } else {
        console.error("No stocks selected");
    }
    res.redirect('/input/custom');
};

inputFeatured_get = (req, res) => {
    featuredStocks.sort();
    res.render('input', { title: 'Featured', data: featuredStocks });
};

inputFeatured_post = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};

module.exports = {
    inputCustom_get,
    inputCustom_post,
    inputFeatured_get,
    inputFeatured_post
}