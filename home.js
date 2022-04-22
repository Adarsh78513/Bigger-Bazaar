const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(8080);
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.get('/wishlist', (req, res) => {
    res.render('wishlist');
});

app.get('/account', (req, res) => {
    res.render('account');
});



app.get('/buy', (req, res) => {
    res.render('buy');
});

app.get('/product', (req, res) => {
    res.render('product');
});

