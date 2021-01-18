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
    console.log(req.body);
    res.json('{success:true}');
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