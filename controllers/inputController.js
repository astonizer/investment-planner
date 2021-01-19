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

inputFeatured_get = (req, res) => {
    featuredStocks.sort();
    res.render('input', { title: 'Featured', data: featuredStocks });
};

module.exports = {
    inputCustom_get,
    inputFeatured_get
}