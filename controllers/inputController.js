const featuredStocks = require('../data/featured.json');
const allStocks = require('../data/data.json');

inputCustom_get = (req, res) => {
    let data = [];
    allStocks.map(stock => {
        data = [...data, stock.Symbol];
    });
    res.render('input', { title: 'Customize', data });
};

inputCustom_post = (req, res) => {
    console.log('Custom data');
    res.redirect('/');
};

inputFeatured_get = (req, res) => {
    res.render('input', { title: 'Featured', data: featuredStocks });
};

inputFeatured_post = (req, res) => {
    console.log('Featured data');
    res.redirect('/');
};

module.exports = {
    inputCustom_get,
    inputCustom_post,
    inputFeatured_get,
    inputFeatured_post
}