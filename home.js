const express = require('express');
const app = express();
var mysql = require('mysql');
const morgan = require('morgan');
var session = require('express-session');


// Returns a middleware to serve favicon
// app.use(favicon(__dirname + '/favicon.ico'));
  


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

const isAuthanticated = (req, res, next) => {
    if(req.session.loggeduser){
        return next();
    }
    res.redirect('/login');
    return;
};

// res.session.auth = true;

app.use(morgan('dev'))
let user_info = 0;

function run_query(query){
    return new Promise((resolve, reject) => {
        con.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

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

// app.get('/favicon.ico', (req, res) => res.status(204).end());

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
    let sql = "SELECT * FROM customers WHERE customers.EmailID = '" + user_info.email + "' AND customers.Password = '" + user_info.password + "'";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result.length === 0){
            user_info=0;
            console.log(user_info);
            res.redirect('/register');
        }
        else{
            res.redirect('/');
            user_info=result;
            console.log(user_info);
        }
    });
});

app.get('/account', (req, res) => {
    res.render('account');
});

app.get('/wishlist', isAuthanticated, (req, res) => {
    console.log("wishlist");
    res.render('buy');
    // console.log(req.session.user);
    // let sql = "SELECT * FROM wishlist WHERE CustomerID = ";
    res.render('wishlist');
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



app.get('/login',(req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
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


app.get('/:id',async (req, res) => {
    const id = await req.params.id;
    // console.log(req.params);
    if( id == 'favicon.ico'){
        res.redirect('/');
        return;
    }
    // console.log(id);
    // let sql = "SELECT * FROM products  LEFT [OUTER] JOIN deals  ON products.DealID = deals.ProductID where ProductID = ?";
    // if ( id != Number(id)){
    //     res.redirect('/');
    // }
    let sql = "SELECT * FROM products WHERE ProductID = " + id;
    let product = await run_query(sql);
    // console.log(id);

    let sql2 = "SELECT * FROM deals WHERE ProductID = " + id;
    let deal = await run_query(sql2);
    // console.log(id);

    // console.log(product);
    let pType = await product[0].ProductType;

    let sql3 = "SELECT * FROM " + pType + " WHERE ProductID = " + id;
    let details = await run_query(sql3);
    res.render('product', { title : 'product', product , deal, details, pType});
});