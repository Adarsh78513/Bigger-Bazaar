const express = require('express');
const app = express();
const session = require('express-session');
var mysql = require('mysql2');

// for testing cookies
const app1 = express();
var Sequelize = require("sequelize");
var SequelizeStore = require("express-session-sequelize")(session.Store);

// connecting database with azure
var sequelize = new Sequelize("project", "_admin", "Project@123", {
    dialect: "mysql",
    storage: "project-database.mysql.database.azure.com",
});


//making a connection with azure
var con = mysql.createConnection({
    host: "project-database.mysql.database.azure.com",
    user: "_admin",
    password: "Project@123",
    database: "project",
    multipleStatements: true
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// cookies
// app1.use(session({
//         secret: 'secret',
//         store: new SequelizeStore({
//             db: sequelize,
//             checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
//             expiration: 1 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
//         }),
//         resave: false,
//         saveUninitialized: false,
//     })
// );


app1.get('/', (req, res) => {
    req.session.isAuth=true;
    console.log(req.session);
    res.send('<h1>Hello World</h1>');
});

////change the password and the databasename according to your database
// //connecting with the localhost
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "project"
// });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(8080, console.log('Server running on http://localhost:8080'));
// app.get('/', (req, res) => {
//     res.render('home');
// });

app1.set('view engine', 'ejs');
app1.use(express.static('public'));
app1.listen(5000, console.log('Server running on http://localhost:5000'));

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
        // console.log(result);
        res.render('home', {title : 'products', result});
    });
});

app.get('/:id',(req, res) => {
    const id = req.params.id;
    let sql = "SELECT * FROM products WHERE ProductID = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('product', { product: result, title : 'product'});
    });
});

app.get('/groceries', (req, res) => {
    let sql = "SELECT * FROM groceries, products WHERE groceries.ProductID = products.ProductID";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('groceries', {title : 'groceries', result});
    });
});

app.get('/clothing', (req, res) => {
    let sql = "SELECT * FROM clothing, products WHERE clothing.ProductID = products.ProductID";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('clothing', {title : 'clothing', result});
    });
});

app.get('/electronics', (req, res) => {
    let sql = "SELECT * FROM electronics, products WHERE electronics.ProductID = products.ProductID";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('electronics', {title : 'electronics', result});
    });
});

app.get('/deals', (req, res) => {
    let sql = "SELECT * FROM deals, groceries WHERE groceries.ProductID = deals.ProductID; SELECT * FROM deals, clothing WHERE clothing.ProductID = deals.ProductID; SELECT * FROM deals, electronics WHERE electronics.ProductID = deals.ProductID;";
    con.query(sql, [1, 2, 3], function (err, result, fields) {
        if (err) throw err;
        // console.log(result[0]);
        // console.log(result[1]);
        // console.log(result[2]);
        res.render('deals', {title : 'deals', result});
    });
});

app.get('/product', (req, res) => {
    let sql = "SELECT * FROM deals, groceries WHERE groceries.ProductID = deals.ProductID; SELECT * FROM deals, clothing WHERE clothing.ProductID = deals.ProductID; SELECT * FROM deals, electronics WHERE electronics.ProductID = deals.ProductID;";
    con.query(sql, [1, 2, 3], function (err, result, fields) {
        if (err) throw err;
        // console.log(result[0]);
        // console.log(result[1]);
        // console.log(result[2]);
        res.render('product', {title : 'product', result});
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