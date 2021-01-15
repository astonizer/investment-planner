require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');

// importing routes
const authRoutes = require('./routes/authRoutes');
const capRoutes = require('./routes/capRoutes');

// initializeing express app
const app = express();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// connecting to db
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
        console.log('Connected to mongodb');
        app.listen(PORT, () => {
            console.log(`Server listening at port ${PORT}`);
        });  
    })
    .catch(err => {
        console.log(err);
    }) 

// check user auth details before every request
app.get('*', checkUser);

// basic routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/begin', (req, res) => {
    res.render('begin', { title: 'Begin'});
});

app.get('/terms', (req, res) => {
    res.render('terms', { title: 'Terms and Conditions' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// auth routes
app.use(authRoutes);
app.use('/cap', capRoutes);

// 404 page
app.use((req, res) => {
    res.render('404', { title: '404' });
})