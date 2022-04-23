const express = require('express');
const app = express();
var mysql = require('mysql');



//makign a connection with azure
var con = mysql.createConnection({
    host: "project-database.mysql.database.azure.com",
    user: "_admin",
    password: "Project@123",
    database: "project"
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


////change the password and the databasename according to your database
// //connecting with the localhost
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "project"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(8080);
// app.get('/', (req, res) => {
//     res.render('home');
// });



// app.get('/', (req, res) => {
//     con.query("SELECT * FROM products", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         // res.render('home', {title }
//         res.render('home');
// });

// app.get('/', (req, res) => {
//     let sql = "SELECT * FROM products";
//     con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.render('home');
//     });
// });

app.get('/', (req, res) => {
    let sql = "SELECT * FROM products";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('home', {title : 'products', result});
    });
});



app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.get('/groceries', (req, res) => {
    res.render('groceries');
});

app.get('/clothing', (req, res) => {
    res.render('clothing');
});

app.get('/electronics', (req, res) => {
    res.render('electronics');
});

app.get('/deals', (req, res) => {
    res.render('deals');
});