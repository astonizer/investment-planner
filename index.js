require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT;
const DBURI = process.env.DBURI;

// middlewares
app.use(express.static('public'));
app.use(express.json());

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
        console.log('Failed to connect to mongodb');
        app.listen(PORT, () => {
            console.log(`Server listening at port ${PORT}`);
        });  
    }) 

// basic routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/terms', (req, res) => {
    res.render('terms', { title: 'Terms and Conditions' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// auth routes
app.use(authRoutes);

// 404 page
app.use((req, res) => {
    res.render('404', { title: '404' });
})