require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;

app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

