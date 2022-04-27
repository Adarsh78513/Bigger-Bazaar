const express = require('express');
const app = express();
var mysql = require('mysql');
const morgan = require('morgan');

app.use(morgan('dev'))
let user_info = 0;

//makign a connection with azure
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
app.use(express.urlencoded({extended : true}));

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

app.get('/groceries', (req, res) => {
    let sql = "SELECT * FROM groceries, products WHERE groceries.ProductID = products.ProductID";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('groceries', {title : 'groceries', result});
    });
});

app.get('/', (req, res) => {
    let sql = "SELECT * FROM products";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('home', {title : 'products', result});
    });
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});
app.post('/register', (req, res) => {

})

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    user_info = req.body;
    console.log(req.body);
    console.log(user_info);
    let sql = `SELECT * FROM customers WHERE customers.EmailID = '${user_info.email}' AND customers.Password = '${user_info.password}'; SELECT * FROM employees WHERE employees.EmployeeEmail = '${user_info.email}' AND employees.EmployeePassword = '${user_info.password}';`;
    con.query(sql, [1, 2], function (err, result, fields) {
        if (err) throw err;
        if(result[0].length>0){
            user_info=result[0];
            console.log(user_info);
            res.redirect('/');
        }
        else if(result[1].length>0){
            user_info=result[1];
            console.log(user_info);
            res.redirect('/');
        }
        else{
            user_info=0;
            console.log(user_info);
            res.redirect('/register');
        }
    });
});

app.get('/account', (req, res) => {
    res.render('account');
});

app.get('/:id',(req, res) => {
    const id = req.params.id;
    // let sql = "SELECT * FROM products  LEFT [OUTER] JOIN deals  ON products.DealID = deals.ProductID where ProductID = ?";
    let sql = "SELECT * FROM products WHERE ProductID = ?";
    con.query(sql, [id], function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('product', { title : 'product', result});
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





app.get('/buy', (req, res) => {
    res.render('buy');
});

// app.get('/product', (req, res) => {
//     res.render('product');
// });

// app.get('/groceries', (req, res) => {
//     res.render('groceries');
// });

// app.get('/clothing', (req, res) => {
//     res.render('clothing');
// });

// app.get('/electronics', (req, res) => {
//     res.render('electronics');
// });

app.get('/deals', (req, res) => {
    res.render('deals');
});
