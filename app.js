const express = require ('express');
const bodyParser = require('body-parser');
const assert = require('assert');
// variable needed for object id to be inserted into put function
var objectId = require('mongodb').ObjectID;

const cart = require('./apis/cart')
const users = require('./apis/users')
const info = require('./apis/info')
const orders = require('./apis/orders')
const products = require('./apis/products')

const app = express();
const PORT = 5050;

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

const DB_NAME = 'lfood';
const BOOK_COLLECTION_NAME = 'Foods';
const USERS_COLLECTION_NAME = 'Users';
const ORDERS_COLLECTION_NAME = 'Orders';
const GENRES_COLLECTION_NAME = 'Drinks';
const REQUESTS_COLLECTION_NAME = 'Requests';
const USERHISTORY_COLLECTION_NAME = 'UserHistory';


app.use(bodyParser.urlencoded({extended: false})); // allow user to send data within the URL.
app.use(bodyParser.json()); // allow user to send json data.


//GET
app.use('/foods', foods)
app.use('/users', users)
app.use('/cart', cart)
app.use('/orders', orders)
app.use('/products', products)
app.listen(PORT);
console.log("Listening on port " + PORT);

/*
Gitlab Frontend repo: https://gitlab.com/alex_nordhoff/bookstore-frontendGitlab Backend repo: https://gitlab.com/alex_nordhoff/bookstore-backendAWS Public IP: http://18.221.174.156 */